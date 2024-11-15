import OutputView from '../view/OutputView.js';
import { CUSTOM_DELIMITERS, ERROR_MESSAGES, NEGATIVE_NUM, INPUT_REGEX } from '../constants/constants.js';
import parser from '../utils/parser.js';

class Calculator {
  #input = '';
  #delimiter = new Set([',', ':']);
  #customDelimiters;
  #expression;

  constructor(input) {
    this.#input = input;
  }

  calculate() {
    const { customDelimiters, expression } = this.#input.match(INPUT_REGEX).groups;
    this.#customDelimiters = customDelimiters;
    this.#expression = expression;
    if (this.#customDelimiters) {
      this.#customDelimiters.split('').forEach((delimiter) => this.#addCustomDelimiters(delimiter));
    }
    const parsedNumbers = this.#extractNumbers();
    this.#validation(parsedNumbers);
    return parser.sumNumbers(parsedNumbers);
  }

  #addCustomDelimiters(delimiter) {
    if (!this.#delimiter.has(delimiter)) {
      const escapedDelimiter = parser.escapeRegExp(delimiter);
      this.#delimiter.add(escapedDelimiter)
    }
  }

  #extractNumbers() {
    const regex = new RegExp(`[${Array.from(this.#delimiter).join('')}]`)
    return this.#expression.split(regex).map(number => parser.removeTheSpace(number));
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
}

export default Calculator;
