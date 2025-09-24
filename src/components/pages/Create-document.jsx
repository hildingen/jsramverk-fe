import React from 'react'
import '../../styles/Home.css'
import CreateDocumentForm from '../utils/create-document-form'

export default function CreateDocuments() {

  function onSubmit(formData) {
        console.log(`Submit form \n name:${formData.name} \n content: ${formData.content} `);
    }
  return (
    <div className="App">
        <CreateDocumentForm onSubmit={onSubmit}/>
    </div>
  )
}
