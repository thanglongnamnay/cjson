let explode = str => {
  let rec exp = (i, list) =>
    if i < 0 {
      list
    } else {
      exp(i - 1, [String.get(str, i)]->Belt.Array.concat(list))
    }
  exp(String.length(str) - 1, [])
}

let char_to_string = Js.String2.fromCharCode

let char_list_to_string = chars => chars->Belt.Array.reduce("", (a, v) => a ++ char_to_string(v))

let take = (n, arr) => arr->Belt.Array.slice(~offset=0, ~len=n)
