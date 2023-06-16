import { Link } from "react-router-dom";
import logo from "../images/Ginago.png";
import dummyimg from "../images/dummyimage.png";
function Navbar() {
  const onClickAdd = () => {
    window.location = "/add";
  };
  const onClickDisplay = () => {
    window.location = "/displayproducts";
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logging out!");
    window.location.reload();
  };

  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-light pe-5">
        <div class="container-fluid">
          <button
            class="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i class="fas fa-bars"></i>
          </button>
          <div class="navbar-brand mt-3">
            <img src={logo} height="35" alt="YG Clothing" loading="lazy" />
          </div>

          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <Link to="/" className="nav-link active">
                Home
              </Link>
            </li>
            <li class="nav-item">
              <Link to="/display" className="nav-link">
                Shop
              </Link>
            </li>
            <li class="nav-item">
              <Link to="/" className="nav-link">
                About
              </Link>
            </li>
          </ul>
        </div>

        <div class="dropdown" data-bs-toggle="dropdown" aria-expanded="false">
          <Link
            to="/"
            class="dropdown-toggle d-flex align-items-center hidden-arrow"
            id="navbarDropdownMenuAvatar"
            role="button"
            data-mdb-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src={dummyimg}
              class="rounded-circle"
              height="25"
              alt="Black and White Portrait of a Man"
              loading="lazy"
            />
          </Link>
          <ul
            class="dropdown-menu dropdown-menu-end"
            aria-labelledby="navbarDropdownMenuAvatar"
          >
            <li>
              <Link to="/add" onClick={onClickAdd} class="dropdown-item">
                Add Product
              </Link>
            </li>
            <li>
              <Link
                to="/displayproducts"
                onClick={onClickDisplay}
                class="dropdown-item"
              >
                Display Products
              </Link>
            </li>
            <li>
              <Link class="dropdown-item" onClick={handleLogout}>
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
