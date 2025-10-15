import {
  INVALID_SEP_END,
  STARTING_FAILED,
  INVALID_OPERAND_OR_SEP,
} from './error_msg';

export function isValidSepOrChar(str) {
  const isValid = /^\d+$/.test(str);
  if (!isValid) throw new Error(`${INVALID_OPERAND_OR_SEP} #3`);
}

export function isValidStart(inputs) {
  const customStart = inputs.length > 2 ? inputs.slice(0, 2) : '';
  const numberStart = /^\d/.test(inputs);

  if (customStart !== '//' && !numberStart) throw new Error(STARTING_FAILED);

  return numberStart;
}

export function getSplitter(inputs, seperators) {
  const cls = escapeForCharClass(seperators.join(''));
  const splitter = new RegExp(`[${cls}]`, 'g');
  const splitedInputs = inputs.split(splitter);
  return splitedInputs;
}

export function isValidSep(splitedInputs) {
  if (splitedInputs.some((t) => t.length === 0)) {
    throw new Error(`${INVALID_OPERAND_OR_SEP}`);
  }
}

export function getSum(tokens) {
  return tokens.reduce((acc, n) => acc + n, 0);
}

export function isValidLength(inputs) {
  const len = inputs.length;
  if (len <= 5) throw new Error(`${INVALID_SEP_END} #1`);
}

export function isValidNewLine(inputs) {
  const maybeNewLine = inputs.slice(3, 5);
  if (maybeNewLine !== '\\n') throw new Error(`${INVALID_SEP_END} #2`);
}

function escapeForCharClass(s) {
  return s.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
}
