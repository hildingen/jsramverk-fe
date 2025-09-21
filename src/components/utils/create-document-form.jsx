import React from 'react'
import { useState } from 'react'
import '../../styles/forms.css'

export default function CreateDocumentForm() {

    const [name, setName] = useState('');
    const [content, setContent] = useState('');

    function onSubmit(e) {
        e.preventDefault();
        console.log(`Submit form \n name:${name} \n content: ${content} `);
        
    }

    function updateNameState(e) {
        setName(e.target.value);
    }

    function updateContentState(e) {
        setContent(e.target.value);
    }
  return (
    <div className="form-wrapper">
        <h2>Create a new document</h2>
        <form className="create-form" onSubmit={onSubmit}>
            <label htmlFor='name'>Name</label>
            <input type='text' name='name' value={name} onChange={updateNameState} />
              
            <label htmlFor='content'>Content</label>
            <textarea name='content' rows={10} value={content} onChange={updateContentState} />
              
            <button type='submit'>Create document</button>
        </form>  
    </div>
  )
}
