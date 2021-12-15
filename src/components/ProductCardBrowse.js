import React, { useState } from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../App.css";
import Swal from "sweetalert2";

const ProductCardBrowse = ({ productProp }) => {
  const { productName, description, price, _id, productImage1 } = productProp;

  const [isHovered, setHover] = useState(false);

  let navigate = useNavigate();

  function handleClick() {
    navigate(`/products/${_id}`);
  }

  // Add to cart function
  function addToCart(e) {
    e.preventDefault();

    fetch(
      `https://fathomless-beyond-35679.herokuapp.com/orders/${_id}/addtocart`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          productName: productName,
          price: price,
          quantity: 1,
          totalAmount: price,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data !== true) {
          Swal.fire({
            title: "Add to cart failed!",
            icon: "error",
            text: "Login first before adding to cart",
          });
        } else {
          Swal.fire({
            title: "Item added to cart successfully!",
            icon: "success",
            text: "Click to view your cart",
          });
        }
      });
  }

  return (
    <Container>
      {/* <Image src={productbanner} height={950} /> */}
      <Row>
        <Col>
          <Card id="card-product" className="my-3">
            <Card.Body className="text-center">
              <div
                className="p-4"
                id="img-product"
                onMouseOver={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
              >
                <Card.Img
                  onClick={handleClick}
                  variant="top"
                  id="image-product"
                  src={`https://fathomless-beyond-35679.herokuapp.com/${productImage1}`}
                  alt="No Image"
                  fluid
                />
                {isHovered && (
                  <Button
                    id="hover-button"
                    className="py-2 px-4"
                    onClick={(e) => addToCart(e)}
                  >
                    Add to cart
                  </Button>
                )}
              </div>
              <Card.Title id="title-product" className="my-4">
                {productName}
              </Card.Title>
              <Card.Text id="description-product">{description}</Card.Text>
              <Card.Text id="price-product">₱{price}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductCardBrowse;
