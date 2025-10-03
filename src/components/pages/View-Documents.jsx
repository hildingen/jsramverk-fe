
import React from 'react'
import { useEffect, useState } from 'react';
import '../../styles/Home.css'

export default function ViewDocuments() {
  const [data, setData] = useState(null);
  

  useEffect(() => {
    async function fetchData() {
      fetch(`https://jsramverk-dasv22-fug6buh8daasaqbj.northeurope-01.azurewebsites.net//all`)
      .then(res => res.json())
      .then(data => {
        setData(data)
      })
      .catch(err => console.log(err));
    }
    
    fetchData();

  }, [])

  return (
    <div className="documents-page">
      <h2>All documents</h2>
      <div className="documents-wrapper">
        {data?.map((item) => (
          <a key={item._id} href={`/single-document/${item._id}`}>
          <div className='document'>
            <h1>{item.name}</h1>
            <p>{item.content}</p>
            </div>
          </a>
      ))}
        </div>
    </div>
  )
}
