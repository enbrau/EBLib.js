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

/**
 * Checks if value is empty.
 * @param {*} x the value to check
 * @returns true if the value is null, undefined or empty string.
 * @since 0.0.1
 */
export function isEmpty(x) {
  return x === undefined || x === null || x === ''
}

/**
 * Check if value is an array
 * @param {*} x the value to check
 * @returns true if the value is an array
 * @since 0.0.1
 */
export function isArray(x) {
  if (!Array.isArray) {
    Array.isArray = function(arg) {
      return Object.prototype.toString.call(arg) === '[object Array]'
    }
  }
  return Array.isArray(x)
}

/**
 * Check if the value is boolean
 * @param {*} x the value to check
 * @returns true if the value is boolean
 * @since 0.0.1
 */
export function isBoolean(x) {
  return typeof x === 'boolean'
}
