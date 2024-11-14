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
    ['음수인 경우', '-1,2,3'],
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
