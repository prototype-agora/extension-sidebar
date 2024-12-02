chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.event === "window") {
    if (request.data.includes("youtube")) {
      chrome.sidePanel.setOptions({ path: "sidepanel_html/youtube.html" });
    } else chrome.sidePanel.setOptions({ path: "sidepanel_html/article.html" });
    chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
  }
});

// Example of a simple user data object
const user = {
  username: 'demo-user'
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.event === "user") {
    sendResponse(user);
  }
});

