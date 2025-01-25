import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useMessage } from "@plasmohq/messaging/hook"


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
  const [selection, setSelection] = useState([]);

  useMessage(async (req, res) => {
    if (req.name ="selectText") {
      setSelection(req.body["selection"]);
    }
  });

  function handleSubmit(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    // fetch('/some-api', { method: form.method, body: formData });

    // Or you can work with it as a plain object:
    const formJson = Object.fromEntries(formData.entries());
    let postJson = {...formJson, selection: selection};
    console.log(postJson);
  }
  
  return (
    <form method="post" onSubmit={handleSubmit}>

      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
          <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Send</button>
        </li>
        <li className="nav-item" role="presentation">
          <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Show</button>
        </li>
      </ul>
      <div className="tab-content" id="myTabContent">
        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
          <div className="input-group mb-3"></div>
          <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" name="user"/>

          <div className="input-group mb-3"></div>
          <input type="text" className="form-control" placeholder="Titel" aria-label="Titel" aria-describedby="basic-addon1" name="title"/>

          <label htmlFor="text_selected">Markierter Text</label><br/><br/>
          <label style={{height: '300px'}}>{selection}</label><br/><br/>
          <label htmlFor="comment">Kommentar</label><br/>
          <textarea id="comment" cols={30} rows={10} name="comment"/><br/>

          <button type="submit">
            Save
          </button>

        </div>
        <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
          2DO
        </div>
      </div>
    </form>    
  );
}

function IndexSidePanel() {
  if (tab.url != undefined && tab.url.includes("youtube")) {
    return (<CommentList/>);
  } else {
    return (<ArticleForm/>);
  }   
}

export default IndexSidePanel