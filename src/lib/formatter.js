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

/**
 * Transform number into Chinese amount
 * @param {*} num 
 * @returns Chinese amount string
 */
export function toChineseAmount(num) {
  if (num === 0) {
    return '零'
  }

  if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(num)) {
    return ''
  }

  const UNIT   = '仟佰拾兆仟佰拾亿仟佰拾万仟佰拾元角分'
  const NUMBER = '零壹贰叁肆伍陆柒捌玖'
  
  num += '00'
  const p = num.indexOf('.');
  if (p >= 0) {
    num = num.substring(0, p) + num.substr(p + 1, 2)
  }

  let str = ''
  for (var i = 0; i < num.length; i++) {
    let u = UNIT.substr(UNIT.length - num.length)
    str += NUMBER.charAt(num.charAt(i)) + u.charAt(i)
  }
  return str.replace(/零(仟|佰|拾|角)/g, "零").replace(/(零)+/g, "零").replace(/零(万|亿|元)/g, "$1").replace(/(亿)万/g, "$1$2").replace(/^元零?|零分/g, "").replace(/元$/g, "元整");
}
