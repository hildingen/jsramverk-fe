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
    let { id } = useParams();
    const navigate = useNavigate();

    //https://jsramverk-dasv22-fug6buh8daasaqbj.northeurope-01.azurewebsites.net

    useEffect(() => {
        async function fetchData() {
            fetch('http://localhost:8080/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
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

            const res = await fetch('http://localhost:8080/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
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
            console.log('Something went wrong!', e);
        }
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
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
