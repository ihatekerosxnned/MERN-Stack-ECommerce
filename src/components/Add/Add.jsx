import React, { useState } from "react";
import axios from "axios";
import Navbar from "../Navigation/Navigation";

function Add() {
  const categoryOptions = [
    { value: "", label: "Select Category" },
    { value: "Shirts", label: "Shirts" },
    { value: "Shorts", label: "Shorts" },
    { value: "Hats", label: "Hats" },
  ];

  const statusOptions = [
    { value: "", label: "Select Product Status" },
    { value: "Available", label: "Available" },
    { value: "Out of Stock", label: "Out of Stock" },
  ];

  const [formData, setFormData] = useState({
    product_name: "",
    product_code: "",
    product_category: "",
    product_description: "",
    product_price: "",
    sku: "",
    status: "",
    image: null,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formDataWithImage = new FormData();
    formDataWithImage.append("product_name", formData.product_name);
    formDataWithImage.append("product_code", formData.product_code);
    formDataWithImage.append("product_category", formData.product_category);
    formDataWithImage.append(
      "product_description",
      formData.product_description
    );
    formDataWithImage.append("product_price", formData.product_price);
    formDataWithImage.append("sku", formData.sku);
    formDataWithImage.append("status", formData.status);
    formDataWithImage.append("image", formData.image);

    try {
      const response = await axios.post(
        "http://localhost:8080/products/add",
        formDataWithImage
      );
      console.log(response.data);
      // Redirect to another page or perform any desired action
      // e.g., history.push('/success');
      alert("gago");
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileChange = (event) => {
    setFormData({ ...formData, image: event.target.files[0] });
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <>
      <Navbar />
      <div className="container mt-2">
        
        <form onSubmit={handleSubmit} className="w-50 center m-auto">
        <h2 className="m-auto text-align-center mb-3">Add Product</h2>
          <div>
            <input
              type="text"
              name="product_name"
              value={formData.product_name}
              onChange={handleChange}
              placeholder="Product Name"
              class="form-control mb-3"
            />
          </div>
          <div>
            <input
              type="text"
              name="product_code"
              value={formData.product_code}
              onChange={handleChange}
              placeholder="Product Code"
              class="form-control mb-3"
            />
          </div>
          <div>
            <select
              name="product_category"
              value={formData.product_category}
              onChange={handleChange}
              className="form-control mb-3"
              placeholder="Select Category"
            >
              {categoryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <input
              type="text"
              name="product_description"
              value={formData.product_description}
              onChange={handleChange}
              placeholder="Product Description"
              class="form-control mb-3"
            />
          </div>
          <div>
            <input
              type="text"
              name="product_price"
              value={formData.product_price}
              onChange={handleChange}
              placeholder="Product Price"
              class="form-control mb-3"
            />
          </div>
          <div>
            <input
              type="text"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
              placeholder="SKU"
              class="form-control mb-3"
            />
          </div>
          <div>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="form-control mb-3"
              placeholder="Select Status"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              class="form-control mb-3"
            />
          </div>
          <button type="submit" class="btn btn-primary mb-3">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default Add;
