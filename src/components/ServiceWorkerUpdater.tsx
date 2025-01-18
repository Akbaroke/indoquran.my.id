import { useEffect, useState } from "react";

export default function ServiceWorkerUpdater() {
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        window.location.reload();
      });

      navigator.serviceWorker.register("/sw.js").then((registration) => {
        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener("statechange", () => {
              if (
                newWorker.state === "installed" &&
                navigator.serviceWorker.controller
              ) {
                setUpdateAvailable(true);
              }
            });
          }
        });
      });
    }
  }, []);

  const handleUpdate = () => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistration().then((registration) => {
        if (registration?.waiting) {
          registration.waiting.postMessage({ type: "SKIP_WAITING" });
        }
      });
    }
  };

  return updateAvailable ? (
    <div
      style={{
        position: "fixed",
        bottom: "1rem",
        right: "1rem",
        background: "yellow",
        padding: "1rem",
        zIndex: 1000,
      }}
    >
      <p>Update available!</p>
      <button onClick={handleUpdate}>Update Now</button>
    </div>
  ) : null;
}
