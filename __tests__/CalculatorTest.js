import Calculator from '../src/domain/Calculator.js';
import parser from '../src/utils/parser.js';

describe('Calculator 클래스 테스트', () => {
  it.each([
    // given
    ['//;\\n1', 1],
    ['', 0],
    [',1,2,3,', 6],
    ['//1\\n21315', 10],
    ['//?!@\\n1?2!3@4', 10],
    [' //?\\n 1 ? 2 , 3 ', 6],
    ['// \\n1 2 3 4', 10],
    ['1,,2,:3', 6],
    ['//-\\n1,-3,4', 8],
    ['//:\\n1:2:3', 6],
    ['//??\\n1??2?3?4?5', 15],
    ['//?\\n//!\\n//@\\n1?2!3@4n5\\6/7,8:9', 45],
    ['//\\n\\n1\\2n3\\n4', 4],
    ['///\\n1/2/3', 6],
    ['////\\n1//2//3', 6],
    ['//\\\\n1\\2\\3', 6],
    ['//\\n\\n1\\2n3', 6],
    ['//\\\\n\\n1\\2n3', 6],
    ['//?\\n\\n1?2\\3n4', 10],
  ])('덧셈할 문자열을 입력하면 calculate() 함수를 통해 덧셈 결과를 반환한다.', (input, expectedResult) => {
    // when
    const parsedInput = parser.removeTheSpace(input);
    const calculator = new Calculator();
    const result = calculator.calculate(parsedInput);

    // then
    expect(result).toEqual(expectedResult);
  });
});
