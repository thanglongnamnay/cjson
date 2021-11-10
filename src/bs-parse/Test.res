let test = (fn: int => int, v) => {
  Js.log("do not optimize")
  fn(v)
}

let add = (a, b, c) => a + b + c

let t2 = x => test(add(1, x))->Js.log
