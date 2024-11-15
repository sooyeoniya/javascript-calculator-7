import OutputView from '../view/OutputView.js';
import { CUSTOM_DELIMITERS, ERROR_MESSAGES, NEGATIVE_NUM } from '../constants/constants.js';

const INPUT_REGEX = /^(\/\/(?<customDelimiters>.*)\\n)?(?<expression>.*)$/;

class Calculator {
  #input = '';
  #delimiter = ',:';
  #customDelimiters;
  #expression;

  constructor(input) {
    this.#input = input;
  }

  calculate() {
    const { customDelimiters, expression } = this.#input.match(INPUT_REGEX).groups;
    this.#customDelimiters = customDelimiters;
    if (this.#customDelimiters) this.#delimiter += customDelimiters;
    this.#expression = expression;
    // console.log(this.#customDelimiters, this.#delimiter, this.#expression);

    const regex = new RegExp(`[${this.#delimiter}]`)
    const parsedNumbers = this.#expression.split(regex).map(number => number.trim());
    // console.log(parsedNumbers);

    this.#validation(parsedNumbers);
    return this.#sumNumbers(parsedNumbers);
  }

  #validation(parsedNumbers) {
    if (!this.#customDelimiters 
      && (this.#expression.includes(CUSTOM_DELIMITERS.START) 
      || this.#expression.includes(CUSTOM_DELIMITERS.END))) {
      OutputView.printErrorMessage(ERROR_MESSAGES.INPUT_FORM);
    }

    if (!this.#customDelimiters && this.#input.startsWith(CUSTOM_DELIMITERS.START)) {
      OutputView.printErrorMessage(ERROR_MESSAGES.NO_CUSTOM_DELIMITERS);
    }

    if (this.#expression.includes(NEGATIVE_NUM)
      && (!this.#customDelimiters
      || (this.#customDelimiters && !this.#customDelimiters.includes(NEGATIVE_NUM)))
    ) {
      OutputView.printErrorMessage(ERROR_MESSAGES.NEGATIVE_NUM);
    }

    if (parsedNumbers.some((delimiter) => isNaN(Number(delimiter)))) {
      OutputView.printErrorMessage(ERROR_MESSAGES.NO_DEFINITION_DELIMITERS);
    }
  }

  #sumNumbers(parsedNumbers) {
    return parsedNumbers.reduce((acc, cur) => acc + Number(cur), 0);
  }
}

export default Calculator;
