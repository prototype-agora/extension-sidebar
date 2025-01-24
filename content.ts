import type { PlasmoCSConfig } from "plasmo"
import { sendToBackground } from "@plasmohq/messaging"

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"]
}

let selection = '';

window.addEventListener('mouseup', function(event) {
  selection = window.getSelection().toString();
  if (selection.length>4) {
	(async () => {
    const resp = await sendToBackground({
      name: "ping",
      body: {
        id: 123,
        selection: selection
      },
    });
    console.log(resp.message);
  })();
  }
});