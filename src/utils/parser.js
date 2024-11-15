const removeTheSpace = (string) => {
  return string.trim();
}

const sumNumbers = (numbers) => {
  return numbers.reduce((acc, cur) => acc + Number(cur), 0);
}

const escapeRegExp = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const parser = {
  removeTheSpace,
  sumNumbers,
  escapeRegExp,
}

export default parser;
