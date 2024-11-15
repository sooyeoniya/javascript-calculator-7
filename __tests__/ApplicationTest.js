import App from '../src/App.js';
import { MissionUtils } from '@woowacourse/mission-utils';
import { OUTPUT_PREFIX, ERROR_PREFIX, ERROR_MESSAGES } from '../src/constants/constants.js';

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();
    return Promise.resolve(input);
  });
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, 'print');
  logSpy.mockClear();
  return logSpy;
};

describe('문자열 계산기', () => {
  it.each([
    ['커스텀 구분자 사용', '//;\\n1', '1'],
    ['빈 문자열인 경우', '', '0'],
    ['앞뒤로 구분자가 존재하는 경우', ',1,2,3,', '6'],
    ['커스텀 구분자가 숫자인 경우', '//1\\n21315', '10'],
    ['커스텀 구분자가 여러 개 정의된 경우', '//?!@\\n1?2!3@4', '10'],
    ['공백이 포함된 경우', ' //?\\n 1 ? 2 , 3 ', '6'],
    ['커스텀 구분자가 공백인 경우', '// \\n1 2 3 4', '10'],
    ['구분자가 연속으로 나오는 경우 (1)', '1,,2,:3', '6'],
    ['구분자가 연속으로 나오는 경우 (2)', '//-\\n1,-3,4', '8'],
    ['커스텀 구분자가 기본 구분자와 동일한 경우', '//:\\n1:2:3', '6'],
    ['커스텀 구분자가 중복된 값이 있는 경우', '//??\\n1??2?3?4?5', '15'],

    // 헷갈리는 특수문자 테스트 케이스
    ['마지막 줄바꿈 문자로 인식 (1) - 커스텀 구분자 정의가 여러 개 존재하는 경우', '//?\\n//!\\n//@\\n1?2!3@4n5\\6/7,8:9', '45'],
    ['마지막 줄바꿈 문자로 인식 (2) - 커스텀 구분자를 줄바꿈 문자로 사용하는 경우', '//\\n\\n1\\2n3\\n4', '4'],
    [`커스텀 구분자가 '/'인 경우`, '///\\n1/2/3', '6'],
    [`커스텀 구분자가 '//'인 경우 중복 제거되어 '/'로 처리`, '////\\n1//2//3', '6'],
    [`커스텀 구분자가 '\\'인 경우`, '//\\\\n1\\2\\3', '6'],
    [`커스텀 구분자가 '\\n'인 경우 '\\'와 'n'으로 처리`, '//\\n\\n1\\2n3', '6'],
    [`커스텀 구분자가 '\\\\n'인 경우 중복 제거되어 '\\'와 'n'으로 처리`, '//\\\\n\\n1\\2n3', '6'],
    [`커스텀 구분자가 '?\\n'인 경우 '?', '\\', 'n'으로 처리`, '//?\\n\\n1?2\\3n4', '10'],
  ])('%s', async (_, input, output) => {
    // given
    const inputs = [input];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = [`${OUTPUT_PREFIX} ${output}`];

    // when
    const app = new App();
    await app.run();

    // then
    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  it.each([
    ['커스텀 구분자에 아무것도 존재하지 않는 경우', '//\\n1,2:3', ERROR_MESSAGES.NO_CUSTOM_DELIMITERS],
    ['음수인 경우 (1)', '-1,2,3', ERROR_MESSAGES.NEGATIVE_NUM],
    ['음수인 경우 (2)', '1,-2,3', ERROR_MESSAGES.NEGATIVE_NUM],
    ['입력 형식이 맞지 않는 경우 (1)', '1//?\\n3,4,5', ERROR_MESSAGES.INPUT_FORM],
    ['입력 형식이 맞지 않는 경우 (2)', '1:3,4,5//?\\n', ERROR_MESSAGES.INPUT_FORM],
    ['입력 형식이 맞지 않는 경우 (3)', '//?2,3,4', ERROR_MESSAGES.INPUT_FORM],
    ['입력 형식이 맞지 않는 경우 (4)', '12\\n3,4,5', ERROR_MESSAGES.INPUT_FORM],
    ['정의하지 않은 구분자가 있는 경우 (1)', '//!\\n1,2?5', ERROR_MESSAGES.NO_DEFINITION_DELIMITERS],
    ['정의하지 않은 구분자가 있는 경우 (2)', '1,2!3:4', ERROR_MESSAGES.NO_DEFINITION_DELIMITERS],
    ['정의하지 않은 구분자가 있는 경우 (3)', '//?\\n1?2,3 4 5', ERROR_MESSAGES.NO_DEFINITION_DELIMITERS],
  ])('예외 테스트: %s', async (_, input, errorMessage) => {
    // given
    const inputs = [input];
    mockQuestions(inputs);

    // when
    const app = new App();

    // then
    await expect(app.run()).rejects.toThrow(`${ERROR_PREFIX} ${errorMessage}`);
  });
});
