type rec json =
  | JBool(bool)
  | JNumber(float)
  | JString(string)
  | JOption(option<json>)
  | JArray(array<json>)
  | JObject(Belt.Map.String.t<json>)

let either = (v, some, none) => {
  if v->Belt.Option.isNone {
    none()
  } else {
    some(v->Belt.Option.getUnsafe)
  }
}

let rec stringify = json =>
  switch json {
  | JBool(v) => v ? "true" : "false"
  | JNumber(v) => Belt.Float.toString(v)
  | JString(v) => v
  | JOption(v) => v->either(v => `Some(${stringify(v)})`, () => `None`)
  | JArray(v) => `Array[${v->Belt.Array.map(stringify)->Js.Array2.joinWith(", ")}]`
  | JObject(v) => {
      let entries =
        v
        ->Belt.Map.String.map(stringify)
        ->Belt.Map.String.toArray
        ->Belt.Array.map(((key, value)) => `"${key}": ${value}`)
        ->Js.Array2.joinWith(",\n")
      `Object{
${entries}
}`
    }
  }

open StringParser

let none = lazy tag("null", JOption(None))
let trueBool = lazy tag("true", JBool(true))
let falseBool = lazy tag("false", JBool(false))
let bools = lazy anyOf([trueBool, falseBool])
let quotedString = lazy (str->map(s => JString(s)))
let number = lazy (
  number->map(numberStr => JNumber(
    numberStr->Belt.Float.fromString->Belt.Option.getWithDefault(0.),
  ))
)
let objectMemberP = expr =>
  regex("\"([^\"]*)\"\s*:\s*")->flatMap(captured =>
    expr->map(value => (captured->Belt.Array.getExn(1), value))
  )
let splitByColon = expr => expr->spaceAround->sepBy(string(","), _)
let objP = expr =>
  surround(string("{"), expr->objectMemberP->splitByColon, string("}"))->map(res => JObject(
    Belt.Map.String.fromArray(res),
  ))
let arrayP = expr => surround(string("["), expr->splitByColon, string("]"))->map(res => JArray(res))
let rec expr = lazy anyOf([
  bools,
  quotedString,
  number,
  none,
  lazy objP(Lazy.force(expr)),
  lazy arrayP(Lazy.force(expr)),
])
