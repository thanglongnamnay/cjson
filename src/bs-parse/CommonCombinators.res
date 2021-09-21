open Combinators

let eof = regex("$")->slice->map(_ => ())->label("Expected EOF", _)

let whitespace = regex("[\s]*")->slice->map(_ => ())

let spaceAround = bodyP =>
  whitespace->flatMap(_ => bodyP->flatMap(result => whitespace->map(_ => result)))

let surround = (openP, bodyP, closeP) =>
  openP->flatMap(_ => spaceAround(bodyP)->flatMap(result => closeP->map(_ => result)))

let number = regex("-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?")->slice

let str = regex("\"([^\"]*)\"")->map(matches => matches->Belt.Array.getExn(1))
