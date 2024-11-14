import Calculator from '../domain/Calculator.js';
import Validator from '../domain/Validator.js';
import InputView from '../view/InputView.js';
import OutputView from '../view/OutputView.js';

class Controller {
  async start() {
    this.#validateInputAsync();

    const calculator = new Calculator(input);
    calculator.calculate();

    const output = calculator.getResult();
    OutputView.printOutput(output);
  }

  async #validateInputAsync() {
    try {
      const input = await InputView.readStringAsync();
      new Validator(input).validate();
      return input;
    } catch (error) {
      OutputView.printErrorMessage(error.message);
      this.#validateInputAsync();
    }
  }
}

export default Controller;
