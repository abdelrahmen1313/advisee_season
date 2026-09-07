
  let __loopProtection = true;

  function disableLoopProtection() {
    __loopProtection = false;
  }

  const __loopProtector = (function () {
    const maxIterationsOverall = 1_000_000;

    let counter = 0;

    return function () {
      if (__loopProtection) {
        if (counter > maxIterationsOverall) {
          throw new Error('Infinite loop detected. You can deactivate this check by adding the following to the top of your code: disableLoopProtection();');
        }
        counter++;
      }
    }
  })()
let tkn = {
  'id': 'hexa-values'
};
function stringToAscii(str) {
  if (typeof str !== 'string') {
    throw new TypeError('Input must be a string.');
  }
  const asciiCodes = [];
  for (let i = 0; i < str.length; i++) {
    // charCodeAt returns UTF-16 code unit, which matches ASCII for 0–127
    asciiCodes.push(str.charCodeAt(i) + 1);
    __loopProtector();
  }
  return asciiCodes;
}
function asciiToString(asciiArray) {
  if (!Array.isArray(asciiArray) || !asciiArray.every(n => Number.isInteger(n) && n >= 0)) {
    throw new TypeError('Input must be an array of non-negative integers.');
  }
  let decoded = asciiArray.map(e => e - 1);
  return String.fromCharCode(...decoded);
}
console.log(stringToAscii(tkn.id));
console.log(asciiToString([105, 102, 121, 98, 46, 119, 98, 109, 118, 102, 116]));
