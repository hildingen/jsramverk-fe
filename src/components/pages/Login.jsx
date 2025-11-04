import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Home.css';
import '../../styles/forms.css';

export default function Login() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');

        try {
            setLoading(true);
            const query = isLogin
                ? `mutation Login($email: String!, $password: String!) {
            login(email: $email, password: $password) {
              msg
              token
              email
            }
          }`
                : `mutation Register($email: String!, $password: String!) {
            register(email: $email, password: $password) {
              msg
              email
            }
          }`;

            const res = await fetch('http://localhost:8080/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    query: query,
                    variables: {
                        email: email,
                        password: password,
                    },
                }),
            });

            const data = await res.json();

            if (data.errors) {
                setError(data.errors[0].message);
            } else if (isLogin && data.data.login.token) {
                localStorage.setItem('token', data.data.login.token);
                localStorage.setItem('email', data.data.login.email);
                navigate('/view-documents');
            } else if (!isLogin && data.data.register.msg) {
                setError('Registration successful! Please login.');
                setIsLogin(true);
                setEmail('');
                setPassword('');
            }
        } catch (e) {
            setError('Something went wrong!');
        }
        setLoading(false);
    }

    return (
        <div className='App'>
            <div className='shrink'>
                <div className='form-wrapper'>
                    <h2>{isLogin ? 'Login' : 'Register'}</h2>
                    <div style={{ marginBottom: '20px' }}>
                        <button
                            type='button'
                            onClick={() => {
                                setIsLogin(true);
                                setError('');
                                setEmail('');
                                setPassword('');
                            }}
                            style={{
                                marginRight: '10px',
                                backgroundColor: isLogin
                                    ? '#f4b755'
                                    : '#2a323e',
                            }}
                        >
                            Login
                        </button>
                        <button
                            type='button'
                            onClick={() => {
                                setIsLogin(false);
                                setError('');
                                setEmail('');
                                setPassword('');
                            }}
                            style={{
                                backgroundColor: !isLogin
                                    ? '#f4b755'
                                    : '#2a323e',
                            }}
                        >
                            Register
                        </button>
                    </div>
                    {error && (
                        <div style={{ color: 'white', marginBottom: '20px' }}>
                            {error}
                        </div>
                    )}
                    <form className='create-form' onSubmit={handleSubmit}>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='email'
                            id='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            id='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type='submit'>
                            {loading
                                ? 'Loading...'
                                : isLogin
                                ? 'Login'
                                : 'Register'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
