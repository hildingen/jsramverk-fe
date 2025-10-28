import React, { useState } from 'react';

export default function AddCommentPopup({
    setViewPopup,
    index,
    comments,
    setComments,
    commentValue,
    setCommentValue,
    removeClassList,
    socket,
    room,
}) {
    const [content, setContent] = useState(commentValue);
    const [loading, setLoading] = useState(false);

    function saveComment() {
        setLoading(true);
        setComments([...comments, { row: index, data: content }]);

        socket.emit('comment_update', {
            room,
            data: [...comments, { row: index, data: content }],
        });
        setCommentValue('');
        setLoading(false);
        setViewPopup(false);
    }

    function handleClose() {
        setCommentValue('');
        setViewPopup(false);
    }

    function removeComment() {
        setCommentValue('');
        removeClassList(index);
        setComments(comments.filter((item) => item.row !== index));
        socket.emit('comment_update', {
            room,
            data: comments.filter((item) => item.row !== index),
        });
        setViewPopup(false);
    }

    return (
        <div className='popup-wrapper'>
            <div className='popup-content'>
                <h1>Add comment</h1>
                <form className='create-form' onSubmit={saveComment}>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder='Text...'
                        rows={5}
                    />
                    <button
                        onClick={() => saveComment}
                        type='submit'
                        className='detail-color'
                    >
                        {loading ? 'Loading...' : 'Save'}
                    </button>
                </form>
                <div className='flex-container mt-5'>
                    <button onClick={handleClose}>Close</button>
                    <button className='warning' onClick={removeComment}>
                        Remove
                    </button>
                </div>
            </div>
        </div>
    );
}
