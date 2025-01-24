import { useState } from "react"
import { sendToBackground } from "@plasmohq/messaging"

(async () => {
    const resp = await sendToBackground({
      name: "ping",
      body: {
        id: 123,
        selection: "selection"
      },
    });
    console.log(resp);
    alert(JSON.stringify(resp));
  })();

function IndexPopup() {
  const [data, setData] = useState("")  

  return (
    <div
      style={{
        padding: 16
      }}>
      <h2>
        Welcome to your{" "}
        <a href="https://www.plasmo.com" target="_blank">
          Plasmo
        </a>{" "}
        Extension!
      </h2>
      <input onChange={(e) => setData(e.target.value)} value={data} />
      <a href="https://docs.plasmo.com" target="_blank">
        View Docs
      </a>
    </div>
  )
}

export default IndexPopup
