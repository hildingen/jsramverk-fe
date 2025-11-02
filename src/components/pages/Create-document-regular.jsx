import React from 'react';
import '../../styles/Home.css';
import CreateDocumentForm from '../utils/create-document-form';
import { useNavigate } from 'react-router-dom';

export default function CreateDocumentsRegular() {
    const navigate = useNavigate();

    async function onSubmit(formData) {
        try {
            const token = localStorage.getItem('token');
            const res = fetch('http://localhost:8080/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'x-access-token': token || '',
                },
                body: JSON.stringify({
                    query: `mutation CreateArticle($name: String!, $content: String!) { 
                    createArticle(name: $name, content: $content, type: "regular") { 
                      _id
                      name
                      content
                      type
                     }}`,
                    variables: {
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
    return (
        <div className='App'>
            <CreateDocumentForm onSubmit={onSubmit} />
        </div>
    );
}
