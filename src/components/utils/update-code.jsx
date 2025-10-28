import React, { useEffect, useState } from 'react';
import '../../styles/Home.css';
import Editor from '@monaco-editor/react';
import UpdateCodePopup from './Update-code-popup';
import { io } from 'socket.io-client';

let socket;

export default function UpdateCode({ code, onSubmit, savedName, id }) {
    const [value, setValue] = useState(code);
    const [output, setOutput] = useState('');
    const [loading, setLoading] = useState(false);
    const [viewPopup, setViewPopup] = useState(false);

    useEffect(() => {
        socket = io('http://localhost:8080');

        socket.emit('create', id);

        socket.on('content_update', function (data) {
            setValue(data);
        });

        return () => {
            socket.disconnect();
        };
    }, [id]);

    function handleEditorChange(val) {
        setValue(val);
        socket.emit('content_update', { id, data: val });
    }

    useEffect(() => {
        setValue(code);
    }, [code]);

    async function runCode() {
        try {
            setLoading(true);
            const res = await fetch('https://execjs.emilfolino.se/code', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    code: btoa(value),
                }),
            });

            if (res.ok) {
                let response = await res.json();
                setOutput(atob(response.data));
            }
        } catch (e) {
            console.log('Something went wrong!', e);
        }
        setLoading(false);
    }
    return (
        <div className='App'>
            <div className='code-wrapper'>
                <h2>Create code snippet</h2>
                <div className='code-container'>
                    <div className='editor-container'>
                        <div className='flex-container'>
                            <h3>Input</h3>
                            <button onClick={runCode}>
                                {loading ? 'Loading...' : 'Run code'}
                            </button>
                        </div>
                        <div data-testid='editor'>
                            <Editor
                                height='60vh'
                                defaultLanguage='javascript'
                                theme='vs-dark'
                                value={value}
                                onChange={handleEditorChange}
                            />
                        </div>
                    </div>
                    <div className='code-output-container'>
                        <div className='flex-container'>
                            <h3>Output</h3>
                            <button onClick={() => setViewPopup(true)}>
                                Save code
                            </button>
                        </div>
                        <div
                            data-testid='output-container'
                            className='inner-output-container'
                        >
                            {output}
                        </div>
                    </div>
                </div>
            </div>

            {viewPopup && (
                <UpdateCodePopup
                    value={value}
                    setViewPopup={setViewPopup}
                    onSubmit={onSubmit}
                    savedName={savedName}
                />
            )}
        </div>
    );
}
