open Parser

// (Parsers with type parse_error := ParseError.t)

module BasicCombinators: Parsers = {
  // bind equation to externally treat it like this
  type parse_error = ParseError.t
  type parse_result<'a> = result<('a, Location.t), parse_error>
  type parser<'a> =
    | ScopedParser(array<string>, Location.t => parse_result<'a>)
    | LabeledParser(string, Location.t => parse_result<'a>)
    | Parser(Location.t => parse_result<'a>)

  exception CannotGet(parse_error)
  exception CannotGetError

  let get_exn = result =>
    switch result {
    | Ok((res, _)) => res
    | Error(error) => raise(CannotGet(error))
    }

  let get_error: parse_result<'a> => parse_error = result =>
    switch result {
    | Error(error) => error
    | _ => raise(CannotGetError)
    }

  let runParser = (p, loc) =>
    switch p {
    | ScopedParser(_, fn) => fn(loc)
    | LabeledParser(m, fn) =>
      switch fn(loc) {
      | Error(_) => Error(ParseError.make(loc, m))
      | ok => ok
      }
    | Parser(fn) => fn(loc)
    }

  let run = (parser, input) => runParser(parser, Location.make(input, 0))

  let string = str => Parser(
    loc => {
      let length = str->Js.String2.length
      if loc.input->Js.String2.slice(~from=loc.offset, ~to_=loc.offset + length) == str {
        Ok((str, loc->Location.inc(length)))
      } else {
        Error(ParseError.make(loc, "Expected: " ++ str))
      }
    },
  )

  let orElse = (p1, p2) => Parser(
    loc =>
      switch runParser(p1, loc) {
      | Error(error1) =>
        switch runParser(Lazy.force(p2), loc) {
        | Error(error2) =>
          let stack = error2.stack
          let otherFailures = Belt.Array.concat(error2.otherFailures, [error1])
          Error(ParseError.makeWith(stack, otherFailures))
        | ok => ok
        }
      | ok => ok
      },
  )

  let flatMap = (p, fn) => Parser(
    loc =>
      switch runParser(p, loc) {
      | Ok((v1, loc)) =>
        switch runParser(fn(v1), loc) {
        | Ok((v2, loc)) => Ok((v2, loc))
        | Error(err) => Error(err)
        }
      | Error(err) => Error(err)
      },
  )

  let unit = a => Parser(loc => Ok((a, loc)))

  let listOfN = (int, p) => Parser(
    loc => {
      let rec run = (i, p, loc, acc) =>
        switch runParser(p, loc) {
        | Ok((v, loc)) =>
          let newAcc = Belt.Array.concat([v], acc)
          if i <= 0 {
            Ok((newAcc, loc))
          } else {
            run(i - 1, p, loc, newAcc)
          }
        | Error(error) => Error(error)
        }
      run(int, p, loc, [])
    },
  )

  let many = p => Parser(
    loc => {
      let rec run = (p, loc, acc) =>
        switch runParser(p, loc) {
        | Ok((v, loc)) => run(p, loc, Belt.Array.concat([v], acc))
        | _ => Ok((acc, loc))
        }
      run(p, loc, [])
    },
  )

  let many1 = p => Parser(
    loc =>
      switch runParser(many(p), loc) {
      | Ok((v, loc)) =>
        if Belt.Array.length(v) === 0 {
          Error(ParseError.make(loc, "Expected at least one repetition for parser"))
        } else {
          Ok((v, loc))
        }
      | err => err
      },
  )

  let slice = p => Parser(
    loc =>
      switch runParser(p, loc) {
      | Ok((_, newLoc)) =>
        let charsConsumed = newLoc.offset - loc.offset
        Ok((loc.input->Js.String.substrAtMost(~from=loc.offset, ~length=charsConsumed), newLoc))
      | Error(error) => Error(error)
      },
  )

  let regexRaw = reg => Parser(
    loc => {
      let sstr = Js.String.substr(~from=loc.offset, loc.input)
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
        Error(ParseError.make(loc, "Expected: " ++ reg->Js.Re.source))
      }
    },
  )

  let regex = str => regexRaw(Js.Re.fromString("^" ++ str))

  let sepBy = (sep, p) => Parser(
    loc => {
      let rec parse = (sep, p, loc, acc) =>
        switch runParser(p, loc) {
        | Ok((v, loc)) =>
          let newAcc = Belt.Array.concat([v], acc)
          switch runParser(sep, loc) {
          | Ok((_, loc)) => parse(sep, p, loc, newAcc)
          | Error(_) => Ok((newAcc, loc))
          }
        | Error(_) => Ok((acc, loc))
        }
      parse(sep, p, loc, [])
    },
  )

  let label = (m, p) =>
    switch p {
    | LabeledParser(_, fn) => LabeledParser(m, fn)
    | Parser(fn) => LabeledParser(m, fn)
    | a => a
    }

  let scope = (m, p) =>
    switch p {
    | ScopedParser(scope, fn) => ScopedParser(Belt.Array.concat(scope, [m]), fn)
    | LabeledParser(_, fn) => ScopedParser([m], fn)
    | Parser(fn) => ScopedParser([], fn)
    }

  let attempt = p => Parser(
    loc =>
      switch runParser(p, loc) {
      | Ok((v, loc)) => Ok((Some(v), loc))
      | _ => Ok((None, loc))
      },
  )

  let fail = error => Parser(loc => Error(ParseError.make(loc, error)))
}

module DP = DerivedParsers(BasicCombinators)

include BasicCombinators
include DP
