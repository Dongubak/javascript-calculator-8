import { Console } from '@woowacourse/mission-utils';
import { VACANCY_INPUT } from './lib/error_msg';
import {
  getSplitter,
  getSum,
  isValidLength,
  isValidNewLine,
  isValidSep,
  isValidSepOrChar,
  isValidStart,
} from './lib/utils';
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

  isStartCorrectly() {
    const isNumberStart = isValidStart(this.inputs);
    this.numberStartFlag = isNumberStart;
  }

  isValidSepInput() {
    if (this.numberStartFlag) return;
    isValidLength(this.inputs);
    isValidNewLine(this.inputs);
    const sep = this.inputs[2];

    this.defaultSep = [...this.defaultSep, sep];
    this.inputs = this.inputs.slice(5);
  }

  isValidSepAndOperand() {
    const splitedInputs = getSplitter(this.inputs, this.defaultSep);
    isValidSep(splitedInputs);
    splitedInputs.forEach((str) => {
      isValidSepOrChar(str);
    });
    this.tokens = splitedInputs.map(Number);
  }

  async operationAndOutput() {
    const sum = getSum(this.tokens);
    this.output = sum;
    await Console.print(`결과 : ${sum}`);
  }
}

export default App;
