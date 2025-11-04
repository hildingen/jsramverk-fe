import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UpdateDocumentForm from '../utils/update-document-form';
import UpdateCode from '../utils/update-code';
import { useNavigate } from 'react-router-dom';
import InviteUserPopup from '../utils/invite-user-popup';

export default function SingleDocument() {
    const [name, setName] = useState('');
    const [content, setContent] = useState('');
    const [type, setType] = useState('');
    const [loading, setLoading] = useState(true);
    const [inviteEmail, setInviteEmail] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    let { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const token = localStorage.getItem('token');
            fetch(
                'https://jsramverk-dasv22-fug6buh8daasaqbj.northeurope-01.azurewebsites.net/graphql',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        'x-access-token': token || '',
                    },
                    body: JSON.stringify({
                        query: `{ article(articleId: "${id}") { _id name content type } }`,
                    }),
                }
            )
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
            const token = localStorage.getItem('token');
            const res = await fetch(
                'https://jsramverk-dasv22-fug6buh8daasaqbj.northeurope-01.azurewebsites.net/graphql',
                {
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
                }
            );

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
            const res = await fetch(
                'https://jsramverk-dasv22-fug6buh8daasaqbj.northeurope-01.azurewebsites.net/graphql',
                {
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
                }
            );

            const data = await res.json();

            if (data.data.mail.msg) {
                setInviteEmail('');
            }
            alert('Invitation sent');
            setShowPopup(false);
        } catch (e) {
            console.log('error', e);
        }
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <button onClick={() => setShowPopup(true)}>Invite user</button>
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

            {showPopup && (
                <InviteUserPopup
                    sendInvite={sendInvite}
                    inviteEmail={inviteEmail}
                    setInviteEmail={setInviteEmail}
                    setShowPopup={setShowPopup}
                />
            )}
        </div>
    );
}
