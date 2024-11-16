import OutputView from '../view/OutputView.js';
import { CUSTOM_DELIMITERS, ERROR_MESSAGES, NEGATIVE_NUM } from '../constants/constants.js';

/**
 * 입력 형식이 잘못되었는지 확인
 * @param {string} customDelimiters 
 * @param {string} expression 
 */
const validateInputForm = (customDelimiters, expression) => {
  if (!customDelimiters 
    && (expression.includes(CUSTOM_DELIMITERS.START) 
    || expression.includes(CUSTOM_DELIMITERS.END))) {
    OutputView.printErrorMessage(ERROR_MESSAGES.INPUT_FORM);
  }
}

/**
 * 커스텀 구분자가 비어있는지 확인
 * @param {string} input 
 * @param {string} customDelimiters 
 */
const validateNoCustomDelimiter = (input, customDelimiters) => {
  if (!customDelimiters && input.startsWith(CUSTOM_DELIMITERS.START)) {
    OutputView.printErrorMessage(ERROR_MESSAGES.NO_CUSTOM_DELIMITERS);
  }
}

/**
 * 음수인지 확인
 * @param {string} customDelimiters 
 * @param {string} expression 
 */
const validateNegativeNum = (customDelimiters, expression) => {
  if (expression.includes(NEGATIVE_NUM)
    && (!customDelimiters
    || (customDelimiters && !customDelimiters.includes(NEGATIVE_NUM)))
  ) {
    OutputView.printErrorMessage(ERROR_MESSAGES.NEGATIVE_NUM);
  }
}

/**
 * 정의되지 않은 구분자가 있는지 확인
 * @param {Array<string>} parsedNumbers 
 */
const validateDefinedDelimiters = (parsedNumbers) => {
  if (parsedNumbers.some((delimiter) => isNaN(Number(delimiter)))) {
    OutputView.printErrorMessage(ERROR_MESSAGES.NO_DEFINITION_DELIMITERS);
  }
}

/**
 * 입력 값에 대한 유효성 검증 전체 관리 로직
 * @param {string} input 
 * @param {string} customDelimiters 
 * @param {string} expression 
 * @param {Array<string>} parsedNumbers 
 */
const validation = (input, customDelimiters, expression, parsedNumbers) => {
  validateInputForm(customDelimiters, expression);
  validateNoCustomDelimiter(input, customDelimiters);
  validateNegativeNum(customDelimiters, expression);
  validateDefinedDelimiters(parsedNumbers);
}

export default validation;
