const zeroWidthEncrypt = (hiddenStr = '') => {
  let encrypted = '';
  for (let i = 0; i < hiddenStr.length; i++) {
    const charCode = hiddenStr.charCodeAt(i);
    const binary = charCode.toString(2).padStart(16, '0');
    for (let j = 0; j < binary.length; j += 2) {
      const zeroWidthChar = binary.substr(j, 2).replace(/./g, (m) => (m == '0' ? '\u200b' : '\u200c'));
      encrypted += zeroWidthChar;
    }
  }
  return encrypted;
};

const zeroWidthDecrypt = (resultStr = '') => {
  let decrypted = '';
  let binaryStr = '';
  for (const char of resultStr) {
    if (char === '\u200b' || char === '\u200c') {
      binaryStr += char === '\u200b' ? '0' : '1';
      if (binaryStr.length === 16) {
        decrypted += String.fromCharCode(parseInt(binaryStr, 2));
        binaryStr = '';
      }
    } else {
      decrypted += char;
    }
  }
  return decrypted;
};

var s = zeroWidthEncrypt('ABC');
console.log(zeroWidthDecrypt(s)); // ABC