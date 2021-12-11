import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import { Table, Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";

const ContainerMain = styled.div`
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
  flex-direction: column;
`;

const AdminUpdateProduct = () => {
  const { productId } = useParams();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [isActive, setIsActive] = useState(0);

  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newPrice, setNewPrice] = useState(0);
  const [newStock, setNewStock] = useState(0);

  useEffect(() => {
    fetch(`https://glacial-woodland-05160.herokuapp.com/products/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setNewName(data.productName);
        setName(data.productName);
        setDescription(data.description);
        setNewDesc(data.description);
        setPrice(data.price);
        setNewPrice(data.price);
        setStock(data.stocks);
        setNewStock(data.stocks);
        setIsActive(data.isActive);
      });
  }, [productId]);

  useEffect(() => {
    if (newStock < 1) {
      setNewStock(1);
    }
    if (newPrice < 1) {
      setNewPrice(1);
    }
  }, [newStock, newPrice]);

  function updateProduct(e) {
    e.preventDefault();

    fetch(
      `https://glacial-woodland-05160.herokuapp.com/products/${productId}/update`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          productName: newName,
          description: newDesc,
          price: newPrice,
          stocks: newStock,
          isActive: isActive,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data === true) {
          Swal.fire({
            title: "Item updated successfully!",
            icon: "success",
            text: "Click to view updated product",
          }).then((redirect) => {
            window.location = `/adminProducts/${productId}`;
          });
        } else {
          Swal.fire({
            title: "Item update failed!",
            icon: "error",
            text: "Something went wrong",
          });
        }
      });
  }

  return (
    <ContainerMain>
      <h1>Update Product</h1>
      <Form onSubmit={(e) => updateProduct(e)}>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Stocks</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{name}</td>
              <td>{description}</td>
              <td>{price}</td>
              <td>{stock}</td>
            </tr>

            <tr>
              <td>
                <Form.Control
                  type="text"
                  placeholder="Input New Product Name"
                  onChange={(e) => setNewName(e.target.value)}
                />
              </td>
              <td>
                <Form.Control
                  type="text"
                  placeholder="Input New Product Description"
                  onChange={(e) => setNewDesc(e.target.value)}
                />
              </td>
              <td>
                <Form.Control
                  type="number"
                  placeholder="New Price"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                />
              </td>
              <td>
                <Form.Control
                  type="number"
                  placeholder="New Stocks"
                  value={newStock}
                  onChange={(e) => setNewStock(e.target.value)}
                />
              </td>
            </tr>
          </tbody>
        </Table>
        <Button variant="dark" type="submit">
          Update Product
        </Button>
      </Form>
    </ContainerMain>
  );
};

export default AdminUpdateProduct;
