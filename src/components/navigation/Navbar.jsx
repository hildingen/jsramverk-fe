import React from 'react'
import '../../styles/navbar.css'

export default function Navbar() {
  return (
    <header>
        <a href="/" class="logo">
            Jsramverk - FE  
        </a>
          
        <div class="nav-links">
            <a href="/skapa-dokument">
                Skapa dokument
            </a>

            <a href="/se-dokument">
                Se dokument
            </a>
        </div>
          
    </header>
  )
}
