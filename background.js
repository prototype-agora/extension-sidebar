const YOUTUBE_ORIGIN = 'https://www.youtube.com';

chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
  if (!tab.url) return;
  const url = new URL(tab.url);

  if (url.origin === YOUTUBE_ORIGIN) {
    if (tab.status === 'complete') {
      await chrome.sidePanel.setOptions({
        tabId,
        path: 'sidepanel_html/youtube.html',
        enabled: true
      });
      // chrome.tabs.executeScript(tabId, {file: './bla' });
    } else {
      // Disables the side panel on all other sites
      await chrome.sidePanel.setOptions({
        tabId,
        path: 'sidepanel_html/article.html',
        enabled: true
      });
    }
  }
});

// Example of a simple user data object
const user = {
  username: 'demo-user'
};

let youtube_api_options = {
  part: 'snippet',
  maxResults: '100',
  order: 'relevance',
  textFormat: 'plainText',
  key: 'AIzaSyDTmC8tmyqumVT4sW-azwT4jxEnlXc8_M0'
}

async function get_comments(videoId) {
  let fetch_string = "https://youtube.googleapis.com/youtube/v3/commentThreads?"
  fetch_string += `part=${youtube_api_options.part}&`;
  fetch_string += `maxResults=${youtube_api_options.maxResults}&`;
  fetch_string += `order=${youtube_api_options.order}&`;
  fetch_string += `textFormat=${youtube_api_options.textFormat}&`;
  fetch_string += `videoId=${videoId}&`;
  fetch_string += `key=${youtube_api_options.key}&`;

  const response = await fetch(fetch_string);
  const json = await response.json();

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
  return response;
}

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.event === "user") {
    sendResponse(user);
  }
  if (request.event === "get_comments") {
    const comments = await get_comments(request.videoId);
    sendResponse(comments);
  }
});