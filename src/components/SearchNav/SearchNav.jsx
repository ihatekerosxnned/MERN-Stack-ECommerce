import React from "react";
import { Link } from "react-router-dom";

function SearchNav() {
  return (
    <div className="container w-75">
      <nav className="navbar navbar-expand-lg navbar-dark mt-3 mb-5 shadow p-2 bg-color">
        <div className="container-fluid">
          <div className="navbar-brand">
            <Link to="/display" className="navbar-brand">
              Our Products
            </Link>
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
                <Link to="/displayshirts" className="nav-link">
                  Shirts
                </Link>
              </li>
              <li className="nav-item active" key="all">
                <Link to="/displayshorts" className="nav-link">
                  Shorts
                </Link>
              </li>
            </ul>
            <form className="w-auto py-1 d-flex">
              <input
                type="search"
                className="form-control rounded-0"
                placeholder="Search"
                aria-label="Search"
              />
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default SearchNav;
