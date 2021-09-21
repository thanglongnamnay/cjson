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

let rec print = json =>
  switch json {
  | JBool(v) => v ? "true" : "false"
  | JNumber(v) => Belt.Float.toString(v)
  | JString(v) => v
  | JOption(v) => v->either(v => `Some(${print(v)})`, () => `None`)
  | JArray(v) => `Array[${v->Belt.Array.map(print)->Js.Array2.joinWith(", ")}]`
  | JObject(v) => {
      let entries =
        v
        ->Belt.Map.String.map(print)
        ->Belt.Map.String.toArray
        ->Belt.Array.map(((key, value)) => `"${key}": ${value}`)
        ->Js.Array2.joinWith(",\n")
      `Object{
${entries}
}`
    }
  }

let none = Combinators.string("null")->Combinators.map(_ => JOption(None))
let trueBool = Combinators.string("true")->Combinators.map(_ => JBool(true))
let falseBool = Combinators.string("false")->Combinators.map(_ => JBool(false))
let bools = trueBool->Combinators.orElse(lazy falseBool)
let quotedString = CommonCombinators.str->Combinators.map(s => JString(s))
let number =
  CommonCombinators.number->Combinators.map(numberStr => JNumber(
    numberStr->Belt.Float.fromString->Belt.Option.getWithDefault(0.),
  ))
let literal =
  bools
  ->Combinators.orElse(lazy quotedString)
  ->Combinators.orElse(lazy number)
  ->Combinators.orElse(lazy none)
let objectMemberP = expr =>
  Combinators.regex("\"([^\"]*)\"\s*:\s*")->Combinators.flatMap(captured =>
    expr->Combinators.map(value => {
      let key = captured->Belt.Array.getExn(1)
      (key, value)
    })
  )
let objP = expr =>
  CommonCombinators.surround(
    Combinators.string("{"),
    Combinators.sepBy(Combinators.string(","), expr->objectMemberP->CommonCombinators.spaceAround),
    Combinators.string("}"),
  )->Combinators.map(res => JObject(Belt.Map.String.fromArray(res)))
let arrayP = expr =>
  CommonCombinators.surround(
    Combinators.string("["),
    Combinators.sepBy(Combinators.string(","), expr->CommonCombinators.spaceAround),
    Combinators.string("]"),
  )->Combinators.map(res => JArray(res))
let rec expr = lazy (
  literal
  ->Combinators.orElse(lazy objP(Lazy.force(expr)))
  ->Combinators.orElse(lazy arrayP(Lazy.force(expr)))
)
let objectMember = objectMemberP(Lazy.force(expr))
let obj = objP(Lazy.force(expr))
let array = arrayP(Lazy.force(expr))
