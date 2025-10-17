import { getSum } from '../src/lib/utils';

describe('operationAndOutput 단위 모듈 테스트', () => {
  test('getSum 단위 모듈 : [1, 2, 3]', () => {
    const ret = getSum([1, 2, 3]);
    expect(ret).toBe(6);
  });

  test('getSum 단위 모듈 : [10, 2, 3]', () => {
    const ret = getSum([1, 2, 3]);
    expect(ret).toBe(6);
  });

  test('getSum 단위 모듈 : [10, 20, 30]', () => {
    const ret = getSum([10, 20, 30]);
    expect(ret).toBe(60);
  });

  test('getSum 단위 모듈 : [100, 200, 300]', () => {
    const ret = getSum([100, 200, 300]);
    expect(ret).toBe(600);
  });
});
