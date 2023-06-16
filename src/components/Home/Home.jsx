import React, { useState, useEffect } from "react";
import Navbar from "../Navigation/Navigation";
import axios from "axios";
import "./Home.css";
import logo from "../images/Ginago.png";
import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/products/display")
      .then((response) => {
        const data = response.data;
        setProducts(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="header mt-2">
        <div className="logo m-auto">
          <img src={logo} className="logo" alt="Logo"></img>
		  <Link to='/display' className="btn btn-outline-light w-100" >SHOP NOW</Link>
        </div>
      </div>
      <div className="container">
        <div className="new-arrivals text-center mt-5">
          <h1>NEW ARRIVALS</h1>
          <div className="row">
            {products.map((product) => (
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
                      <h5 className="card-title mb-2">
                        {product.product_name}
                      </h5>
                    </div>
                    <div className="text-reset">
                      <p>{product.product_category}</p>
                    </div>
                    <h6 className="mb-3 price">${product.product_price}</h6>
                    <h6 className="mb-3 price fs-6">{product.status}</h6>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
