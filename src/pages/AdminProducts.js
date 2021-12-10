import React from "react";
import { Fragment, useState, useEffect, useContext } from "react";
import {
  Table,
  Button,
  FloatingLabel,
  Form,
  FormControl,
  Modal,
} from "react-bootstrap";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";

import UserContext from "../UserContext";

import axios from "axios";

const ContainerMain = styled.div`
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
  flex-direction: column;
`;
const ContainerTop = styled.div`
  margin-bottom: 20px;
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const AdminProducts = () => {
  // modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //to set product list
  const [products, setProducts] = useState([]);

  //To determine if admin or not
  const { user, setUser } = useContext(UserContext);

  //Get all products
  useEffect(() => {
    fetch(`https://glacial-woodland-05160.herokuapp.com/products/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, [products]);

  //update product function
  function archiveProduct(x, y) {
    fetch(`https://glacial-woodland-05160.herokuapp.com/archive`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        isActive: x,
        productId: y,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data === true) {
          Swal.fire({
            title: `You've successfully change product status`,
            icon: "success",
            text: "Click to return to products page",
          }).then((redirect) => {
            window.location = "/adminProducts";
          });
        } else {
          Swal.fire({
            title: "Error",
            icon: "error",
            text: "Something happened.",
          });
        }
      });
  }

  // Form Data
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [productImage1, setProductImage1] = useState("");
  const [productImage2, setProductImage2] = useState("");
  const [stocks, setStocks] = useState("");

  const changeOnClick = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("stocks", stocks);
    formData.append("productImage1", productImage1);
    formData.append("productImage2", productImage2);

    setProductName("");
    setDescription("");
    setPrice("");
    setStocks(0);

    axios
      .post(
        "https://glacial-woodland-05160.herokuapp.com/products/add",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => res.data)
      .then((data) => {
        if (data === true) {
          alert("Success");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return user.isAdmin === false ? (
    <Navigate to="/" />
  ) : (
    <Fragment>
      <ContainerMain>
        <ContainerTop>
          <FloatingLabel controlId="floatingSelectGrid" label="Sort Products">
            <Form.Select aria-label="Floating label select example">
              <option>Sort this product by</option>
              <option value="1">Active Products</option>
              <option value="2">Archived Products</option>
              <option value="3">Zero Stocks</option>
              <option value="4">Phone Brand</option>
            </Form.Select>
          </FloatingLabel>

          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </ContainerTop>

        <Form>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Stocks</th>
                <th>Added</th>
                <th>Updated</th>
                <th className="col-2">Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => (
                <tr>
                  <td>{item._id}</td>
                  <td>{item.productName}</td>
                  <td>{item.price}</td>
                  <td>{item.stocks}</td>
                  <td>
                    by: {item.addedBy} <br /> on: {item.addedOn}
                  </td>
                  <td>
                    {item.updatedBy == null
                      ? `Not yet updated before.`
                      : `by: ${item.updatedBy} on: ${item.updatedOn}`}
                  </td>
                  <td>
                    {item.isActive ? (
                      <Form.Select
                        type="boolean"
                        onChange={(e) =>
                          archiveProduct(e.target.value, item._id)
                        }
                      >
                        <option value="true">Active</option>
                        <option value="false">Inactive</option>
                      </Form.Select>
                    ) : (
                      <Form.Select
                        type="boolean"
                        onChange={(e) =>
                          archiveProduct(e.target.value, item._id)
                        }
                      >
                        <option value="false">Inactive</option>
                        <option value="true">Active</option>
                      </Form.Select>
                    )}
                  </td>
                  <td>
                    <Button variant="secondary">Update Product</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Form>
        <Button variant="primary" onClick={handleShow}>
          Add Product
        </Button>

        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={changeOnClick} encType="multipart/form-data">
              <Form.Group className="py-3">
                <Form.Label>Name:</Form.Label>
                <Form.Control
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="py-3">
                <Form.Label>Description:</Form.Label>
                <Form.Control
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="py-3">
                <Form.Label>Price:</Form.Label>
                <Form.Control
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="py-3">
                <Form.Label>Stocks:</Form.Label>
                <Form.Control
                  type="text"
                  value={stocks}
                  onChange={(e) => setStocks(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Upload Image1:</Form.Label>
                <Form.Control
                  type="file"
                  name="productImage1"
                  className="form-control-file"
                  onChange={(e) => setProductImage1(e.target.files[0])}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Upload Image2:</Form.Label>
                <Form.Control
                  type="file"
                  name="productImage2"
                  className="form-control-file"
                  onChange={(e) => setProductImage2(e.target.files[0])}
                />
              </Form.Group>
              <Button type="submit" className="btn btn-primary my-4">
                Add Product
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </ContainerMain>
    </Fragment>
  );
};

export default AdminProducts;
