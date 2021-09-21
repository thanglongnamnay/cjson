open JsonParser
open Belt

type rec schema =
  | Unknown
  | Bool
  | Number
  | String
  | Option(schema)
  | Array(schema)
  | Map(schema)
  | Object(Map.String.t<schema>)

let rec stringify = schema =>
  switch schema {
  | Unknown => "unknown"
  | Bool => "bool"
  | Number => "number"
  | String => "string"
  | Option(schema) => `Option(${stringify(schema)})`
  | Array(schema) => `Array(${stringify(schema)})`
  | Map(schema) => `Map(${stringify(schema)})`
  | Object(schemas) => {
      let props =
        schemas
        ->Map.String.toArray
        ->Array.map(((key, schema)) => `${key}: ${stringify(schema)}, `)
        ->Js.Array2.joinWith("\n")
      `Object(
          ${props}
        )`
    }
  }

@module external validVarName: string => bool = "is-var-name"

let rec join = (a, b) => {
  switch (a, b) {
  | (Unknown, Unknown) => Unknown
  | (Unknown, Option(b)) => Option(b)
  | (Option(a), Unknown) => Option(a)
  | (Unknown, b) => Option(b)
  | (a, Unknown) => Option(a)
  | (Bool, Bool) => Bool
  | (Number, Number) => Number
  | (String, String) => String
  | (a, Option(b)) => Option(join(a, b))
  | (Option(a), b) => Option(join(a, b))
  | (Array(a), Array(b)) => Array(join(a, b))
  | (Map(a), Map(b)) => Map(join(a, b))
  | (Object(a), Object(b)) =>
    Map.String.merge(a, b, (_, a, b) => {
      switch (a, b) {
      | (Some(a), Some(b)) => Some(join(a, b))
      | (Some(a), None) => Some(Option(a))
      | (None, Some(b)) => Some(Option(b))
      | (None, None) => assert false
      }
    })->Object
  | _ => Unknown
  }
}

let rec toSchema = json => {
  switch json {
  | JBool(_) => Bool
  | JNumber(_) => Number
  | JString(_) => String
  | JOption(v) => Option(Option.isSome(v) ? toSchema(Option.getExn(v)) : Unknown)
  | JArray([]) => Array(Unknown)
  | JArray(v) =>
    v->Array.reduce(v->Array.getExn(0)->toSchema, (a, v) => join(a, v->toSchema))->Array
  | JObject(v) => {
      let schemas = v->Map.String.map(toSchema)
      let first = schemas->Map.String.findFirstBy((_, _) => true)
      if first->Option.isNone {
        Object([]->Map.String.fromArray)
      } else {
        let (firstKey, firstSchema) = first->Option.getExn
        if !(v->Map.String.every((key, _) => validVarName(key))) {
          // invalid key name, fallback to map
          schemas
          ->Map.String.reduce(firstSchema, (a, key, v) => key == firstKey ? a : join(a, v))
          ->Map
        } else {
          switch firstSchema {
          | Unknown
          | Bool
          | Number
          | String =>
            Object(schemas) // primitive dont usually make a map
          | _ =>
            if (
              schemas->Map.String.size > 1 &&
                schemas->Map.String.every((_, schema) => schema == firstSchema)
            ) {
              // all object same type
              Map(firstSchema)
            } else {
              Object(schemas)
            }
          }
        }
      }
    }
  }
}
let run = json => Combinators.run(obj, json)->Combinators.get_exn->toSchema
