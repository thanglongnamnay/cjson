let explode = str => str->Js.String2.split("")->Belt.Array.map(String.get(_, 0))

let char_to_string = char => char->Char.code->Js.String2.fromCharCode

let char_array_to_string = chars => chars->Belt.Array.reduce("", (a, v) => a ++ char_to_string(v))
let char_list_to_string = chars => chars->Belt.List.reduce("", (a, v) => a ++ char_to_string(v))

let take = (n, arr) => arr->Belt.Array.slice(~offset=0, ~len=n)
