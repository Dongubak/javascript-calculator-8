import createErrorType from './createType';

export const STARTING_FAILED = createErrorType('starting with invalid form');

export const INVALID_SEP_END = createErrorType('invalid sep or ender');

export const INVALID_OPERAND = createErrorType('invalid operand');

export const UNIDENTIFIED_SEP = createErrorType('unidentified sep');

export const VACANCY_INPUT = createErrorType('input is vacancy');
