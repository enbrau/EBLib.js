/**
 * 
 * @returns 
 */
export function isMobile() {
  return navigator.userAgent.match(/(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i) ? 'mobile' : 'desktop'
}