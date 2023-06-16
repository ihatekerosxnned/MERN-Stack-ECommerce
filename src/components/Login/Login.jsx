import { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.modules.css";
import axios from "axios";
//ALL IMPORTS ABOVE DEPOTA NAPA ENGLISH NA AKO SA COMMENT MGA IDOKS

const Login = () => {
  const [data, setData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/auth";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data);
      window.location = "/";
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
    <>
      <body>
	  <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="row border rounded-5 p-3 bg-white shadow box-area">
          <div className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column">
            <div className="featured-image mb-3">
              <video
                className="crap-video rounded-4"
                muted={true}
                autoplay="autoplay"
                loop="loop"
                playsinline=""
                controls="controls"
              >
                <source src="https://cdn.shopify.com/videos/c/o/v/acaa368f6520499cbf88f04fca3127a4.mp4" />
              </video>
            </div>
          </div>
          <div className="col-md-6 left-box">
            <form className="row align-items-center" onSubmit={handleSubmit}>
              <div className="header-text mb-4">
                <h2>Welcome back</h2>
                <p>We are happy to have you back.</p>
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
              <div className="input-group mb-1">
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
              <div className="input-group mb-3 mt-5">
			  {error && <div className="alert alert-danger" role="alert">{error}</div>}
                <button tpye ="button" className="btn btn-lg btn-primary w-100 fs-6">
                  Login
                </button>
              </div>
              <div className="row">
                <small>
                  Don't have account? <Link to="/signup">Sign Up</Link>
                </small>
              </div>
            </form>
          </div>
        </div>
      </div>
	  </body>
    </>
  );
};

export default Login;
