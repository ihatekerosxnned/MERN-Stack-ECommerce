import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"; // Import useParams
import axios from "axios";
import Navbar from "../Navigation/Navigation";
import img1 from "../images/1.jpg";
import img2 from "../images/D1.png";
import img3 from "../images/2.jpg";

function DisplayDetails() {
  const [product, setProduct] = useState({});
  const { productId } = useParams(); // Destructure productId from useParams

  useEffect(() => {
    axios
      .get(`http://localhost:8080/products/${productId}`)
      .then((response) => {
        const data = response.data;
        setProduct(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [productId]);

  return (
    <>
      <Navbar />
      <main class="mt-5 pt-4">
        <div class="container mt-5">
          <div class="row h-100">
            <div
              class="col-md-6 mb-4"
              style={{
                backgroundImage: `url(http://localhost:8080/uploads/${product.image})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            ></div>

            <div class="col-md-6 mb-4">
              <div class="p-4">
                <div class="mb-3">
                  <Link>
                    <span class="badge bg-info me-1">New</span>
                  </Link>
                  <Link>
                    <span class="badge bg-danger me-1">Bestseller</span>
                  </Link>
                </div>
                <strong>
                  <p className="fs-2">
                    {product.product_name}
                    <h6 className="mb-3 price fs-6">{product.status}</h6>
                  </p>
                </strong>
                <p class="lead">
                  <span>$ {product.product_price}</span>
                </p>
                <strong>
                  <p className="fs-4">Category</p>
                </strong>
                <p>{product.product_category}</p>
                <strong>
                  <p className="fs-5">Description</p>
                </strong>
                <p>{product.product_description}</p>

                <form class="d-flex justify-content-left">
                  <div class="form-outline me-1" style={{ width: 100 }}>
                    <input type="number" value="1" class="form-control" />
                  </div>
                  <button class="btn btn-outline-dark" type="submit">
                    Add to cart
                  </button>
                </form>
              </div>
            </div>
          </div>

          <hr />

          <div class="row d-flex justify-content-center">
            <div class="col-md-6 text-center">
              <h4 class="my-4 h4">Additional information</h4>

              <p>
                Please allow 5-15 business days to process orders. Once order is
                shipped you will receive a tracking number via email. Please
                allow 2-5 days to arrive once shipped for domestic shipments and
                an additional 10-15 days for international shipments. We are not
                responsible for any lost or stolen packages. If you have any
                questions regarding your order email info@yotgngo.com
              </p>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-4 col-md-12 mb-4">
              <img src={img1} class="img-fluid" alt="" />
            </div>

            <div class="col-lg-4 col-md-6 mb-4">
              <img src={img2} class="img-fluid" alt="" />
            </div>

            <div class="col-lg-4 col-md-6 mb-4">
              <img src={img3} class="img-fluid" alt="" />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default DisplayDetails;
