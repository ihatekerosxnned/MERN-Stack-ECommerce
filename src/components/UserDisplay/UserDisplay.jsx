import React, { useState, useEffect } from "react";
import Navbar from "../Navigation/Navigation";
import Modal from "../Modal/Modal";
import axios from "axios";

function UserDisplay() {
  const [admin, setAdmin] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/admin/display")
      .then((res) => res.json())
      .then((data) => {
        setAdmin(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleModalClose = () => {
    setSelectedAdmin(null);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/admin/delete/${id}`)
      .then((response) => {
        console.log("Admin deleted successfully");
        const updatedAdmin = admin.filter((admin) => admin._id !== id);
        setAdmin(updatedAdmin);
        alert("Admin Deleted!!");
        setTimeout(() => setShowAlert(false), 3000);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Navbar />
      <div className="container mt-2">
        <h1>User List</h1>
        {showAlert && (
          <div className="alert alert-success" role="alert">
            Admin deleted successfully!
          </div>
        )}
        <div className="row">
          {admin.map((admin) => (
            <div className="col-lg-3 col-md-6 mb-4" key={admin._id}>
              <div className="card">
                <div className="card-body">
                  <hr></hr>
                  <h5 className="card-title">{admin.last_name}</h5>
                  <p className="card-text">{admin.first_name}</p>
                  <hr></hr>
                  <p className="fw-bold">Username</p>
                  <p className="card-text">{admin.username}</p>
                  <hr></hr>
                </div>

                <button
                  className="btn btn-danger w-75 m-auto mb-4"
                  onClick={() => handleDelete(admin._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedAdmin && (
        <Modal formData={selectedAdmin} hide={handleModalClose} />
      )}
    </>
  );
}

export default UserDisplay;
