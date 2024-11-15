import OutputView from '../view/OutputView.js';
import { CUSTOM_DELIMITERS, ERROR_MESSAGES, NEGATIVE_NUM } from '../constants/constants.js';

const validateInputForm = (customDelimiters, expression) => {
  if (!customDelimiters 
    && (expression.includes(CUSTOM_DELIMITERS.START) 
    || expression.includes(CUSTOM_DELIMITERS.END))) {
    OutputView.printErrorMessage(ERROR_MESSAGES.INPUT_FORM);
  }
}

const validateNoCustomDelimiter = (input, customDelimiters) => {
  if (!customDelimiters && input.startsWith(CUSTOM_DELIMITERS.START)) {
    OutputView.printErrorMessage(ERROR_MESSAGES.NO_CUSTOM_DELIMITERS);
  }
}

const validateNegativeNum = (customDelimiters, expression) => {
  if (expression.includes(NEGATIVE_NUM)
    && (!customDelimiters
    || (customDelimiters && !customDelimiters.includes(NEGATIVE_NUM)))
  ) {
    OutputView.printErrorMessage(ERROR_MESSAGES.NEGATIVE_NUM);
  }
}

const validateDefinedDelimiters = (parsedNumbers) => {
  if (parsedNumbers.some((delimiter) => isNaN(Number(delimiter)))) {
    OutputView.printErrorMessage(ERROR_MESSAGES.NO_DEFINITION_DELIMITERS);
  }
}

const validation = (input, customDelimiters, expression, parsedNumbers) => {
  validateInputForm(customDelimiters, expression);
  validateNoCustomDelimiter(input, customDelimiters);
  validateNegativeNum(customDelimiters, expression);
  validateDefinedDelimiters(parsedNumbers);
}

export default validation;
