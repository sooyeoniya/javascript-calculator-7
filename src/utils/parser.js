/**
 * 문자열 앞뒤 공백 제거
 * @param {string} string 
 * @returns {string}
 */
const removeTheSpace = (string) => {
  return string.trim();
}

/**
 * 덧셈 계산
 * @param {Array<number>} numbers 
 * @returns {number}
 */
const sumNumbers = (numbers) => {
  return numbers.reduce((acc, cur) => acc + Number(cur), 0);
}

/**
 * 특수문자 이스케이프 처리
 * @param {string} string 
 * @returns {string}
 */
const escapeRegExp = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const parser = {
  removeTheSpace,
  sumNumbers,
  escapeRegExp,
}

export default parser;
