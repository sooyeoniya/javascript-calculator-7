import Calculator from '../domain/Calculator.js';
import InputView from '../view/InputView.js';
import OutputView from '../view/OutputView.js';
import parser from '../utils/parser.js';

class Controller {
  /**
   * 문자열 계산기 메인 로직을 실행한다.
   * 1. 사용자 입력을 비동기로 읽어온다.
   * 2. 입력값의 공백을 제거한다.
   * 3. Calculator 객체를 생성하고 계산 결과를 구한다.
   * 4. 결과를 출력한다.
   * 
   * @async
   * @returns {Promise<void>} 비동기 작업이 완료되면 resolve 된다.
   */
  async start() {
    const input = await InputView.readStringAsync();
    const parsedInput = parser.removeTheSpace(input);

    const calculator = new Calculator();
    const result = calculator.calculate(parsedInput);
    OutputView.printOutput(result);
  }
}

export default Controller;
