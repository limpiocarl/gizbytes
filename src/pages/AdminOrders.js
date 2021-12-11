import React from "react";
import { Fragment, useState, useEffect, useContext } from "react";
import {
  Table,
  Button,
  FloatingLabel,
  Form,
  FormControl,
} from "react-bootstrap";
import { Navigate } from "react-router-dom";
import styled from "styled-components";

import UserContext from "../UserContext";

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
  //To determine if admin or not
  const { user, setUser } = useContext(UserContext);

  //To set order list
  const [orders, setOrders] = useState([]);

  //To set search parameter
  const [search, setSearch] = useState("");
  const [searchParam, setSearchParam] = useState("");

  useEffect(() => {
    fetch(
      `https://glacial-woodland-05160.herokuapp.com/products/orders/allOrders`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
      });
  }, []);

  function agregateOrders(e) {
    console.log(e);
    if (e == 1) {
      fetch(
        `https://glacial-woodland-05160.herokuapp.com/products/orders/allOrders`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setOrders(data);
        });
    } else if (e == 2) {
      fetch(
        `https://glacial-woodland-05160.herokuapp.com/products/orders/allOrders/pending`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setOrders(data);
        });
    } else if (e == 3) {
      fetch(
        `https://glacial-woodland-05160.herokuapp.com/products/orders/allOrders/paid`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setOrders(data);
        });
    }
  }

  function searchOrders(e) {
    e.preventDefault();

    fetch(
      `https://glacial-woodland-05160.herokuapp.com/products/orders/allOrders/specific`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          search: search,
          searchParam: searchParam,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
      });
  }

  return user.isAdmin === false ? (
    <Navigate to="/" />
  ) : (
    <Fragment>
      <ContainerMain>
        <ContainerTop>
          <FloatingLabel controlId="floatingSelectGrid" label="Sort Products">
            <Form.Select onChange={(e) => agregateOrders(e.target.value)}>
              <option value="1">All Orders</option>
              <option value="2">Pending Orders</option>
              <option value="3">Paid Orders</option>
            </Form.Select>
          </FloatingLabel>
          <Form className="d-flex">
            <Form.Select
              className="mx-3"
              onChange={(e) => setSearchParam(e.target.value)}
            >
              <option>Set Search Parameter</option>
              <option value="._id">Order ID</option>
              <option value="productId">Product ID</option>
              <option value="purchasedBy">Purchased By</option>
            </Form.Select>
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button
              variant="outline-success"
              type="submit"
              onClick={(e) => searchOrders(e)}
            >
              Search
            </Button>
          </Form>
        </ContainerTop>

        <Form>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Product Name</th>
                <th>Product ID</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total Amount</th>
                <th>Purchased By</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((item) => (
                <tr>
                  <td>{item._id}</td>
                  <td>{item.productName}</td>
                  <td>{item.productId}</td>
                  <td>{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>{item.totalAmount}</td>
                  <td>{item.purchasedBy}</td>
                  <td>{item.isPaid ? `Payment Received` : `Not yet paid.`}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Form>
      </ContainerMain>
    </Fragment>
  );
};

export default AdminProducts;
