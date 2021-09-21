open Util

type t = {
  input: string,
  offset: int,
}

let make = (input, offset) => {input: input, offset: offset}
let line = loc => {
  let countBreaks = str =>
    explode(str)->Belt.Array.reduce(0, (acc, v) =>
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
