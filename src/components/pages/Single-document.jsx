import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UpdateDocumentForm from '../utils/update-document-form';
import UpdateCode from '../utils/update-code';
import { useNavigate } from 'react-router-dom';

export default function SingleDocument() {
    const [name, setName] = useState('');
    const [content, setContent] = useState('');
    const [type, setType] = useState('');
    const [loading, setLoading] = useState(true);
    const [inviteEmail, setInviteEmail] = useState('');
    let { id } = useParams();
    const navigate = useNavigate();

    //https://jsramverk-dasv22-fug6buh8daasaqbj.northeurope-01.azurewebsites.net

    useEffect(() => {
        async function fetchData() {
            const token = localStorage.getItem('token');
            fetch('http://localhost:8080/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'x-access-token': token || '',
                },
                body: JSON.stringify({
                    query: `{ article(articleId: "${id}") { _id name content type } }`,
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    setName(data.data.article.name);
                    setContent(data.data.article.content);
                    setType(data.data.article.type);
                });
        }

        fetchData();
        setLoading(false);
    }, [id]);

    async function onSubmit(formData) {
        try {
            console.log(formData);

            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:8080/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'x-access-token': token || '',
                },
                body: JSON.stringify({
                    query: `mutation UpdateArticle($id: String!, $name:String!, $content: String!) { 
                    updateArticle(id: $id, name: $name, content: $content) { 
                      _id
                      name
                      content
                      type
                     }}`,
                    variables: {
                        id: id,
                        name: formData.name,
                        content: formData.content,
                    },
                }),
            });

            if (res) {
                navigate('/view-documents');
            }
        } catch (e) {
            console.log('error', e);
        }
    }

    async function sendInvite(e) {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:8080/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'x-access-token': token || '',
                },
                body: JSON.stringify({
                    query: `mutation Mail($receiver: String!, $articleId: String!) {
                        mail(receiver: $receiver, articleId: $articleId) {
                            msg
                        }
                    }`,
                    variables: {
                        receiver: inviteEmail,
                        articleId: id,
                    },
                }),
            });

            const data = await res.json();

            if (data.data.mail.msg) {
                setInviteEmail('');
            }
        } catch (e) {
            console.log('error', e);
        }
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <form onSubmit={sendInvite}>
                <input
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="enter email"
                    required
                />
                <button type="submit">Invite</button>
            </form>
            {type === 'regular' ? (
                <UpdateDocumentForm
                    onSubmit={onSubmit}
                    nameProps={name}
                    contentProps={content}
                    id={id}
                />
            ) : (
                <UpdateCode
                    onSubmit={onSubmit}
                    savedName={name}
                    code={content}
                    id={id}
                />
            )}
        </div>
    );
}
