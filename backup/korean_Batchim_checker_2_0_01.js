(function (global) {
  /**
   * 한글 단어의 마지막 글자에 받침(종성)이 있는지 확인합니다.
   * @param {string} word - 확인할 단어
   * @returns {boolean} - 받침이 있으면 true, 없으면 false
   */
  function hasBatchim(word) {
    if (!word || word.length === 0) return false;
    const lastChar = word[word.length - 1];
    const code = lastChar.charCodeAt(0);
    if (code < 0xAC00 || code > 0xD7A3) return false;
    const jong = (code - 0xAC00) % 28;
    return jong !== 0;
  }

  // ✅ 브라우저 전역(window)에 등록
  if (typeof window !== "undefined") {
    window.hasBatchim = hasBatchim;
  }

  // ✅ Node.js / API 환경에서도 import 또는 require 가능하도록 내보내기
  if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
    module.exports = hasBatchim;
  } else if (typeof define === "function" && define.amd) {
    define([], function () {
      return hasBatchim;
    });
  } else {
    global.hasBatchim = hasBatchim;
  }
})(this);
// ver 2.0.01