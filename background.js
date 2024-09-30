// Allows users to open the side panel by clicking on the action toolbar icon
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));


// Example of a simple user data object
const user = {
  username: 'demo-user'
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // 2. A page requested user data, respond with a copy of `user`
  if (request.event === "user") {
    sendResponse(user);
  }
});