import React from "react";
import { Fragment, useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import styled from "styled-components";
import { Container, Row, Col } from "react-grid-system";
import { Form } from "react-bootstrap";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

const ContainerStyled = styled.div`
  height: 100vh;
  display: flex;
  align-items: start;
  justify-content: center;
  flex-direction: column;
  width: 75vw;
`;

const Info = styled.div`
  font-size: 24px;
`;

const InfoQ = styled.div`
  font-size: 24px;
  display: flex;
`;

const Button = styled.button`
  margin-top: 20px;
  width: 100%;
  height: 100px;
  background-color: blue;
  color: white;
  font-size: 24px;
`;
const Product = () => {
  //Construct necessary hooks
  const { productId } = useParams();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    console.log(productId);

    fetch(`https://glacial-woodland-05160.herokuapp.com/products/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setName(data.productName);
        setDescription(data.description);
        setPrice(data.price);
        setStock(data.stocks);
        setTotal(data.price);
      });
  }, [productId]);

  useEffect(() => {
    setTotal(price * quantity);
    if (quantity < 1) {
      setQuantity(1);
    } else if (quantity > stock) {
      setQuantity(stock);
    }
  }, [quantity, price, stock]);

  // Add to cart Function
  function addToCart(e) {
    e.preventDefault();

    fetch(
      `https://glacial-woodland-05160.herokuapp.com/orders/${productId}/addtocart`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          productName: name,
          price: price,
          quantity: quantity,
          totalAmount: total,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
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
          }).then((redirect) => {
            window.location = "/cart";
          });
        }
      });
  }

  return (
    <Fragment>
      <ContainerStyled>
        <Container>
          <Row>
            <Col sm={12}>
              <h1>{name}</h1>
            </Col>
          </Row>
          <Row>
            <Col sm={8}>
              <ProductCard />
            </Col>
            <Col sm={4}>
              <Info>Price: {price} PHP</Info>
              <Info>Stocks Left: {stock}</Info>
              <InfoQ style={{ marginBottom: "20px" }}>
                <Info>Quantity : </Info>
                <Form onSubmit={(e) => addToCart(e)}>
                  <Form.Control
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                  <Button type="submit">Add To Cart</Button>
                </Form>
              </InfoQ>
              <Info>Total Price:</Info>
              <h1> {total} PHP</h1>
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <h1>See Product Reviews:</h1>
            </Col>
          </Row>
        </Container>
      </ContainerStyled>
    </Fragment>
  );
};

export default Product;
