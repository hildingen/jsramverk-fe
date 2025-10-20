import React from 'react'
import '../../styles/Home.css'
import CreateDocumentForm from '../utils/create-document-form'
import { redirect } from 'react-router-dom';

export default function CreateDocumentsCode() {

  async function onSubmit(formData) {
    try {
      const res = await fetch('https://jsramverk-dasv22-fug6buh8daasaqbj.northeurope-01.azurewebsites.net/create', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: formData.name, content: formData.content})
      })

      if (res.ok) {
        throw redirect('/all');
      }
    } catch (e) {
      console.log('Something went wrong!', e);
    }
    }
  return (
    <div className="App">
        <CreateDocumentForm onSubmit={onSubmit}/>
    </div>
  )
}
