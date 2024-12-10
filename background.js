import './apis.google.js';

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

function getYoutubetime() {
    ytplayer = document.getElementById("movie_player");
    ytplayer.getCurrentTime();
}

function loadClient() {
    gapi.client.setApiKey("AIzaSyDTmC8tmyqumVT4sW-azwT4jxEnlXc8_M0");
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(function() { console.log("GAPI client loaded for API"); },
            function(err) { console.error("Error loading GAPI client for API", err); });
}
// Make sure the client is loaded before calling this method.
function execute() {
    return gapi.client.youtube.commentThreads.list({
        "part": [
        "snippet,replies"
        ],
        "videoId": "_VB39Jo8mAQ"
    }).then(function(response) {
        // Handle the results here (response.result has the parsed body).
        console.log("Response", response);
        },
        function(err) { console.error("Execute error", err); });
}
loadClient();
// gapi.load("client");