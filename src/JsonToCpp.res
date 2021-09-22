type cppType = {
  typedef: string,
  expr: string,
}
let makeCppType = (typedef, expr) => {typedef: typedef, expr: expr}
let makeTemplatedType = (t, template) => {
  makeCppType(t.typedef, j`${template}<${t.expr}>`)
}
let reserverWords = [
  "asm",
  "double",
  "new",
  "switch",
  "auto",
  "else",
  "operator",
  "template",
  "break",
  "enum",
  "private",
  "this",
  "case",
  "extern",
  "protected",
  "throw",
  "catch",
  "float",
  "public",
  "try",
  "char",
  "for",
  "register",
  "typedef",
  "class",
  "friend",
  "return",
  "union",
  "const",
  "goto",
  "short",
  "unsigned",
  "continue",
  "if",
  "signed",
  "virtual",
  "default",
  "inline",
  "sizeof",
  "void",
  "delete",
  "int",
  "static",
  "volatile",
  "do",
  "long",
  "struct",
  "while",
]
let safe = name => reserverWords->Belt.Array.some(word => word == name) ? name ++ "_" : name

let rec genCpp = (name, schema) => {
  open JsonToCode
  switch schema {
  | Unknown => makeCppType("", "unknown")
  | Bool => makeCppType("", "bool")
  | Number => makeCppType("", "double")
  | String => makeCppType("", "std::string")
  | Option(schema) => makeTemplatedType(genCpp(j`${name}_element`, schema), "maybe")
  | Array(Unknown) => makeCppType("", "vector<unknown>")
  | Array(schema) => makeTemplatedType(genCpp(j`${name}_element`, schema), "vector")
  | Map(schema) => makeTemplatedType(genCpp(j`${name}_element`, schema), "map")
  | Object(entries) => {
      let types =
        entries->Belt.Map.String.toArray->Belt.Array.map(((key, value)) => genCpp(key, value))
      let typedefs =
        types
        ->Belt.Array.map(t => t.typedef)
        ->Belt.Array.keep(t => t != "")
        ->Belt.Array.map(str => str ++ ";\n")
        ->Js.Array2.joinWith("")
      let elements =
        entries
        ->Belt.Map.String.toArray
        ->Belt.Array.map(((name, value)) => (name, value, genCpp(name, value)))
      let declarations =
        elements
        ->Belt.Array.map(((name, _, t)) => j`const ${t.expr} ${safe(name)}` ++ ";\n")
        ->Js.Array2.joinWith("")
      let assignments =
        elements
        ->Belt.Array.map(((name, value, _)) => {
          let name' = safe(name)
          switch value {
          | Unknown => j`${name'}()`
          | Bool => j`${name'}(v["${name}"].GetBool())`
          | Number => j`${name'}(v["${name}"].GetDouble())`
          | String => j`${name'}(v["${name}"].GetString())`
          | Option(_) => j`${name'}(v, "${name}")`
          | Array(Unknown) => j`${name'}(vector<unknown>())`
          | Array(_) => j`${name'}(v["${name}"])`
          | Map(_) => j`${name'}(v["${name}"])`
          | Object(_) => j`${name'}(v["${name}"])`
          }
        })
        ->Js.Array2.joinWith(",\n")
      let name' = safe(name)
      makeCppType(
        elements->Belt.Array.length > 0
          ? j`struct ${name'} {
          ${typedefs}
          ${declarations}
          explicit ${name'}(const rapidjson::Value& v) :
          ${assignments} {}
          };`
          : j`struct ${name'} {
            explicit ${name'}(const rapidjson::Value& v) {}
          }`,
        name',
      )
    }
  }
}

let run = (name, json) => {
  let cpp = JsonToCode.run(json)->genCpp(name, _)

  j`
#ifndef ${name->Js.String2.toUpperCase}_GENERATED_H
#define ${name->Js.String2.toUpperCase}_GENERATED_H

#include "cjson/cjson.h"
namespace cjson {
${cpp.typedef}
using ${name} = ${cpp.expr};
}

#endif
`
}
