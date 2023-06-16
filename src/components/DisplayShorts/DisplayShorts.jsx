import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../Navigation/Navigation";
import SearchNav from "../SearchNav/SearchNav";

function DisplayShorts() {
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/products/display")
      .then((response) => {
        const data = response.data;
        console.log(data); // Check the received data
        const filteredProducts = data.filter(
          (product) => product.product_category.toLowerCase() === "shorts"
        );
        setSearchResults(filteredProducts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Navbar />
      <SearchNav setFilteredResults={setSearchResults} />
      <div className="container">
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
    </>
  );
}

export default DisplayShorts;