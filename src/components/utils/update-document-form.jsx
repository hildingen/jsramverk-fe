import React, { useEffect } from 'react';
import { useState } from 'react';
import '../../styles/forms.css';
import { io } from 'socket.io-client';
import AddCommentPopup from './add-comment-popup';

let socket;

export default function UpdateDocumentForm({
    onSubmit,
    nameProps,
    contentProps,
    id,
}) {
    const [name, setName] = useState(nameProps);
    const [content, setContent] = useState(contentProps);
    const [viewPopup, setViewPopup] = useState(false);
    const [commentIndex, setCommentIndex] = useState('');
    const [comments, setComments] = useState([]);
    const [commentValue, setCommentValue] = useState('');

    useEffect(() => {
        socket = io('http://localhost:8080', {
            auth: { token: localStorage.getItem('token') },
        });

        socket.emit('create', id);

        socket.on('name_update', function (data) {
            setName(data);
        });

        socket.on('content_update', function (data) {
            setContent(data);
        });

        socket.on('comment_update', function (data) {
            setComments(data);
        });

        return () => {
            socket.disconnect();
        };
    }, [id]);

    useEffect(() => {
        setName(nameProps);
    }, [nameProps]);

    useEffect(() => {
        setContent(contentProps);
    }, [contentProps]);

    function updateNameState(e) {
        setName(e.target.value);
        socket.emit('name_update', { id, data: e.target.value });
    }

    function updateContentState(e) {
        setContent(e.target.value);

        socket.emit('content_update', { id, data: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit({ name: name, content: content });
    }

    function addComment(index) {
        if (comments) {
            comments.forEach((item) => {
                if (item.row === index) {
                    setCommentValue(item.data);
                }
            });
        } else {
            setCommentValue('');
        }
        setCommentIndex(index);
        setViewPopup(true);
    }

    function removeClassList(index) {
        comments.forEach((item) => {
            if (item.row === index) {
                let row = document.getElementById(`row${item.row}`);
                let span = document.getElementById(`span${item.row}`);

                span.classList.remove('comment-active-view');
                span.classList.add('comment-active-hide');

                row.classList.remove('comment-exist');
            }
        });
    }

    useEffect(() => {
        let activeComments = document.getElementsByClassName('comment-exist');

        for (let item of activeComments) {
            item.classList.remove('comment-exist');
        }

        let activeComments2 = document.getElementsByClassName(
            'comment-active-view'
        );

        for (let item of activeComments2) {
            item.classList.remove('comment-active-view');
            item.classList.add('comment-active-hide');
        }

        comments.forEach((item) => {
            let row = document.getElementById(`row${item.row}`);
            let span = document.getElementById(`span${item.row}`);

            span.classList.remove('comment-active-hide');
            span.classList.add('comment-active-view');

            row.classList.add('comment-exist');
        });
        setCommentValue('');
    }, [comments]);
    return (
        <div className='App'>
            <div className='code-container'>
                <div className='form-wrapper'>
                    <h2 data-testid='h2-docs'>Update document</h2>
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
                            rows={20}
                            value={content}
                            onChange={updateContentState}
                        />

                        <button type='submit'>Update document</button>
                    </form>
                </div>

                <div className='preview-wrapper'>
                    <h2>Preview</h2>
                    <div className='preview-container'>
                        <div>
                            {content.split('\n').map((row, index) =>
                                row === '' ? (
                                    <div key={index} className='whitespace' />
                                ) : (
                                    <div
                                        data-testid='comment-click'
                                        id={`row${index}`}
                                        onClick={() => addComment(index)}
                                        className='row-p'
                                        key={index}
                                    >
                                        <p data-testid='row-test'>{row}</p>
                                        <span className='add-comment'>+</span>
                                        <span
                                            id={`span${index}`}
                                            className='comment-active-hide'
                                        >
                                            !
                                        </span>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {viewPopup && (
                <AddCommentPopup
                    setViewPopup={setViewPopup}
                    value={commentValue}
                    index={commentIndex}
                    comments={comments}
                    commentValue={commentValue}
                    setCommentValue={setCommentValue}
                    setComments={setComments}
                    removeClassList={removeClassList}
                    socket={socket}
                    room={id}
                />
            )}
        </div>
    );
}
