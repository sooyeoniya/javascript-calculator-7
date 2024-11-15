import validation from '../src/utils/validation.js';
import { ERROR_PREFIX, ERROR_MESSAGES } from '../src/constants/constants.js';

describe('validation 함수 테스트', () => {
  it.each([
    // given
    ['//\\n1,2:3', '', '1,2:3', [ '1', '2', '3' ], ERROR_MESSAGES.NO_CUSTOM_DELIMITERS],
    ['-1,2,3', '', '-1,2,3', [ '-1', '2', '3' ], ERROR_MESSAGES.NEGATIVE_NUM],
    ['1,-2,3', '', '1,-2,3', [ '1', '-2', '3' ], ERROR_MESSAGES.NEGATIVE_NUM],
    ['1//?\\n3,4,5', '', '1//?\\n3,4,5', [ '1//?\\n3', '4', '5' ], ERROR_MESSAGES.INPUT_FORM],
    ['1:3,4,5//?\\n', '', '1:3,4,5//?\\n', [ '1', '3', '4', '5//?\\n' ], ERROR_MESSAGES.INPUT_FORM],
    ['//?2,3,4', '', '//?2,3,4', [ '//?2', '3', '4' ], ERROR_MESSAGES.INPUT_FORM],
    ['12\\n3,4,5', '', '12\\n3,4,5', [ '12\\\\n3', '4', '5' ], ERROR_MESSAGES.INPUT_FORM],
    ['//!\\n1,2?5', '!', '1,2?5', [ '1', '2?5' ], ERROR_MESSAGES.NO_DEFINITION_DELIMITERS],
    ['1,2!3:4', '', '1,2!3:4', [ '1', '2!3', '4' ], ERROR_MESSAGES.NO_DEFINITION_DELIMITERS],
    ['//?\\n1?2,3 4 5', '?', '1?2,3 4 5', [ '1', '2', '3 4 5' ], ERROR_MESSAGES.NO_DEFINITION_DELIMITERS],
  ])('사용자가 잘못된 값을 입력하면 에러 종류에 따라 에러 메시지를 출력 및 에러를 반환한다.', 
    (input, customDelimiters, expression, parsedNumbers, expectedError) => {
    // when & then
    expect(() => {
      validation(input, customDelimiters, expression, parsedNumbers)
    }).toThrow(`${ERROR_PREFIX} ${expectedError}`);
  });
});
