/** @module eb/type */

/**
 * Checks if value is classified as a Number primitive or object.
 * To exclude Infinity, -Infinity, and NaN, which are classified as numbers, use the isFiniteNumber method.
 * @param {*} x the value to check
 * @returns true if the value is number
 * @since 0.0.1
 */
export function isNumber(x) {
  return typeof x === 'number'
}

/**
 * Checks if value is a finite primitive number.
 * @param {*} x the value to check
 * @returns true if the value is finite number
 * @since 0.0.1
 */
export function isFiniteNumber(x) {
  return typeof x === 'number' && isFinite(x)
}
