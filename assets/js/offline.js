(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {
    const retryButton = document.querySelector("[data-retry-page]");
    if (!retryButton) return;

    retryButton.addEventListener("click", () => {
      window.location.reload();
    });
  });
})();
