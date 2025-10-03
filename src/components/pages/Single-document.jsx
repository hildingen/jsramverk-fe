import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import UpdateDocumentForm from '../utils/update-document-form';
import { redirect } from 'react-router-dom';

export default function SingleDocument() {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  let { id } = useParams();

  useEffect(() => {
      async function fetchData() {
        fetch(`http://localhost:3000/find/${id}`)
        .then(res => res.json())
        .then(data => {
          setName(data.data.article.name);
          setContent(data.data.article.content);
        })
        .catch(err => console.log(err));
      }
      fetchData();
  }, [id])

  async function onSubmit(formData) {
    try {
      const res = await fetch(`http://localhost:3000/update/${id}`, {
        method: "PUT",
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
             <UpdateDocumentForm onSubmit={onSubmit} nameProps={name} contentProps={content}/>
         </div>
  )
}
