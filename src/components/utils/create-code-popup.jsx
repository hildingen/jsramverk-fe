import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateCodePopup({ value, setViewPopup }) {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    //"https://jsramverk-dasv22-fug6buh8daasaqbj.northeurope-01.azurewebsites.net/create"

    async function saveCode() {
        try {
            setLoading(true);
            const res = await fetch('http://localhost:8080/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: `mutation CreateArticle($name: String!, $content: String!) { 
                    createArticle(name: $name, content: $content, type: "code") { 
                      _id
                      name
                      content
                      type
                     }}`,
                    variables: {
                        name: name,
                        content: value,
                    },
                }),
            });

            if (res.ok) {
                navigate('/view-documents');
                setViewPopup(false);
            }
        } catch (e) {
            console.log('Something went wrong!', e);
        }
        setLoading(false);
    }

    return (
        <div className='popup-wrapper'>
            <div className='popup-content'>
                <h1>Save code</h1>
                <form className='create-form' onSubmit={saveCode}>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type='text'
                        placeholder='Name...'
                        required={true}
                        className=''
                    />
                    <div className='flex-container'>
                        <button
                            onClick={() => saveCode}
                            className='detail-color'
                        >
                            {loading ? 'Loading...' : 'Save'}
                        </button>
                        <button onClick={() => setViewPopup(false)}>
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
