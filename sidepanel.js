const elmSave = document.getElementById("save");
const elmComment = document.getElementById("loadComments");


elmComment.onclick = () => {
  (async () => {
    const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    const query_params = new URLSearchParams(tab.url);
    const videoId = query_params.get('https://www.youtube.com/watch?v');

    const response = await chrome.runtime.sendMessage({event: "get_comments", videoId: videoId });
    
    alert(response); // OUTPUT: undefined
  })();
}

elmSave.onclick = () => {
  // Send a message to the service worker requesting the user's data
  (async () => {
    const response = await chrome.runtime.sendMessage({event: "user"});
  })();

  (async () => {
    let selection = document.getElementById("text_selected").value;
    let link = window.location.href;
    let comment = document.getElementById("comment").value;
    alert(comment);
    await sendPost(
      selection,
      link,
      comment      
      // document.getElementById("title").innerText,
    );
  })();
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.event === 'selected') {
    const label_text_selected = document.getElementById("text_selected");
    label_text_selected.innerHTML = request.data;
  }
});

async function getUser() {
  const url = 'http://127.0.0.1:8000/graphql';
  const query = `
      query {
        getAppUser(firstName: "Ulf") {
          firstName
          id
        }
      }`;
  
  const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query })
  });
  
  const responseData = await response.json();
  alert(JSON.stringify(responseData));
}

async function sendPost(quote, link, comment) {
  const url = 'http://127.0.0.1:8000/graphql';
  const query = `
      mutation {
        createPost(
          commentText: "${comment}",
          firstName: "Ulf",
          link: "https://www.nachdenkseiten.de/?p=121861",
          quoteText: "${quote}",
          title: "{title}"
        ) {
            appuserId
            commentId
            quoteId
            sourceId  
          }
      }`;
  
  const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query })
  });
  
  const responseData = await response.json();
  alert(JSON.stringify(responseData));
}