import './App.css'
import React, { useState, useEffect } from 'react'

function App() {

  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null)

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  }

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  }

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => setError(err.message));
  }, []);

  if (!products) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="products-grid">
        {currentProducts.map((index) => (
          <div key={index.id} className="product-card">
            <img src={index.image} alt={index.title} className="product-image" />
            <h2 className="product-title">{index.title}</h2>
            <p className="product-description">{index.description}</p>
            <p className="product-price">Price: ${index.price}</p>
            <p className="product-category">Category: {index.category}</p>
            <p className="product-rating">
              Rating: {index.rating.rate} ({index.rating.count} reviews)
            </p>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button onClick={handlePrev} disabled={currentPage === 1}>Prev</button>
        <span className="page-info">Page {currentPage}</span>
        <button onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
      </div>

    </>
  )
}
export default App
