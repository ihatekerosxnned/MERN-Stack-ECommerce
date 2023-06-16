import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles.modules.css";
import axios from "axios";
//ALL IMPORTS ABOVE DEPOTA NAPA ENGLISH NA AKO SA COMMENT MGA IDOKS

const Signup = () => {
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
      navigate("/login");
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
    //FORM STARTS HERE
    <body>
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="row border rounded-5 p-3 bg-white shadow box-area">
          <div className="col-md-6 right-box">
            <form className="row align-items-center" onSubmit={handleSubmit}>
              <div className="header-text mb-4">
                <h2>Create an Account</h2>
                <p>Shop til you drop!</p>
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
                  required
                />
              </div>
              <div className="input-group mb-3 mt-1">
              {error && <div className="alert alert-danger" role="alert">{error}</div>}
                <button
                  tpye="button"
                  className="btn btn-lg btn-primary w-100 fs-6"
                >
                  Sign Up
                </button>
              </div>
              <div className="row">
                <small>
                  Alreay have an account? <Link to="/login">Login</Link>
                </small>
              </div>
            </form>
          </div>
          <div className="col-md-6 d-flex justify-content-center align-items-center flex-column left-box halaman">
            <div class="featured-image mb-3 ">
            </div>
          </div>
        </div>
      </div>
    </body>
  );
};

export default Signup;
