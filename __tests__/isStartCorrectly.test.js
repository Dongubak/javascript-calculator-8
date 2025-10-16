import { STARTING_FAILED } from '../src/lib/error_msg';
import { isValidStart } from '../src/lib/utils';

describe('단위 모듈 테스트', () => {
  test('//123 입력', () => {
    const isNumberStart = isValidStart('//123');
    expect(isNumberStart).toEqual(false);
  });

  test('1,2,3 입력', () => {
    const isNumberStart = isValidStart('1,2,3');
    expect(isNumberStart).toEqual(true);
  });

  test('&84 입력', () => {
    expect(() => {
      isValidStart('&84');
    }).toThrow(STARTING_FAILED);
  });
});
