export function generateVerificationCode() {
  return Math.round(Math.random() * 1000000).toString();
}
