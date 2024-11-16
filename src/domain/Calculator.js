import { INPUT_REGEX } from '../constants/constants.js';
import parser from '../utils/parser.js';
import validation from '../utils/validation.js';

class Calculator {
  /** @type {Set<string>} */ #delimiter = new Set([',', ':']);

  /**
   * 문자열 계산기 전체 관리 로직
   * @param {string} input
   * @returns {number}
   */
  calculate(input) {
    const { customDelimiters, expression } = input.match(INPUT_REGEX).groups;
    if (customDelimiters) {
      customDelimiters.split('').forEach((delimiter) => this.#addCustomDelimiters(delimiter));
    }
    const parsedNumbers = this.#extractNumbers(expression);
    validation(input, customDelimiters, expression, parsedNumbers);
    return parser.sumNumbers(parsedNumbers);
  }

  /**
   * 커스텀 구분자 이스케이프 처리 및 중복 확인 후 구분자 Set에 추가
   * @param {string} delimiter
   */
  #addCustomDelimiters(delimiter) {
    if (!this.#delimiter.has(delimiter)) {
      const escapedDelimiter = parser.escapeRegExp(delimiter);
      this.#delimiter.add(escapedDelimiter)
    }
  }

  /**
   * 표현식에서 구분자를 기준으로 숫자 추출하는 로직
   * @param {string} expression
   * @returns {Array<number>}
   */
  #extractNumbers(expression) {
    const regex = new RegExp(`[${Array.from(this.#delimiter).join('')}]`)
    return expression.split(regex).map(number => parser.removeTheSpace(number));
  }
}

export default Calculator;
