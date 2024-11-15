import { Console } from '@woowacourse/mission-utils';

const OutputView = {
  printOutput(result) {
    Console.print(`결과 : ${result}`);
  },

  printErrorMessage(errorMessage) {
    throw new Error(`[ERROR] ${errorMessage}`);
  }
}

export default OutputView;
