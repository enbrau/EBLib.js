export function isNumber(x) {
  return typeof x === 'number'
}

export function isFiniteNumber(x) {
  return isNumber(x) && isFinite(x)
}
