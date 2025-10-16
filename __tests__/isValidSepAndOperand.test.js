import { INVALID_OPERAND_OR_SEP } from '../src/lib/error_msg';
import { getSplitter, isValidSep, isValidSepOrChar } from '../src/lib/utils';

describe('단위 모듈 테스트(getSplitter)', () => {
  test('구분자 하나만 사용하는 입력 #1', () => {
    const splitedInputs = getSplitter('1,2,3,4,5', [',', ':']);
    expect(splitedInputs).toEqual(['1', '2', '3', '4', '5']);
  });

  test('구분자 하나만 사용하는 입력 #2', () => {
    const splitedInputs = getSplitter('1:2:3:4:5', [',', ':']);
    expect(splitedInputs).toEqual(['1', '2', '3', '4', '5']);
  });

  test('구분자 여러개 사용하는 입력', () => {
    const splitedInputs = getSplitter('1,2:3:4:5', [',', ':']);
    expect(splitedInputs).toEqual(['1', '2', '3', '4', '5']);
  });
});

describe('단위 모듈 테스트(isValidSep)', () => {
  test('구분자가 정상적인 입력', () => {
    const splitedInputs = ['1', '2', '3'];
    expect(() => {
      isValidSep(splitedInputs);
    }).not.toThrow(INVALID_OPERAND_OR_SEP);
  });
  test('여러개의 구분자로 인해 오염된 입력', () => {
    const splitedInputs = ['1', '', '3'];
    expect(() => {
      isValidSep(splitedInputs);
    }).toThrow(INVALID_OPERAND_OR_SEP);
  });
});

describe('단위 모듈 테스트(isValidSepOrChar', () => {
  test('', () => {
    const str = '1';
    expect(() => {
      isValidSepOrChar(str);
    }).not.toThrow(INVALID_OPERAND_OR_SEP);
  });
  test('', () => {
    const str = '12';
    expect(() => {
      isValidSepOrChar(str);
    }).not.toThrow(INVALID_OPERAND_OR_SEP);
  });
  test('', () => {
    const str = '123';
    expect(() => {
      isValidSepOrChar(str);
    }).not.toThrow(INVALID_OPERAND_OR_SEP);
  });
  test('', () => {
    const str = 'abc';
    expect(() => {
      isValidSepOrChar(str);
    }).toThrow(INVALID_OPERAND_OR_SEP);
  });
});
