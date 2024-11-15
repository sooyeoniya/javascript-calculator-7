import { Console } from '@woowacourse/mission-utils';
import { OUTPUT_PREFIX, ERROR_PREFIX } from '../constants/constants.js';

const OutputView = {
  printOutput(result) {
    Console.print(`${OUTPUT_PREFIX} ${result}`);
  },

  printErrorMessage(errorMessage) {
    throw new Error(`${ERROR_PREFIX} ${errorMessage}`);
  }
}

export default OutputView;
