import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Home.css';

export default function ViewDocuments() {
    const [data, setData] = useState(null);

    //https://jsramverk-dasv22-fug6buh8daasaqbj.northeurope-01.azurewebsites.net/all

    useEffect(() => {
        async function fetchData() {
            fetch('http://localhost:8080/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    query: '{ articles { _id name content type } }',
                }),
            })
                .then((res) => res.json())
                .then((data) => setData(data.data));
        }

        fetchData();
    }, []);

    return (
        <div className='documents-page'>
            <h2>All documents</h2>
            <div className='documents-wrapper'>
                {data?.articles?.map((item) => (
                    <Link key={item._id} to={`/single-document/${item._id}`}>
                        <div className='document'>
                            <h1>{item.name}</h1>
                            <p>{item.content}</p>
                            <span className='type'>{item.type}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
