(function () {
  "use strict";

  const qs = (selector, scope) => (scope || document).querySelector(selector);
  const qsa = (selector, scope) => Array.from((scope || document).querySelectorAll(selector));

  const setText = (selector, text, scope) => {
    const node = qs(selector, scope);
    if (node) node.textContent = text || "";
  };

  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(value).trim());

  window.CourseSite = {
    qs,
    qsa,
    setText,
    isValidEmail
  };
})();
