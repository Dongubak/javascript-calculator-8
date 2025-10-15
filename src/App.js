import { Console } from '@woowacourse/mission-utils';
import {
  INVALID_SEP_END,
  STARTING_FAILED,
  VACANCY_INPUT,
  INVALID_OPERAND_OR_SEP,
} from './lib/error_msg';

class App {
  constructor() {
    this.inputs = '';
    this.defaultSep = [',', ':'];
    this.numberStartFlag = true;
    this.output = 0;
  }

  async run() {
    try {
      await this.getInput();
      this.isStartCorrectly();
      this.isValidSepInput();
      this.isValidSepAndOperand();
      this.operationAndOutput();
    } catch (error) {
      /// 에러 보존을 위한 인스턴스 에러 throw
      throw error instanceof Error ? error : new Error(String(error));
    }
  }

  async getInput() {
    const inputs = await Console.readLineAsync();
    if (inputs === '') throw new Error(`[ERROR]: ${VACANCY_INPUT}`);
    this.inputs = inputs;
  }

  isStartCorrectly() {
    const customStart = this.inputs.length > 2 ? this.inputs.slice(0, 2) : '';
    const numberStart = /^\d/.test(this.inputs);

    if (customStart !== '//' && !numberStart) throw new Error(STARTING_FAILED);

    this.numberStartFlag = numberStart;
  }

  isValidSepInput() {
    if (this.numberStartFlag) return;
    if (this.inputs.length <= 5) throw new Error(`${INVALID_SEP_END} #1`);

    const sep = this.inputs[2];
    const maybeNewLine = this.inputs.slice(3, 5);

    if (maybeNewLine !== '\\n') throw new Error(`${INVALID_SEP_END} #2`);

    this.defaultSep = [...this.defaultSep, sep];
    this.inputs = this.inputs.slice(5);
  }

  escapeForCharClass(s) {
    return s.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
  }

  isValidSepAndOperand() {
    // 1) 현재 등록된 구분자들로 split 준비
    const cls = this.escapeForCharClass(this.defaultSep.join(''));
    const splitter = new RegExp(`[${cls}]`, 'g');

    // 2) 구분자로 분리 (예: "1,2:3" -> ["1","2","3"])
    const splitedInputs = this.inputs.split(splitter);

    // 3) 연속/선행/후행 구분자 -> 빈 토큰 발생 시 단일 에러
    if (splitedInputs.some((t) => t.length === 0)) {
      throw new Error(`${INVALID_OPERAND_OR_SEP}`);
    }

    for (const str of splitedInputs) {
      if (!/^\d+$/.test(str)) {
        // 알 수 없는 구분자나 문자(예: "1%2")도 여기서 걸림
        throw new Error(`${INVALID_OPERAND_OR_SEP}`);
      }
    }

    this.tokens = splitedInputs.map(Number);
  }

  isValidNumber(ch) {
    const isNumber = /^\d+$/.test(str);
    if (!isNumber) {
      throw new Error(`${INVALID_OPERAND_OR_SEP} #2`);
    }
  }

  isValidSep(ch) {
    const isValidSep = this.defaultSep.includes(ch);
    if (!isValidSep) throw new Error(`${INVALID_OPERAND_OR_SEP} #3`);
  }

  getSum() {
    this.output = this.tokens.reduce((acc, n) => acc + n, 0);
  }

  async operationAndOutput() {
    this.getSum();
    await Console.print(`결과 : ${this.output}`);
  }
}

export default App;
