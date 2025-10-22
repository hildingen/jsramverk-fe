import React from 'react'
import '../../styles/Home.css'
import { Link } from 'react-router-dom'

export default function CreateDocuments() {

  return (
    <div className="App">
      <div className='flex-container'>
        <Link to="/create-document-regular">
          <button>Regular document</button>
        </Link>
        <Link to="/create-document-code">
          <button>Code editor</button>
        </Link>
        </div>
    </div>
  )
}
