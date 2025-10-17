import { MissionUtils } from '@woowacourse/mission-utils';
import { getSum, printData } from '../src/lib/utils';

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, 'print');
  logSpy.mockClear();
  return logSpy;
};

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

  test('printData 단위 모듈: 10', async () => {
    const logSpy = getLogSpy();

    const input = 10;
    const outputs = ['결과 : 10'];

    await printData(input);

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('printData 단위 모듈: 100', async () => {
    const logSpy = getLogSpy();

    const input = 100;
    const outputs = ['결과 : 100'];

    await printData(input);

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('printData 단위 모듈: 1000', async () => {
    const logSpy = getLogSpy();

    const input = 1000;
    const outputs = ['결과 : 1000'];

    await printData(input);

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });
});
