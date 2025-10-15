import { Console } from '@woowacourse/mission-utils';
import {
  INVALID_OPERAND,
  INVALID_SEP_END,
  STARTING_FAILED,
  UNIDENTIFIED_SEP,
  VACANCY_INPUT,
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

  isValidSepAndOperand() {
    const allowedChars = [...this.defaultSep, ...'0123456789'].join('');
    const invalidChar = new RegExp(`[^${allowedChars}]`);

    if (invalidChar.test(this.inputs)) throw new Error(UNIDENTIFIED_SEP);

    let idx = 0;
    try {
      for (const ch of this.inputs) {
        if (idx++ % 2) this.isValidSep(ch);
        else this.isValidNumber(ch);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  isValidNumber(ch) {
    const isNumber = /^\d/.test(ch);
    if (!isNumber) throw new Error(INVALID_OPERAND);
  }

  isValidSep(ch) {
    const isValidSep = this.defaultSep.includes(ch);
    if (!isValidSep) throw new Error(UNIDENTIFIED_SEP);
  }

  getSum() {
    let idx = 0,
      sum = 0;
    for (const n of this.inputs) if (!(idx++ % 2)) sum += +n;

    this.output = sum;
  }

  async operationAndOutput() {
    this.getSum();
    await Console.print(`결과 : ${this.output}`);
  }
}

export default App;
