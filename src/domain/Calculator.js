import { INPUT_REGEX } from '../constants/constants.js';
import parser from '../utils/parser.js';
import validation from '../utils/validation.js';

class Calculator {
  #delimiter = new Set([',', ':']);

  calculate(input) {
    const { customDelimiters, expression } = input.match(INPUT_REGEX).groups;
    if (customDelimiters) {
      customDelimiters.split('').forEach((delimiter) => this.#addCustomDelimiters(delimiter));
    }
    const parsedNumbers = this.#extractNumbers(expression);
    validation(input, customDelimiters, expression, parsedNumbers);
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
}

export default Calculator;
