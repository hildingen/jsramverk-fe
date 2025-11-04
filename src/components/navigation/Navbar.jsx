import React, { useState, useEffect } from 'react';
import '../../styles/navbar.css';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token) {
            const decodedToken = jwtDecode(token);

            setUser(decodedToken);
        }
    }, [token]);

    function handleLogout() {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login');
    }

    return (
        <header>
            <Link to='/' className='logo'>
                Jsramverk - FE
            </Link>

            {user ? (
                <div className='nav-links'>
                    <h3>Hello, {user.email}</h3>
                    <Link to='/create-document'>Create document</Link>
                    <Link to='/view-documents'>All documents</Link>
                    <button className='logout-button' onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            ) : (
                <div className='nav-links'>
                    <Link to='/login'>Login</Link>
                </div>
            )}
        </header>
    );
}
