import React from 'react'
import '../../styles/navbar.css'

export default function Navbar() {
  return (
    <header>
        <a href="/" className="logo">
            Jsramverk - FE  
        </a>
          
        <div className="nav-links">
            <a href="/create-document">
                Create document
            </a>

            <a href="/view-documents">
                All documents
            </a>
        </div>
          
    </header>
  )
}
