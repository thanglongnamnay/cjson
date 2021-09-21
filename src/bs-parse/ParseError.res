type rec t = {
  stack: array<(Location.t, string)>,
  otherFailures: array<t>,
}
let makeWith = (stack, failures) => {stack: stack, otherFailures: failures}
let make = (loc, string) => makeWith([(loc, string)], [])

let getStackTrace = error =>
  error.stack->Belt.Array.reduce([], (acc, (loc, message)) => {
    let line = Location.line(loc)
    let column = Location.col(loc)
    let finalMessage = j`$message at line $line, column $column`
    Belt.Array.concat(acc, [finalMessage])
  })

let getAllStackTrace = error => {
  let otherFailureStackTraces =
    error.otherFailures->Belt.Array.map(getStackTrace)->Belt.Array.concatMany
  Belt.Array.concat(getStackTrace(error), otherFailureStackTraces)
}

let toString = error => error->getAllStackTrace->Js.Array2.joinWith("\n")
