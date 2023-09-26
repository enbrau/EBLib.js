/**
 * Generate random number
 * @param {Number} min minimum number
 * @param {Number} max maximum number
 * @returns random number
 * @since 0.0.1
 */
export function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 * Generate random serial number
 * @returns random number
 * @since 0.0.1
 */
export function serialNo() {
  return parseInt(new Date().getTime() + '' + Math.floor(Math.random() * (999 - 100 + 1) + 100))
}

/**
 * Generate random serial number
 * @returns random number
 * @since 0.0.1
 */
export function prefixedSerialNo(prefix) {
  return prefix + '' + parseInt(new Date().getTime() + '' + Math.floor(Math.random() * (999 - 100 + 1) + 100))
}

/**
 * Generater uuid
 * @returns uuid
 * @since 0.0.1
 */
export function uuid() {
  if (typeof crypto === 'object') {
    if (typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID();
    }
    if (typeof crypto.getRandomValues === 'function' && typeof Uint8Array === 'function') {
      const callback = (c) => {
        const num = Number(c);
        return (num ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (num / 4)))).toString(16);
      };
      return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, callback);
    }
  }
  let timestamp = new Date().getTime();
  let perforNow = (typeof performance !== 'undefined' && performance.now && performance.now() * 1000) || 0;
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    let random = Math.random() * 16;
    if (timestamp > 0) {
      random = (timestamp + random) % 16 | 0;
      timestamp = Math.floor(timestamp / 16);
    } else {
      random = (perforNow + random) % 16 | 0;
      perforNow = Math.floor(perforNow / 16);
    }
    return (c === 'x' ? random : (random & 0x3) | 0x8).toString(16);
  })
}

/**
 * generate random string
 * @param {*} len length of the string
 * @returns 
 */
export function randomString(len) {
  let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz123456789';
  let strLen = chars.length;
  let randomStr = '';
  for (let i = 0; i < len; i++) {
      randomStr += chars.charAt(Math.floor(Math.random() * strLen));
  }
  return randomStr;
}