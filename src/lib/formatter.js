/**
 * Transform number into amount
 * @param {*} num 
 * @param {*} prefix 
 * @returns amount string
 * @since 0.0.1
 */
export function toAmount(num, prefix) {
  num = num.toFixed(2)
  num = num.parseFloat(num)
  return (prefix || '') + num.toLocaleStrint()
}
