class Calculator {
  #input = '';
  #output = 0;
  #delimiter = [',', ':'];
  #parsedInput = '';

  constructor(input) {
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
