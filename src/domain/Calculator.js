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
    // TODO: customDelimiter 각각 따로 저장
    // TODO: 더 효율적인 방식이 있는지 찾아보기
    // FIXME: 구분자가 있는 경우만 처리하도록 수정
    const customDelimiter = this.#input.split('//')[1].split('\\n')[0];
    this.#delimiter.push(customDelimiter);
    // console.log(this.#delimiter);
  }

  #addNumbers() {
    const regex = new RegExp(`[${this.#delimiter}]`)
    const parsedNumbers = this.#parsedInput.split(regex);
    // console.log(parsedNumbers);
    this.#output = parsedNumbers.reduce((acc, cur) => acc + Number(cur), 0);
    // console.log(this.#output);
  }
}

export default Calculator;
