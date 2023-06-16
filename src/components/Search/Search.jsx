import React, { useState, useEffect } from "react";
import axios from "axios";
import {Link} from 'react-router-dom';
import "./Search.css";

function Search() {
  const [allProducts, setAllProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8080/products/display")
      .then((response) => {
        const data = response.data;
        console.log(data); // Check the received data
        setAllProducts(data); // Set the state
        setSearchResults(data); // Set the initial search results
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    if (searchQuery.trim() === "") {
      setSearchResults(allProducts); // Show all products if search query is empty
    } else {
      const filteredProducts = allProducts.filter((product) =>
        product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setSearchResults(filteredProducts);
    }
  };

  return (
    <div className="container w-75">
      <nav
        className="navbar navbar-expand-lg navbar-dark mt-3 mb-5 shadow p-2 bg-color"
      >
        <div className="container-fluid">
          <div className="navbar-brand" >
            <Link to='/display' className="navbar-brand">Our Products</Link>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarSupportedContent2"
            aria-controls="navbarSupportedContent2"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars"></i>
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent2"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item active" key="all">
              <Link to="/displayshirts" className="nav-link">Shirts</Link>
              </li>
              <li className="nav-item active" key="all">
              <Link to="/displayshorts" className="nav-link">Shorts</Link>
              </li>
            </ul>
            <form className="w-auto py-1 d-flex" onSubmit={handleSearch}>
              <input
                type="search"
                className="form-control rounded-0"
                placeholder="Search"
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>
        </div>
      </nav>

      <div className="row">
        {searchResults.map((product) => (
          <div className="col-lg-3 col-md-6 mb-4" key={product._id}>
            <div className="card">
              <img
                src={`http://localhost:8080/uploads/${product.image}`}
                alt="halaman"
                className="w-100"
              />
              <div className="mask">
                <div className="d-flex justify-content-start align-items-end h-100">
                  <h5>
                    <span className="badge bg-dark ms-2">NEW</span>
                  </h5>
                </div>
              </div>

              <div className="card-body">
                <div className="text-reset">
                  <h5 className="card-title mb-2">{product.product_name}</h5>
                </div>
                <div className="text-reset">
                  <p>{product.product_category}</p>
                </div>
                <h6 className="mb-3 price">${product.product_price}</h6>
                <h6 className="mb-3 price fs-6">{product.status}</h6>
              </div>
              <Link
                to={`/displaydetails/${product._id}`}
                className="btn btn-outline-dark mb-3 w-75 m-auto"
              >
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
