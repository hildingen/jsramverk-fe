import React from "react";
import "../../styles/Home.css";
import CreateDocumentForm from "../utils/create-document-form";
import { useNavigate } from "react-router-dom";

export default function CreateDocumentsRegular() {
  const navigate = useNavigate();

  async function onSubmit(formData) {
    try {
      const res = await fetch("http://localhost:8080/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          content: formData.content,
          type: "regular",
        }),
      });

      if (res.ok) {
        navigate("/view-documents");
      }
    } catch (e) {
      console.log("Something went wrong!", e);
    }
  }
  return (
    <div className="App">
      <CreateDocumentForm onSubmit={onSubmit} />
    </div>
  );
}
