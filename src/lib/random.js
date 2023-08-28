/**
 * Generate random number
 * @param {Number} min minimum number
 * @param {Number} max maximum number
 * @returns random number
 */
export function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
