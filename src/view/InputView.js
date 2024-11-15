import { Console } from '@woowacourse/mission-utils';
import { INPUT_PROMPT } from '../constants/constants.js';

const InputView = {
  readStringAsync() {
    try {
      const input = Console.readLineAsync(INPUT_PROMPT);
      return input;
    } catch (error) {
      Console.print(error.message);
    }
  }
}

export default InputView;
