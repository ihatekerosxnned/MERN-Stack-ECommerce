import React, { useState, useEffect } from "react";
import Navbar from "../Navigation/Navigation";
import Modal from "../Modal/Modal";
import axios from 'axios';

function DisplayProd() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/products/display")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleModalOpen = (product) => {
    setSelectedProduct(product);
  };

  const handleModalClose = () => {
    setSelectedProduct(null);
  };

  const handleUpdateForm = (updatedData) => {
    setSelectedProduct((prevProduct) => {
      return { ...prevProduct, ...updatedData };
    });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/products/delete/${id}`)
      .then((response) => {
        console.log("Product deleted successfully");
        const updatedProducts = products.filter((product) => product._id !== id);
        setProducts(updatedProducts);
        alert("Product Deleted!!");
        setTimeout(() => setShowAlert(false), 3000);
      })
      .catch((error) => console.log(error));
  };

  const handleUpdate = (id, updatedProduct) => {
    const { image } = products.find((product) => product._id === id);
    updatedProduct.image = image;
  
    axios.patch(`http://localhost:8080/products/update/${id}`, updatedProduct)
      .then((response) => {
        console.log("Product updated successfully");
        const updatedProducts = products.map((product) => {
          if (product._id === id) {
            return response.data;
          }
          return product;
        });
        setProducts(updatedProducts);
        handleModalClose();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <Navbar />
      <div className="container mt-2">
        <h1>Product List</h1>
        {showAlert && (
          <div className="alert alert-success" role="alert">
            Product deleted successfully!
          </div>
        )}
        <div className="row">
          {products.map((product) => (
            <div className="col-lg-3 col-md-6 mb-4" key={product._id}>
              <div className="card">
                <img
                  src={`http://localhost:8080/uploads/${product.image}`}
                  alt="halaman"
                  className="w-100"
                />
                <div className="card-body">
                  <hr></hr>
                  <h5 className="card-title">{product.product_name}</h5>
                  <p className="card-text">{product.product_category}</p>
                  <p className="card-text">{product.product_price}</p>
                  <p className="card-text">{product.product_description}</p>
                  <p className="card-text">{product.sku}</p>
                  <p className="card-text">{product.status}</p>
                  <hr></hr>
                </div>
                
                <button
                    className="btn btn-primary w-75 mx-auto mb-2"
                    onClick={() => handleModalOpen(product)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger w-75 m-auto mb-4"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedProduct && (
        <Modal
          formData={selectedProduct}
          handleChange={handleUpdateForm}
          handleFileChange={handleUpdateForm}
          hide={handleModalClose}
          update={handleUpdate}
        />
      )}
    </>
  );
}

export default DisplayProd;
