let selection = '';
let href = '';

window.addEventListener('mouseup', function(event) {
  selection = window.getSelection().toString();
  if (selection.length>4) {
    href = window.location.href;
	(async () => {
	    const response = await chrome.runtime.sendMessage({event: "selected", data: selection});
  	})();
  }
});