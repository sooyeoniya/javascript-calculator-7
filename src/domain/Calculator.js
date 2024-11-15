import OutputView from '../view/OutputView.js';

class Calculator {
  #input = '';
  #output = 0;
  #delimiter = ',:';
  #parsedInput = '';

  constructor(input) {
    this.#input = input;
    this.#parsedInput = input;
  }

  getResult() {
    return this.#output;
  }

  validate() {
    this.#validateStringFormat();
  }

  calculate() {
    if (this.#input.startsWith('//')) {
      this.#extractInputString();
      this.#extractDelimiters();
    }
    this.#addNumbers();
  }

  #extractInputString() {
    const splitInput = this.#input.split('\\n');
    this.#parsedInput = splitInput[splitInput.length - 1];
    console.log('this.#parsedInput: ' + this.#parsedInput);
  }

  #extractDelimiters() {
    const customDelimiters = this.#input.split('//')[1].split('\\n')[0];
    console.log('customDelimiters: ' + customDelimiters);
    this.#delimiter += customDelimiters;
    console.log('this.#delimiter: ' + this.#delimiter);
  }

  #addNumbers() {
    const regex = new RegExp(`[${this.#delimiter}]`)
    const parsedNumbers = this.#parsedInput.split(regex).map(number => number.trim());
    console.log('parsedNumbers');
    console.log(parsedNumbers);
    this.#output = parsedNumbers.reduce((acc, cur) => acc + Number(cur), 0);
    console.log('this.#output: ' + this.#output);
  }

  #validateStringFormat() {
    const regex = /^(\/\/(?<customDelimiters>)\\n)?(?<expression>.*)$/;
    if (!regex.test(this.#input)) {
      OutputView.printErrorMessage('올바르지 않은 형식으로 입력했습니다. 다시 입력해주세요.');
    }
  }
}

export default Calculator;
