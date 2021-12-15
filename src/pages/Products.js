import React from "react";
import { Fragment, useEffect, useState } from "react";
import { Container, Row, Col } from "react-grid-system";
import ProductCard from "../components/ProductCardBrowse";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://fathomless-beyond-35679.herokuapp.com/products/all")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        setProducts(
          data.map((product) => {
            console.log(product);
            return <ProductCard key={product.id} productProp={product} />;
          })
        );
      });
  }, []);

  return (
    <Fragment>
      <Container style={{ marginTop: "20px", marginBottom: "20px" }}>
        <Row style={{ marginTop: "20px", marginBottom: "20px" }}>
          {products.map((item) => (
            <Col sm={3}>{item}</Col>
          ))}
        </Row>
      </Container>
    </Fragment>
  );
};

export default ProductsPage;
