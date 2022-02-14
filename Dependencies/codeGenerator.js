module.exports = codeGen = (type, length) => {
  let res = "";
  let char =
    "AZERTYUIOPMLKJHGFDSQWXCVBNazertyuiopmlkjhgfdsqwxcvbn123456789&é/*-!:,";
  let numbers = "0123456789";
  let allChar = char.length;
  let allNumbers = numbers.length;
  if (type === "Char") {
    for (let i = 0; i < length; i++) {
      res += char.charAt(Math.floor(Math.random() * allChar));
    }
    return res;
  }
  if (type === "Num") {
    for (let i = 0; i < length; i++) {
      res += numbers.charAt(Math.floor(Math.random() * allNumbers));
    }
    return res;
  }
};
