import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/Details.css'

const Details = () => {

  const { id } = useParams();
  const [post, setPost] = useState();
  const [error, setError] = useState()

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(res => res.json())
      .then(data => {
        setPost(data);
      })
      .catch(err => {
        setError(err.message)
      })
  }, [id])

  if (error) return <p>Error:{error}</p>
  if (!post) return null


  return (
    <div className="details-page">
  <div className="details-card">
    <h1 className="details-title">{post.title}</h1>
    <p className="details-body">{post.body}</p>
  </div>
</div>

  )
}

export default Details
