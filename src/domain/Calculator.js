import validator from '../utils/validator.js';

class Calculator {
  #input = '';
  #output = 0;
  #delimiter = [',', ':'];

  constructor(input) {
    validator(input);
    this.#input = input;
  }

  getResult() {
    return this.#output;
  }

  calculate() {
    this.#extractDelimiters();
    this.#addNumbers();
  }

  #extractDelimiters() {

  }

  #addNumbers() {
    
  }
}

export default Calculator;
