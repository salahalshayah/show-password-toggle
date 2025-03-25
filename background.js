// Listen for extension icon click
chrome.action.onClicked.addListener(async (tab) => {
  // Get current toggle state
  chrome.storage.sync.get("enabled", async (data) => {
    const enabled = !data.enabled; // Toggle the state
    chrome.storage.sync.set({ enabled });

    // Inject script to show/hide passwords
    if (enabled) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["toggle.js"]
      });
    } else {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
          document.querySelectorAll('input[type="text"]').forEach(input => {
            if (input.getAttribute("data-from-extension") === "true") {
              input.setAttribute("type", "password");
              input.removeAttribute("data-from-extension");
            }
          });
        }
      });
    }

    // Update extension icon
    chrome.action.setIcon({
      tabId: tab.id,
      path: enabled ? "icons/icon128-on.png" : "icons/icon128-off.png"
    });
  });
});
