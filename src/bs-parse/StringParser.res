module Location = {
  type t = {
    input: string,
    offset: int,
  }

  let make = (input, offset) => {input: input, offset: offset}
  let line = loc => {
    let countBreaks = str =>
      Util.explode(str)->Belt.Array.reduce(0, (acc, v) =>
        if v == '\n' {
          acc + 1
        } else {
          acc
        }
      )
    countBreaks(loc.input->Js.String2.slice(~from=0, ~to_=loc.offset + 1)) + 1
  }

  let col = loc => {
    let lines =
      Js.String2.slice(loc.input, ~from=0, ~to_=loc.offset + 1)
      ->Js.String2.split("\n")
      ->Belt.Array.reverse
    Js.String2.length(lines->Belt.Array.getExn(0))
  }

  let inc = (loc, offset) => {
    ...loc,
    offset: loc.offset + offset,
  }
}
module ParseError = {
  type rec t = {
    stack: array<(Location.t, string)>,
    otherFailures: array<t>,
  }
  let none = {
    stack: [],
    otherFailures: [],
  }
  let makeWith = (stack, failures) => {stack: stack, otherFailures: failures}
  let make = (loc, string) => makeWith([(loc, string)], [])

  let getStackTrace = error =>
    error.stack->Belt.Array.reduce([], (acc, (loc, message)) => {
      let line = Location.line(loc)
      let column = Location.col(loc)
      let finalMessage = j`$message at $line:$column`
      acc->Belt.Array.concat([finalMessage])
    })

  let getAllStackTrace = error => {
    let otherFailureStackTraces =
      error.otherFailures->Belt.Array.map(getStackTrace)->Belt.Array.concatMany
    Belt.Array.concat(getStackTrace(error), otherFailureStackTraces)
  }

  let join2 = (error1, error2) => {
    let stack = error2.stack
    let otherFailures = Belt.Array.concat(error2.otherFailures, [error1])
    makeWith(stack, otherFailures)
  }

  let joinN = errors => errors->Belt.Array.reduce(none, join2)

  let toString = error => error->getAllStackTrace->Js.Array2.joinWith("\n")
}
module Base = {
  type loc = Location.t
  type parse_error = ParseError.t
  type parse_result<'a> = result<('a, loc), parse_error>
  type label = string
  type input = string
  type parser<'a> =
    | Labeled(label, loc => parse_result<'a>)
    | Simple(loc => parse_result<'a>)

  exception CannotGet(parse_error)
  exception CannotGetError

  let runParser = (p, loc) =>
    switch p {
    | Labeled(m, fn) =>
      switch fn(loc) {
      | Error(_) => Error(ParseError.make(loc, m))
      | ok => ok
      }
    | Simple(fn) => fn(loc)
    }

  let run = (parser, input) => runParser(parser, Location.make(input, 0))

  let slice = p => Simple(
    loc =>
      switch runParser(p, loc) {
      | Ok((_, newLoc)) =>
        let charsConsumed = newLoc.offset - loc.offset
        Ok((loc.input->Js.String.substrAtMost(~from=loc.offset, ~length=charsConsumed), newLoc))
      | Error(error) => Error(error)
      },
  )

  let regexRaw = reg => Simple(
    loc => {
      let sstr = loc.input->Js.String2.substr(~from=loc.offset)
      if reg->Js.Re.test_(sstr) {
        let result =
          reg
          ->Js.Re.exec_(sstr)
          ->Belt.Option.getExn
          ->Js.Re.captures
          ->Belt.Array.map(x => Js.Nullable.toOption(x)->Belt.Option.getExn)
        let charsConsumed = result->Belt.Array.getExn(0)->Js.String.length
        // calculate the difference
        let newLoc = {
          ...loc,
          offset: loc.offset + charsConsumed,
        }
        Ok((result, newLoc))
      } else {
        Error(ParseError.make(loc, j`Expected: ${reg->Js.Re.source} got: $sstr`))
      }
    },
  )

  let regex = str => regexRaw(Js.Re.fromString("^" ++ str))

  let joinError = ParseError.joinN
  let makeError = ParseError.make
}
include IParser.Make(Base)

let {run, regex, slice} = module(Base)

let string = str => Base.Simple(
  loc => {
    let length = str->Js.String2.length
    let input = loc.input->Js.String2.slice(~from=loc.offset, ~to_=loc.offset + length)
    if input == str {
      Ok((str, loc->Location.inc(length)))
    } else {
      Error(ParseError.make(loc, j`Expected: $str got: $input`))
    }
  },
)

let tag = (str, value) => Base.Simple(
  loc => {
    let length = str->Js.String2.length
    let input = loc.input->Js.String2.slice(~from=loc.offset, ~to_=loc.offset + length)
    if input == str {
      Ok((value, loc->Location.inc(length)))
    } else {
      Error(ParseError.make(loc, j`Expected: $str got: $input`))
    }
  },
)
