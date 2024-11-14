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
    // TODO: 여러 구분자 추출: 커스텀 구분자가 없을 때까지 반복
    // TODO: 더 효율적인 방식이 있는지 찾아보기
    const customDelimiter = this.#input.split('//')[1].split('\\n')[0];
    this.#delimiter.push(customDelimiter);
  }

  #addNumbers() {
    
  }
}

export default Calculator;
