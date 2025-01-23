import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"]
}

let selection = '';

window.addEventListener('mouseup', function(event) {
  selection = window.getSelection().toString();
  if (selection.length>4) {
	(async () => {
    console.log(selection);
  	})();
  }
});