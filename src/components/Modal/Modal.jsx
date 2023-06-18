import React, { useState } from "react";

function Modal({ formData, handleChange, handleFileChange, hide, update }) {
  const [updatedFormData, setUpdatedFormData] = useState(formData);

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

  const handleSubmit = (e) => {
  e.preventDefault();
  // Pass the id and updatedFormData to the update function
  update(formData._id, updatedFormData);
  alert("Product Updated!");
};

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div className="modal show fade" style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.8)" }}>
      <div className="modal-dialog">
        <div className="modal-content w-100">
          <div className="modal-header">
            <h5 className="modal-title">Update Product</h5>
            <button type="button" className="btn-close" onClick={hide}></button>
          </div>
          <div className="modal-body"> 
            <form onSubmit={handleSubmit} className="w-75 center m-auto">
            <img
                src={`http://localhost:8080/uploads/${updatedFormData.image}`}
                alt="gago"
                className="w-100 h-auto m-auto"
              /> 
              <div>
                <input
                  type="text"
                  name="product_name"
                  value={updatedFormData.product_name}
                  onChange={handleInputChange}
                  placeholder="Product Name"
                  className="form-control mb-3"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="product_code"
                  value={updatedFormData.product_code}
                  onChange={handleInputChange}
                  placeholder="Product Code"
                  className="form-control mb-3"
                />
              </div>
              <div>
            <select
              name="product_category"
              value={updatedFormData.product_category}
              onChange={handleInputChange}
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
                  value={updatedFormData.product_description}
                  onChange={handleInputChange}
                  placeholder="Product Description"
                  className="form-control mb-3"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="product_price"
                  value={updatedFormData.product_price}
                  onChange={handleInputChange}
                  placeholder="Product Price"
                  className="form-control mb-3"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="sku"
                  value={updatedFormData.sku}
                  onChange={handleInputChange}
                  placeholder="SKU"
                  className="form-control mb-3"
                />
              </div>
              <div>
            <select
              name="status"
              value={updatedFormData.status}
              onChange={handleInputChange}
              className="form-control mb-3"
              placeholder="Select Category"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
              <button type="submit" className="btn btn-primary mb-3">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
