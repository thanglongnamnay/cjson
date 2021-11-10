type rec t =
  | Keyword(string)
  | Variable(string)
  | FunctionCall(string, array<t>)

open StringParser

let aget = Belt.Array.getExn
let splitByComma = expr => expr->spaceAround->sepBy(string(","), _)->map(Belt.Array.reverse)

let ttrue = tag("true", Variable("true"))
let tfalse = tag("false", Variable("false"))
let tstring = str->map(s => Variable(j`"$s"`))
let tnumber = number->map(s => Variable(s))
let atom = regex("[^()][\w]*")->slice->map(v => Variable(v))
let literal = anyOf([lazy ttrue, lazy tfalse, lazy tstring, lazy tnumber])

let openParen = string("(")->spaceAround->map(_ => ())
let closeParen = string(")")->spaceAround->map(_ => ())
let comma = string(",")->spaceAround->map(_ => ())
let tlist = expr => expr->sepBy(comma, _)->map(Belt.Array.reverse)
let params = expr => surround(openParen, tlist(expr), closeParen)
let call = expr =>
  seq2(lazy (regex("[^()]\w+")->slice), lazy (expr->params))->map(((name, params)) => FunctionCall(
    name,
    params,
  ))
let rec expr = lazy anyOf([lazy literal, lazy call(Lazy.force(expr))])
run(
  seqN([lazy ttrue, lazy (comma->map(_ => Keyword(","))), lazy tfalse, lazy atom, lazy tstring]),
  "true    , falsehello\"hithere\"",
)
->get_exn
->Js.log

run(Lazy.force(expr), "clal(1, \"asdf\")")->get_exn->Js.log
