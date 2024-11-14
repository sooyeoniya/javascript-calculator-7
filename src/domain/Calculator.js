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
    this.#extractInputString();
    this.#extractDelimiters();
    this.#addNumbers();
  }

  #extractInputString() {
    const splitInput = this.#input.split('\\n');
    this.#parsedInput = splitInput[splitInput.length - 1];
  }

  #extractDelimiters() {
    const customDelimiter = this.#input.split('\\n')[0];
    
  }

  #addNumbers() {
    
  }
}

export default Calculator;
