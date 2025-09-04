import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Home.css'

const Home = () => {

    const [posts, setPosts] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts') //api to fetch
            .then(res => res.json()) //convert response to JSON
            .then(data => {
                setPosts(data)  //save posts to state
            })
            .catch(err => {
                setError(err.message); //save error
            })
    }, [])

    if (error) return <p>Error: {error}</p>

    return (
        <div className="home-container">
            <h1 className="home-title">Blog Viewer</h1>
            <div className="posts-grid">
                {posts.map(index => (
                    <div key={index.id} className="post-card">
                        <Link to={`/item/${index.id}`} className="post-link">
                            <h2 className="post-title">{index.title}</h2>
                            <p className="post-body">{index.body.slice(0, 80)}...</p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home
