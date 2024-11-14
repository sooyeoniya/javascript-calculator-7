import validator from '../utils/validator.js';

class Calculator {
  #input = '';
  #output = 0;
  #delimiter = [',', ':'];

  constructor(input) {
    validator(input);
    this.#input = input;
  }

  getAdditionResult() {
    return this.#output;
  }

  #calculateNumbers() {

  }

  #extractDelimiters() {

  }

  #addNumbers() {
    // 
  }
}

export default Calculator;
