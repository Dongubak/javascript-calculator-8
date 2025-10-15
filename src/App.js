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
    this.tokens = [0];
  }

  async run() {
    try {
      await this.getInput();
      this.isStartCorrectly();
      this.isValidSepInput();
      this.isValidSepAndOperand();
      this.operationAndOutput();
    } catch (error) {
      switch (error.message) {
        case VACANCY_INPUT:
          await this.operationAndOutput();
          break;
        default:
          throw error instanceof Error ? error : new Error(String(error));
      }
    }
  }

  async getInput() {
    const inputs = await Console.readLineAsync();
    if (inputs === '') throw new Error(VACANCY_INPUT);
    this.inputs = inputs;
  }

  isValidStart(inputs) {
    const customStart = this.inputs.length > 2 ? inputs.slice(0, 2) : '';
    const numberStart = /^\d/.test(inputs);

    if (customStart !== '//' && !numberStart) throw new Error(STARTING_FAILED);

    return numberStart;
  }

  isStartCorrectly() {
    const isNumberStart = this.isValidStart(this.inputs);
    this.numberStartFlag = isNumberStart;
  }

  isValidLength(inputs) {
    const len = inputs.length;
    if (len <= 5) throw new Error(`${INVALID_SEP_END} #1`);
  }

  isValidNewLine(inputs) {
    const maybeNewLine = this.inputs.slice(3, 5);
    if (maybeNewLine !== '\\n') throw new Error(`${INVALID_SEP_END} #2`);
  }

  isValidSepInput() {
    if (this.numberStartFlag) return;
    this.isValidLength(this.inputs);
    this.isValidNewLine(this.inputs);
    const sep = this.inputs[2];

    this.defaultSep = [...this.defaultSep, sep];
    this.inputs = this.inputs.slice(5);
  }

  escapeForCharClass(s) {
    return s.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
  }

  isValidSepAndOperand() {
    const splitedInputs = this.getSplitter(this.inputs, this.defaultSep);
    this.isValidSep(splitedInputs);
    for (const str of splitedInputs) this.isValidSepOrChar(str);
    this.tokens = splitedInputs.map(Number);
  }

  isValidSepOrChar(str) {
    const isValid = /^\d+$/.test(str);
    if (!isValid) throw new Error(`${INVALID_OPERAND_OR_SEP} #3`);
  }

  isValidSep(splitedInputs) {
    if (splitedInputs.some((t) => t.length === 0)) {
      throw new Error(`${INVALID_OPERAND_OR_SEP}`);
    }
  }

  getSplitter(inputs, seperators) {
    const cls = this.escapeForCharClass(seperators.join(''));
    const splitter = new RegExp(`[${cls}]`, 'g');
    const splitedInputs = inputs.split(splitter);
    return splitedInputs;
  }

  getSum(tokens) {
    return tokens.reduce((acc, n) => acc + n, 0);
  }

  async operationAndOutput() {
    const sum = this.getSum(this.tokens);
    await Console.print(`결과 : ${sum}`);
  }
}

export default App;
