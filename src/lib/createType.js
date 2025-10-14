/**
 * @param {string} message  메세지
 */
export default function createErrorType(message = '') {
  return `[ERROR]: ${message}`;
}
