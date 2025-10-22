import React, { useState } from "react";

export default function UpdateCodePopup({
  value,
  setViewPopup,
  onSubmit,
  savedName,
}) {
  const [name, setName] = useState(savedName);

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({ name: name, content: value });
  }

  return (
    <div className="popup-wrapper">
      <div className="popup-content">
        <h1>Save code</h1>
        <form className="create-form" onSubmit={handleSubmit}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name..."
            required={true}
            className=""
          />
          <div className="flex-container">
            <button type="submit" className="detail-color">
              Update
            </button>
            <button onClick={() => setViewPopup(false)}>Close</button>
          </div>
        </form>
      </div>
    </div>
  );
}
