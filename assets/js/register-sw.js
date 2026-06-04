(function () {
  "use strict";

  if (!("serviceWorker" in navigator)) return;

  const SW_VERSION = "20260604-18";

  window.addEventListener("load", () => {
    navigator.serviceWorker.register(`./sw.js?v=${SW_VERSION}`, {
      updateViaCache: "none",
    }).catch((error) => {
      console.warn("Service worker registration failed:", error);
    });
  });
})();

