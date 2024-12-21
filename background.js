let youtube_api_options = {
  part: 'snippet',
  maxResults: '1000',
  order: 'relevance',
  textFormat: 'plainText',
  key: 'AIzaSyDTmC8tmyqumVT4sW-azwT4jxEnlXc8_M0'
}

function parse_and_sort_comments(comments) {
    const filtered_comments = comments.items.map(item => {
        return {
            author: item.snippet.topLevelComment.snippet.authorDisplayName,
            comment: item.snippet.topLevelComment.snippet.textDisplay,
            id: item.snippet.topLevelComment.id,
            totalReplyCount: item.snippet.totalReplyCount,
            likeCount: item.snippet.topLevelComment.snippet.likeCount

        }
    });

    const timestamp_regexp = new RegExp('[0-9]{0,2}:[0-9]{1,2}');
    let filtered_and_sorted_comments = [];

    filtered_comments.forEach(comment => {
        if (timestamp_regexp.test(comment.comment)) {
            filtered_and_sorted_comments.push({
                timestamp: comment.comment.match(timestamp_regexp)[0],
                author: comment.author,
                comment: comment.comment,
                id: comment.id
            });
        }
    });
    
    filtered_and_sorted_comments = filtered_and_sorted_comments.map(comment => {
        let tmp_array = [];
        let converted_into_seconds = 0.0;
        tmp_array = comment.timestamp.split(':');
        converted_into_seconds = (parseFloat(tmp_array[0] * 60) + (parseFloat(tmp_array[1])));

        return {
            timestamp: converted_into_seconds,
            author: comment.author,
            comment: comment.comment,
            id: comment.id
        }
    });
    return filtered_and_sorted_comments;
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

  return parse_and_sort_comments(json);
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