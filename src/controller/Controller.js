import Calculator from '../domain/Calculator.js';
import InputView from '../view/InputView.js';
import OutputView from '../view/OutputView.js';

class Controller {
  async start() {
    const input = await InputView.readString();
    const calculator = new Calculator(input);
    OutputView.print(calculator.getAdditionResult());
  }
}

export default Controller;
