import React, { useState } from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../App.css";
// import productbanner from "../bannerphotos/product-banner2.png";

const ProductCardBrowse = ({ productProp }) => {
  const { productName, description, price, _id, productImage1 } = productProp;

  const [isHovered, setHover] = useState(false);

  let navigate = useNavigate();

  function handleClick() {
    navigate(`/products/${_id}`);
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
                  src={`https://glacial-woodland-05160.herokuapp.com/${productImage1}`}
                  alt="No Image"
                  fluid
                />
                {isHovered && (
                  <Button id="hover-button" className="py-2 px-4">
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
