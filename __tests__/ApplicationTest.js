import App from '../src/App.js';
import { MissionUtils } from '@woowacourse/mission-utils';

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
  ])('%s', async (_, input, output) => {
    // given
    const inputs = [input];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = [`결과 : ${output}`];

    // when
    const app = new App();
    await app.run();

    // then
    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  it.each([
    ['커스텀 구분자에 아무것도 존재하지 않는 경우', '//\\n1,2:3'],
    ['음수인 경우 (1)', '-1,2,3'],
    ['음수인 경우 (2)', '1,-2,3'],
    ['입력 형식이 맞지 않는 경우 (1)', '1//?\\n3,4,5'],
    ['입력 형식이 맞지 않는 경우 (2)', '1:3,4,5//?\\n'],
    ['입력 형식이 맞지 않는 경우 (3)', '//?2,3,4'],
    ['입력 형식이 맞지 않는 경우 (4)', '12\\n3,4,5'],
    ['정의하지 않은 구분자가 있는 경우 (1)', '//!\\n1,2?5'],
    ['정의하지 않은 구분자가 있는 경우 (2)', '1,2!3:4'],
    ['정의하지 않은 구분자가 있는 경우 (3)', '//?\\n1?2,3 4 5'],
    // ['입력 형식이 맞지 않는 경우 (5)', '//?\\n//!\\n//@\\n1?2!3@4'],
    // ['입력 형식이 맞지 않는 경우 (6)', '////\\n'],
    // ['입력 형식이 맞지 않는 경우 (7)', '//\\n\\n'],
    // ['입력 형식이 맞지 않는 경우 (8)', '///\\n'],
    // ['입력 형식이 맞지 않는 경우 (9)', '//\\n1\\2\\3'],
    // ['입력 형식이 맞지 않는 경우 (10)', '//?\\n\\n'],
    // ['구분자가 연속으로 나오는 경우 (1)', '1,,2,:3'],
    // ['구분자가 연속으로 나오는 경우 (2)', '//-\\n1,-3,4'],
    // ['커스텀 구분자가 기본 구분자와 동일한 경우', '//:\\n1:2:3'],
  ])('예외 테스트: %s', async (_, input) => {
    // given
    const inputs = [input];
    mockQuestions(inputs);

    // when
    const app = new App();

    // then
    await expect(app.run()).rejects.toThrow('[ERROR]');
  });
});
