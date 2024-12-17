let youtube_api_options = {
  part: 'snippet',
  maxResults: '100',
  order: 'relevance',
  textFormat: 'plainText',
  key: 'AIzaSyDTmC8tmyqumVT4sW-azwT4jxEnlXc8_M0'
}

function parse_and_sort_comments(comments) {
    const filtered_comments = comments.items.map(item => {
        return {
            author: item.snippet.topLevelComment.snippet.authorDisplayName,
            comment: item.snippet.topLevelComment.snippet.textDisplay
        }
    });

    const timestamp_regexp = new RegExp('[0-9]{0,2}:[0-9]{1,2}');
    const filtered_and_sorted_comments = [];

    filtered_comments.forEach(comment => {
        if (timestamp_regexp.test(comment.comment)) {
            filtered_and_sorted_comments.push({
                timestamp: comment.comment.match(timestamp_regexp)[0],
                author: comment.author,
                comment: comment.comment
            });
        }
    });
    console.log(filtered_comments);
    console.log(filtered_and_sorted_comments);

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
  parse_and_sort_comments(json);

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  return json;
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