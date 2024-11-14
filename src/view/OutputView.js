import { Console } from '@woowacourse/mission-utils';

const OutputView = {
  printOutput(output) {
    Console.print(`결과 : ${output}`);
  },

  printErrorMessage(errorMessage) {
    throw new Error(`[ERROR] ${errorMessage}`);
  }
}

export default OutputView;
