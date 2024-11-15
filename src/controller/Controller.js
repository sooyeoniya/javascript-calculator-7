import Calculator from '../domain/Calculator.js';
import InputView from '../view/InputView.js';
import OutputView from '../view/OutputView.js';

class Controller {
  async start() {
    const input = await InputView.readStringAsync();
    const parsedInput = input.trim();

    const calculator = new Calculator(parsedInput);
    calculator.validate();
    calculator.calculate();

    const output = calculator.getResult();
    OutputView.printOutput(output);
  }
}

export default Controller;
