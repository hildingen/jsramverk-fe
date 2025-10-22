import React, { useEffect, useState } from "react";
import "../../styles/Home.css";
import Editor from "@monaco-editor/react";
import UpdateCodePopup from "./Update-code-popup";

export default function UpdateCode({ code, onSubmit, savedName }) {
  const [value, setValue] = useState(code === "" ? "hello" : code);
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [viewPopup, setViewPopup] = useState(false);

  useEffect(() => {
    setValue(code);
  }, [code]);

  async function runCode() {
    try {
      setLoading(true);
      const res = await fetch("https://execjs.emilfolino.se/code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: btoa(value),
        }),
      });

      if (res.ok) {
        let response = await res.json();
        setOutput(atob(response.data));
      }
    } catch (e) {
      console.log("Something went wrong!", e);
    }
    setLoading(false);
  }
  return (
    <div className="App">
      <div className="code-wrapper">
        <h2>Create code snippet</h2>
        <div className="code-container">
          <div className="editor-container">
            <div className="flex-container">
              <h3>Input</h3>
              <button onClick={runCode}>
                {loading ? "Loading..." : "Run code"}
              </button>
            </div>
            <Editor
              height="60vh"
              defaultLanguage="javascript"
              theme="vs-dark"
              value={code}
              onChange={(e) => setValue(e)}
            />
          </div>
          <div className="code-output-container">
            <div className="flex-container">
              <h3>Output</h3>
              <button onClick={() => setViewPopup(true)}>Save code</button>
            </div>
            <div className="inner-output-container">{output}</div>
          </div>
        </div>
      </div>

      {viewPopup && (
        <UpdateCodePopup
          value={value}
          setViewPopup={setViewPopup}
          onSubmit={onSubmit}
          savedName={savedName}
        />
      )}
    </div>
  );
}
