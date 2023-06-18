import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navigation/Navigation";

function UserAdd() {
    const [data, setData] = useState({
        username: "",
        password: "",
        first_name: "",
        last_name: "",
      });
      const [error, setError] = useState("");
      const navigate = useNavigate();
    
      const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const url = "http://localhost:8080/admin";
          const { data: res } = await axios.post(url, data);
          alert("Account created successfully!");
          navigate("/userdisplay");
          console.log(res.message);
        } catch (error) {
          if (
            error.response &&
            error.response.status >= 400 &&
            error.response.status <= 500
          ) {
            setError(error.response.data.message);
          }
        }
      };

  return (
    <>
      <Navbar />
      <body>
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="row border rounded-5 p-3 bg-white shadow box-area w-50">
          <div className="col-md right-box">
            <form className="row align-items-center" onSubmit={handleSubmit}>
              <div className="header-text mb-4">
                <h2>Add an Account</h2>
              </div>
              <div className="input-group mb-3">
                
                <input
                  type="text"
                  className="form-control form-control-lg bg-light fs-6"
                  placeholder="Username"
                  name="username"
                  onChange={handleChange}
                  value={data.username}
                  required
                  autoComplete="off"
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control form-control-lg bg-light fs-6"
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                  value={data.password}
                  required
                  autoComplete="off"
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control form-control-lg bg-light fs-6"
                  placeholder="First Name"
                  name="first_name"
                  onChange={handleChange}
                  value={data.first_name}
                  autoComplete="off"
                  required
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control form-control-lg bg-light fs-6"
                  placeholder="Last Name"
                  name="last_name"
                  onChange={handleChange}
                  value={data.last_name}
                  autoComplete="off"
                  required
                />
              </div>
              <div className="input-group mb-3 mt-1">
              {error && <div className="alert alert-danger" role="alert">{error}</div>}
                <button
                  tpye="button"
                  className="btn btn-lg btn-primary w-100 fs-6"
                >
                  Add Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </body>
    </>
  );
}

export default UserAdd;
