import parser from '../src/utils/parser.js';

describe('parser 함수 테스트', () => {
  it.each([
    // given
    ['     1,2,3  ', '1,2,3'],
    [' //?\\n1?2,3 ', '//?\\n1?2,3'],
  ])('removeTheSpace() 함수 테스트', (input, expectedResult) => {
    // when
    const result = parser.removeTheSpace(input);
    // then
    expect(result).toEqual(expectedResult);
  });

  it.each([
    // given
    [['1', '2', '3'], 6],
    [['4', '', '5', '6', '', '8', '9'], 32],
  ])('sumNumbers() 함수 테스트', (input, expectedResult) => {
    // when
    const result = parser.sumNumbers(input);
    // then
    expect(result).toEqual(expectedResult);
  });

  it.each([
    // given
    ['/', '/'],
    ['.', '\\.'],
    ['*', '\\*'],
    ['+', '\\+'],
    ['?', '\\?'],
    ['^', '\\^'],
    ['$', '\\$'],
    ['{', '\\{'],
    ['}', '\\}'],
    ['(', '\\('],
    [')', '\\)'],
    ['|', '\\|'],
    ['[', '\\['],
    [']', '\\]'],
    ['\\', '\\\\'],
  ])('escapeRegExp() 함수 테스트', (input, expectedResult) => {
    // when
    const result = parser.escapeRegExp(input);
    // then
    expect(result).toEqual(expectedResult);
  });
});
