
import React from 'react'
// import { useEffect, useState } from 'react';
import '../../styles/Home.css'
import dummyData from '../../dummy-data.json'

export default function ViewDocuments() {
  // const [data, setData] = useState(null);
  

  // useEffect(() => {
  // //   async function fetchData() {
  // //     fetch('src/dummy-data.json')
  // //     .then(res => res.json())
  // //     .then(data => {
  // //       setData(data)
  // //     })
  // //     .catch(err => console.log(err));
  // //   }
    
  //   // fetchData();
  //   setData(dummyData)
  // }, [])
  
  return (
    <div className="documents-page">
      <h2>All documents</h2>
      <div className="documents-wrapper">
        {dummyData.map((item) => (
          <a key={item.id} href={`/single-document/${item.id}`}>
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
