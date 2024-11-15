import Calculator from '../domain/Calculator.js';
import InputView from '../view/InputView.js';
import OutputView from '../view/OutputView.js';
import parser from '../utils/parser.js';

class Controller {
  async start() {
    const input = await InputView.readStringAsync();
    const parsedInput = parser.removeTheSpace(input);

    const calculator = new Calculator(parsedInput);
    const result = calculator.calculate();
    OutputView.printOutput(result);
  }
}

export default Controller;
