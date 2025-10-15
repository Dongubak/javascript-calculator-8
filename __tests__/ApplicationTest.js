import App from '../src/App.js';
import { Console, MissionUtils } from '@woowacourse/mission-utils';
import {
  INVALID_OPERAND_OR_SEP,
  INVALID_SEP_END,
  STARTING_FAILED,
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

    await expect(app.run()).rejects.toThrow(INVALID_OPERAND_OR_SEP);
  });

  test('계산 항의 구분자 검증', async () => {
    const inputs = ['//$\\n1@2'];
    mockQuestions(inputs);
    const app = new App();

    await expect(app.run()).rejects.toThrow(INVALID_OPERAND_OR_SEP);
  });

  test('커스텀 구분자 여러개 입력시 구분자 검증', async () => {
    const inputs = ['//$#\\n1$2'];
    mockQuestions(inputs);
    const app = new App();

    await expect(app.run()).rejects.toThrow(INVALID_SEP_END);
  });

  test('음수 입력 검증', async () => {
    const inputs = ['//$\\n1$-2'];
    mockQuestions(inputs);
    const app = new App();

    await expect(app.run()).rejects.toThrow(INVALID_OPERAND_OR_SEP);
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

  test('커스텀 구분자 사용 #3', async () => {
    const inputs = ['//;\\n1;2;5'];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 8'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('커스텀 구분자 사용 #4', async () => {
    const inputs = ['//;\\n1;2;35'];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 38'];

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

describe('App 프로퍼티 접근 테스트', () => {
  test('프로퍼티의 타당성 검증', async () => {
    // 1️⃣ 입력 모킹
    const inputs = ['12:2:3'];
    mockQuestions(inputs);

    // 2️⃣ Console.print를 spy 처리
    const logSpy = getLogSpy();

    // 3️⃣ App 인스턴스 생성 및 실행
    const app = new App();
    await app.run();
    expect(app.output).toBe(17); // getSum() 결과
    // await Console.print(`inputs: ${app.inputs}`);

    // 5️⃣ 콘솔 출력 결과 검증
    const outputs = ['결과 : 17'];
    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
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

  test('커스텀 구분자 미사용 #3', async () => {
    const inputs = ['12:2:3'];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 17'];

    const app = new App();
    await app.run();

    // await Console.print(app.token);

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

    await expect(app.run()).rejects.toThrow(INVALID_OPERAND_OR_SEP);
  });

  test('타당하지 않은 숫자 #1', async () => {
    const inputs = ['-1@2@3'];
    mockQuestions(inputs);
    const app = new App();

    await expect(app.run()).rejects.toThrow(STARTING_FAILED);
  });
});
