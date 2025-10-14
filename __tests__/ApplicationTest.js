import App from '../src/App.js';
import { Console, MissionUtils } from '@woowacourse/mission-utils';
import {
  INVALID_OPERAND,
  INVALID_SEP_END,
  STARTING_FAILED,
  UNIDENTIFIED_SEP,
  VACANCY_INPUT,
} from '../src/lib/error_msg.js';

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();
    return Promise.resolve(input);
  });
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, 'print');
  logSpy.mockClear();
  return logSpy;
};

test.skip('입력확인 #1', async () => {
  const inputs = ['sample'];
  mockQuestions(inputs);

  const logSpy = getLogSpy();
  const outputs = ['sample'];

  // const app = new App();
  // await app.run();
  const actualInput = await Console.readLineAsync();
  Console.print(actualInput);

  outputs.forEach((output) => {
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
  });
});

describe('입력 전처리 테스트', () => {
  test('빈 입력에 대한 에러 확인', async () => {
    const inputs = [''];
    mockQuestions(inputs);
    const app = new App();

    await expect(app.run()).rejects.toThrow(VACANCY_INPUT);
  });

  test('시작 문자의 유효성 검증', async () => {
    const inputs = ['%'];
    mockQuestions(inputs);
    const app = new App();

    await expect(app.run()).rejects.toThrow(STARTING_FAILED);
  });

  test('구분자 입력 규칙 검증', async () => {
    const inputs = ['//@i'];
    mockQuestions(inputs);
    const app = new App();

    await expect(app.run()).rejects.toThrow(INVALID_SEP_END);
  });

  test('계산 항의 피연산자 검증', async () => {
    const inputs = ['//$\\n1,d'];
    mockQuestions(inputs);
    const app = new App();

    await expect(app.run()).rejects.toThrow(INVALID_OPERAND);
  });

  test('계산 항의 구분자 검증', async () => {
    const inputs = ['//$\\n1@2'];
    mockQuestions(inputs);
    const app = new App();

    await expect(app.run()).rejects.toThrow(UNIDENTIFIED_SEP);
  });
});

describe('문자열 계산기(커스텀 구분자 사용)', () => {
  test('커스텀 구분자 사용 #1', async () => {
    const inputs = ['//;\\n1'];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 1'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('커스텀 구분자 사용 #2', async () => {
    const inputs = ['//;\\n1;2'];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 3'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('예외 테스트', async () => {
    const inputs = ['-1,2,3'];
    mockQuestions(inputs);

    const app = new App();

    await expect(app.run()).rejects.toThrow('[ERROR]');
  });
});

describe('문자열 계산기(커스텀 구분자 미사용) [성공]', () => {
  test('커스텀 구분자 미사용 #1', async () => {
    const inputs = ['1,2,3'];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 6'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('커스텀 구분자 미사용 #2', async () => {
    const inputs = ['1:2:3'];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 6'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  //! 현재 로직은 한자리 숫자만 판단 가능하며 두자리 이상의 숫자 입력시 에러 발생한다.

  test('커스텀 구분자 미사용 #3', async () => {
    const inputs = ['12:2:3'];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 17'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });
});

describe('문자열 계산기(커스텀 구분자 미사용) [실패]', () => {
  test('타당하지 않은 구분자 #1', async () => {
    const inputs = ['1@2@3'];
    mockQuestions(inputs);
    const app = new App();

    await expect(app.run()).rejects.toThrow(UNIDENTIFIED_SEP);
  });

  //! 이는 음수를 입력받은 경우로 에러를 추가해야 한다.
  test('타당하지 않은 숫자 #1', async () => {
    const inputs = ['-1@2@3'];
    mockQuestions(inputs);
    const app = new App();

    await expect(app.run()).rejects.toThrow(STARTING_FAILED);
  });
});
