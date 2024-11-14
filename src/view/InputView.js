import { Console } from '@woowacourse/mission-utils';

const InputView = {
  readString() {
    try {
      const input = Console.readLineAsync('덧셈할 문자열을 입력해 주세요.\n');
      return input;
    } catch (error) {
      Console.print(error.message);
    }
  }
}

export default InputView;
