import { useState } from "react"

let [tab] = [undefined];
(async () => {
  [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
})();

function CommentList() {  
  const [comments, setComments] = useState([]);

  if (comments.length==0) {
    return (
      <button onClick={handleClick}>
        get comments with timestamp
      </button>)
  }

  function handleClick() {
    (async () => {
      const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
      const query_params = new URLSearchParams(tab.url);
      const videoId = query_params.get('https://www.youtube.com/watch?v');
      let test = await chrome.runtime.sendMessage({event: "get_comments", videoId: videoId });
      setComments(test);
      
    })();
  }
  
  return (
    <ul>
      {comments.map(comment => (
        <li key={comment.id}>{comment.comment}</li>
      ))}
    </ul>    
  );
}

function ArticleForm() {
  
  return (
    <div>
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
          <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Send</button>
        </li>
        <li className="nav-item" role="presentation">
          <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Show</button>
        </li>
      </ul>
    </div>
  );
}

function IndexSidePanel() {
  if (tab.url.includes("youtube")) {
    return (<CommentList/>);
  } else {
    return (<ArticleForm/>);
  }   
}

export default IndexSidePanel