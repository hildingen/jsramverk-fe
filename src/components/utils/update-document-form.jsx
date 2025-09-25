import React, { useEffect } from 'react'
import { useState } from 'react'
import '../../styles/forms.css'

export default function UpdateDocumentForm({ onSubmit, nameProps, contentProps }) {
    const [name, setName] = useState(nameProps);
    const [content, setContent] = useState(contentProps);

    
    useEffect(() => {
        setName(nameProps);
    }, [nameProps])
    
    useEffect(() => {
        setContent(contentProps);
    }, [contentProps]) 
    
    function updateNameState(e) {
        setName(e.target.value);
    }

    function updateContentState(e) {
        setContent(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit({ name: name, content: content });
    }
  return (
    <div className="form-wrapper">
        <h2>Update document</h2>
        <form className="create-form" onSubmit={handleSubmit}>
            <label htmlFor='create-document-name'>Name</label>
            <input type='text' id='create-document-name' name='name' value={name} onChange={updateNameState} />
              
            <label htmlFor='create-document-content'>Content</label>
            <textarea name='content' id='create-document-content' rows={10} value={content} onChange={updateContentState} />
              
            <button type='submit'>Update document</button>
        </form>  
    </div>
  )
}
