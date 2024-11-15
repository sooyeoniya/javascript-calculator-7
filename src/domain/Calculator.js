import OutputView from '../view/OutputView.js';

const INPUT_REGEX = /^(\/\/(?<customDelimiters>.*)\\n)?(?<expression>.*)$/;

class Calculator {
  #delimiter = ',:';
  #customDelimiters;
  #expression;

  constructor(input) {
    this.#extractCustomDelimitersAndExpression(input);
    this.#validation(input);
  }

  #extractCustomDelimitersAndExpression(input) {
    const { customDelimiters, expression } = input.match(INPUT_REGEX).groups;
    this.#customDelimiters = customDelimiters;
    this.#expression = expression;
    console.log(this.#customDelimiters, this.#expression);
  }

  #validation(input) {
    if (!this.#customDelimiters && (this.#expression.includes('//') || this.#expression.includes('\\n'))) {
      OutputView.printErrorMessage('입력 형식이 올바르지 않습니다. 다시 입력해주세요.');
    }
    if (!this.#customDelimiters && input.startsWith('//')) {
      OutputView.printErrorMessage('커스텀 구분자가 존재하지 않습니다. 다시 입력해주세요.');
    }
  }

  // calculate() {
  //   if (this.#input.startsWith('//')) {
  //     this.#extractInputString();
  //     this.#extractDelimiters();
  //   }
  //   return this.#addNumbers();
  // }

  // #extractInputString() {
  //   const splitInput = this.#input.split('\\n');
  //   this.#parsedInput = splitInput[splitInput.length - 1];
  //   console.log('this.#parsedInput: ' + this.#parsedInput);
  // }

  // #extractDelimiters() {
  //   const customDelimiters = this.#input.split('//')[1].split('\\n')[0];
  //   console.log('customDelimiters: ' + customDelimiters);
  //   this.#delimiter += customDelimiters;
  //   console.log('this.#delimiter: ' + this.#delimiter);
  // }

  // #addNumbers() {
  //   const regex = new RegExp(`[${this.#delimiter}]`)
  //   const parsedNumbers = this.#parsedInput.split(regex).map(number => number.trim());
  //   console.log('parsedNumbers');
  //   console.log(parsedNumbers);
  //   const result = parsedNumbers.reduce((acc, cur) => acc + Number(cur), 0);
  //   console.log('result: ' + result);
  //   return result;
  // }
}

export default Calculator;
