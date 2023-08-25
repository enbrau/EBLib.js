/** @module eb/type */

/**
 * Checks if value is classified as a Number primitive or object.
 * @param {*} x the value to check
 * @returns true if the value is number
 */
export function isNumber(x) {
  return typeof x === 'number'
}

/**
 * Checks if value is a finite primitive number.
 * @param {*} x the value to check
 * @returns true if the value is finite number
 */
export function isFiniteNumber(x) {
  return typeof x === 'number' && isFinite(x)
}
