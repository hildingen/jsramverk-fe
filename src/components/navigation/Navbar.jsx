import React from 'react';
import '../../styles/navbar.css';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <header>
            <Link to='/' className='logo'>
                Jsramverk - FE
            </Link>

            <div className='nav-links'>
                <Link to='/login'>Login</Link>
                <Link to='/create-document'>Create document</Link>
                <Link to='/view-documents'>All documents</Link>
            </div>
        </header>
    );
}
