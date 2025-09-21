import React from 'react'
import '../../styles/navbar.css'

export default function Navbar() {
  return (
    <header>
        <a href="/" class="logo">
            Jsramverk - FE  
        </a>
          
        <div class="nav-links">
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
