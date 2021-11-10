module type IParser = {
  // bind equation to externally treat it like this
  type input
  type loc
  type parse_error
  type parse_result<'a> = result<('a, loc), parse_error>
  type label = string
  type parser<'a> =
    | Labeled(label, loc => parse_result<'a>)
    | Simple(loc => parse_result<'a>)
  let runParser: (parser<'a>, loc) => parse_result<'a>
  let run: (parser<'a>, input) => parse_result<'a>
  let slice: parser<'a> => parser<input>
  let regex: string => parser<array<string>>
  let joinError: array<parse_error> => parse_error
  let makeError: (loc, string) => parse_error
  exception CannotGet(parse_error)
  exception CannotGetError
}

module Make = (P: IParser) => {
  open P
  let get_exn = result =>
    switch result {
    | Ok((res, _)) => res
    | Error(error) => raise(CannotGet(error))
    }

  let get_error = result =>
    switch result {
    | Error(error) => error
    | _ => raise(CannotGetError)
    }

  let orElse = (p1, p2) => Simple(
    loc =>
      switch runParser(p1, loc) {
      | Error(error1) =>
        switch runParser(Lazy.force(p2), loc) {
        | Error(error2) => Error(joinError([error1, error2]))
        | ok => ok
        }
      | ok => ok
      },
  )

  let unit = a => Simple(loc => Ok((a, loc)))
  let fail = error => Simple(loc => Error(makeError(loc, error)))

  let anyOf = parsers =>
    parsers->Belt.Array.reduce(fail("anyOf Expecting at least 1 parser"), (a, v) => orElse(a, v))

  let flatMap = (p, fn) => Simple(
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

  // optimized version of (p1, p2) => p1->flatMap(v1 => p2->map(v2 => (v1, v2)))
  let seq2 = (lazy p1, lazy p2) => Simple(
    loc =>
      switch runParser(p1, loc) {
      | Ok((v1, loc)) =>
        switch runParser(p2, loc) {
        | Ok((v2, loc)) => Ok(((v1, v2), loc))
        | Error(_) as e => e
        }
      | Error(_) as e => e
      },
  )
  let seq3 = (lazy p1, lazy p2, lazy p3) => Simple(
    loc =>
      switch runParser(p1, loc) {
      | Ok((v1, loc)) =>
        switch runParser(p2, loc) {
        | Ok((v2, loc)) =>
          switch runParser(p3, loc) {
          | Ok((v3, loc)) => Ok((v1, v2, v3), loc)
          | Error(_) as e => e
          }
        | Error(_) as e => e
        }
      | Error(_) as e => e
      },
  )

  let seqN = parsers => Simple(
    loc => {
      let v = parsers->Belt.Array.reduce(None, (a, lazy p) => {
        switch a {
        | None =>
          switch runParser(p, loc) {
          | Ok((v, _)) as ok => Some([v], ok)
          | Error(error) => Some([], Error(error))
          }
        | Some(acc, Ok(_, loc)) =>
          switch runParser(p, loc) {
          | Ok((v, _)) as ok => Some(acc->Belt.Array.concat([v]), ok)
          | Error(error) => Some(acc, Error(error))
          }
        | Some(acc, Error(error)) => Some(acc, Error(error))
        }
      })
      switch v {
      | None => Error(makeError(loc, "sequence needs at least 1 parser."))
      | Some(acc, Ok((_, loc))) => Ok((acc, loc))
      | Some(_, Error(error)) => Error(error)
      }
    },
  )

  let map = (p, fn) => Simple(
    loc =>
      switch runParser(p, loc) {
      | Ok((v1, loc)) => Ok(fn(v1), loc)
      | Error(err) => Error(err)
      },
  )

  let listOfN = (int, p) => Simple(
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

  let many = p => Simple(
    loc => {
      let rec run = (p, loc, acc) =>
        switch runParser(p, loc) {
        | Ok((v, loc)) => run(p, loc, acc->Belt.List.add(v))
        | _ => Ok((acc, loc))
        }
      run(p, loc, list{})->Belt.Result.map(((list, _a)) => (Belt.List.toArray(list), _a))
    },
  )

  let many1 = p => Simple(
    loc =>
      switch runParser(many(p), loc) {
      | Ok((v, loc)) =>
        if Belt.Array.length(v) === 0 {
          Error(makeError(loc, "Expected at least one repetition for parser"))
        } else {
          Ok((v, loc))
        }
      | err => err
      },
  )

  let sepBy = (sep, p) => Simple(
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
    | Labeled(_, fn) => Labeled(m, fn)
    | Simple(fn) => Labeled(m, fn)
    }

  let attempt = p => Simple(
    loc =>
      switch runParser(p, loc) {
      | Ok((v, loc)) => Ok((Some(v), loc))
      | _ => Ok((None, loc))
      },
  )

  let eof = regex("$")->slice->map(_ => ())->label("Expected EOF", _)

  let whitespace = regex("[\s]*")->slice->map(_ => ())

  let spaceAround = bodyP =>
    whitespace->flatMap(_ => bodyP->flatMap(result => whitespace->map(_ => result)))

  let surround = (openP, bodyP, closeP) =>
    openP->flatMap(_ => spaceAround(bodyP)->flatMap(result => closeP->map(_ => result)))

  let number = regex("-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?")->slice

  let str = regex("\"([^\"]*)\"")->map(matches => matches->Belt.Array.getExn(1))
}
