import React, { useEffect } from 'react';
import { useState } from 'react';
import '../../styles/forms.css';
import { io } from 'socket.io-client';

let socket;

export default function UpdateDocumentForm({
    onSubmit,
    nameProps,
    contentProps,
    id,
}) {
    const [name, setName] = useState(nameProps);
    const [content, setContent] = useState(contentProps);
    const [room, setRoom] = useState(id);

    useEffect(() => {
        socket = io('http://localhost:8080');

        socket.emit('create', room);

        socket.on('name_update', function (data) {
            setName(data);
        });

        socket.on('content_update', function (data) {
            setContent(data);
        });

        return () => {
            socket.disconnect();
        };
    }, [room]);

    useEffect(() => {
        setName(nameProps);
    }, [nameProps]);

    useEffect(() => {
        setContent(contentProps);
    }, [contentProps]);

    function updateNameState(e) {
        setName(e.target.value);
        socket.emit('name_update', { room, data: e.target.value });
    }

    function updateContentState(e) {
        setContent(e.target.value);
        socket.emit('content_update', { room, data: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit({ name: name, content: content });
    }
    return (
        <div className='App'>
            <div className='form-wrapper'>
                <h2>Update document</h2>
                <form className='create-form' onSubmit={handleSubmit}>
                    <label htmlFor='create-document-name'>Name</label>
                    <input
                        type='text'
                        id='create-document-name'
                        name='name'
                        value={name}
                        onChange={updateNameState}
                    />

                    <label htmlFor='create-document-content'>Content</label>
                    <textarea
                        name='content'
                        id='create-document-content'
                        rows={10}
                        value={content}
                        onChange={updateContentState}
                    />

                    <button type='submit'>Update document</button>
                </form>
            </div>
        </div>
    );
}
