const YOUTUBE_ORIGIN = 'https://www.youtube.com';

chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
  if (!tab.url) return;
  const url = new URL(tab.url);

  if (url.origin === YOUTUBE_ORIGIN) {
    await chrome.sidePanel.setOptions({
      tabId,
      path: 'sidepanel_html/youtube.html',
      enabled: true
    });
  } else {
    // Disables the side panel on all other sites
    await chrome.sidePanel.setOptions({
      tabId,
      path: 'sidepanel_html/article.html',
      enabled: true
    });
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

