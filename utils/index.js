export function utcSecondsNow () {
  const now = new Date()
  const utcMillis = now.getTime() - (now.getTimezoneOffset() * 60 * 1000)
  return Math.ceil(utcMillis / 1000)
}
