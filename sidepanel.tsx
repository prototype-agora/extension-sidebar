import { useState } from "react"


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

function IndexSidePanel() {


  return <CommentList/>;
}

export default IndexSidePanel