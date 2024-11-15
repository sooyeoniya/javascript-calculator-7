import OutputView from '../view/OutputView.js';
import { CUSTOM_DELIMITERS, ERROR_MESSAGES, NEGATIVE_NUM, INPUT_REGEX } from '../constants/constants.js';
import parser from '../utils/parser.js';

class Calculator {
  #delimiter = new Set([',', ':']);

  calculate(input) {
    const { customDelimiters, expression } = input.match(INPUT_REGEX).groups;
    if (customDelimiters) {
      customDelimiters.split('').forEach((delimiter) => this.#addCustomDelimiters(delimiter));
    }
    const parsedNumbers = this.#extractNumbers(expression);
    this.#validation(input, customDelimiters, expression, parsedNumbers);
    return parser.sumNumbers(parsedNumbers);
  }

  #addCustomDelimiters(delimiter) {
    if (!this.#delimiter.has(delimiter)) {
      const escapedDelimiter = parser.escapeRegExp(delimiter);
      this.#delimiter.add(escapedDelimiter)
    }
  }

  #extractNumbers(expression) {
    const regex = new RegExp(`[${Array.from(this.#delimiter).join('')}]`)
    return expression.split(regex).map(number => parser.removeTheSpace(number));
  }

  #validation(input, customDelimiters, expression, parsedNumbers) {
    this.#validateInputForm(customDelimiters, expression);
    this.#validateNoCustomDelimiter(input, customDelimiters);
    this.#validateNegativeNum(customDelimiters, expression);
    this.#validateDefinedDelimiters(parsedNumbers);
  }

  #validateInputForm(customDelimiters, expression) {
    if (!customDelimiters 
      && (expression.includes(CUSTOM_DELIMITERS.START) 
      || expression.includes(CUSTOM_DELIMITERS.END))) {
      OutputView.printErrorMessage(ERROR_MESSAGES.INPUT_FORM);
    }
  }

  #validateNoCustomDelimiter(input, customDelimiters) {
    if (!customDelimiters && input.startsWith(CUSTOM_DELIMITERS.START)) {
      OutputView.printErrorMessage(ERROR_MESSAGES.NO_CUSTOM_DELIMITERS);
    }
  }

  #validateNegativeNum(customDelimiters, expression) {
    if (expression.includes(NEGATIVE_NUM)
      && (!customDelimiters
      || (customDelimiters && !customDelimiters.includes(NEGATIVE_NUM)))
    ) {
      OutputView.printErrorMessage(ERROR_MESSAGES.NEGATIVE_NUM);
    }
  }

  #validateDefinedDelimiters(parsedNumbers) {
    if (parsedNumbers.some((delimiter) => isNaN(Number(delimiter)))) {
      OutputView.printErrorMessage(ERROR_MESSAGES.NO_DEFINITION_DELIMITERS);
    }
  }
}

export default Calculator;
