import { INVALID_SEP_END } from '../src/lib/error_msg';
import { isValidLength, isValidNewLine } from '../src/lib/utils';

describe('단위 모듈 테스트(isValidLength)', () => {
  test('//12345 입력', () => {
    expect(() => {
      isValidLength('//12345');
    }).not.toThrow();
  });

  test('//12 입력', () => {
    expect(() => {
      isValidLength('//12');
    }).toThrow(`${INVALID_SEP_END} #1`);
  });

  test('//,\\n 입력', () => {
    expect(() => {
      isValidLength('//,\\n');
    }).toThrow(`${INVALID_SEP_END} #1`);
  });
});

describe('단위 모듈 테스트(isValidNewLine)', () => {
  test('//,\\n1,2 입력', () => {
    expect(() => {
      isValidNewLine('//,\\n1,2');
    }).not.toThrow();
  });

  test('//,1,2,3 입력', () => {
    expect(() => {
      isValidNewLine('//,1,2,3');
    }).toThrow(`${INVALID_SEP_END} #2`);
  });
});
