import OutputView from '../view/OutputView.js';
import { CUSTOM_DELIMITERS, ERROR_MESSAGES } from '../constants/constants.js';

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
    if (!this.#customDelimiters 
      && (this.#expression.includes(CUSTOM_DELIMITERS.START) 
      || this.#expression.includes(CUSTOM_DELIMITERS.END))) {
      OutputView.printErrorMessage(ERROR_MESSAGES.INPUT_FORM);
    }
    if (!this.#customDelimiters && input.startsWith(CUSTOM_DELIMITERS.START)) {
      OutputView.printErrorMessage(ERROR_MESSAGES.NO_CUSTOM_DELIMITERS);
    }
  }

  // calculate() {
  //   if (this.#input.startsWith(CUSTOM_DELIMITERS.START)) {
  //     this.#extractInputString();
  //     this.#extractDelimiters();
  //   }
  //   return this.#addNumbers();
  // }

  // #extractInputString() {
  //   const splitInput = this.#input.split(CUSTOM_DELIMITERS.END);
  //   this.#parsedInput = splitInput[splitInput.length - 1];
  //   console.log('this.#parsedInput: ' + this.#parsedInput);
  // }

  // #extractDelimiters() {
  //   const customDelimiters = this.#input.split(CUSTOM_DELIMITERS.START)[1].split(CUSTOM_DELIMITERS.END)[0];
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
