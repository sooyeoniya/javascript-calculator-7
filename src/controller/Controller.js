import Calculator from '../domain/Calculator.js';
import Validator from '../domain/Validator.js';
import InputView from '../view/InputView.js';
import OutputView from '../view/OutputView.js';

class Controller {
  async start() {
    const input = await InputView.readStringAsync();
    const parsedInput = input.trim();

    new Validator(parsedInput).validate();
    const calculator = new Calculator(parsedInput);
    calculator.calculate();

    const output = calculator.getResult();
    OutputView.printOutput(output);
  }
}

export default Controller;
