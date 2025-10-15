import createErrorType from './createType';

export const STARTING_FAILED = createErrorType('starting with invalid form');

export const INVALID_SEP_END = createErrorType('invalid sep or ender');

export const INVALID_OPERAND_OR_SEP = createErrorType('invalid operand or sep');

export const VACANCY_INPUT = createErrorType('input is vacancy');

// export const INVALID_OPERAND = createErrorType('invalid operand');

// export const UNIDENTIFIED_SEP = createErrorType('unidentified sep');
