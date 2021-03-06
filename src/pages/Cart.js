import React from "react";
import { Fragment, useState, useEffect } from "react";
import { Table, Button, Form, Row, Col, Container } from "react-bootstrap";
import Swal from "sweetalert2";
import "../App.css";

const Cart = () => {
  //Orders
  const [orders, setOrders] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  let selectedIndex = [];
  let newTotal = 0;

  useEffect(() => {
    fetch(`https://fathomless-beyond-35679.herokuapp.com/orders/myOrders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.length === 0) {
          setIsEmpty(true);
        } else {
          setOrders(data);
        }
      });
  }, []);

  useEffect(() => {
    // eslint-disable-next-line array-callback-return
    orders.map((item) => {
      if (item.isPaid === false) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        newTotal = newTotal + item.price * item.quantity;
        setTotalPrice(newTotal);
      }
    });
  }, [orders]);

  // Counter of check box
  function handleCheckbox(event) {
    if (selectedIndex.length === 0) {
      selectedIndex.push(event.target.value);
    } else {
      let x = 0;
      selectedIndex.forEach((index) => {
        if (index === event.target.value) {
          selectedIndex.splice(x, 1);
        }
        x++;
      });
      if (x === selectedIndex.length) {
        selectedIndex.push(event.target.value);
      }
    }

    console.log(selectedIndex);
  }

  //Check out Function
  function checkOut(e) {
    e.preventDefault();
    console.log(`I'm checking out`);
    fetch(
      `https://fathomless-beyond-35679.herokuapp.com/orders/myOrders/checkOut`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          selectedIndex: selectedIndex,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data !== true) {
          Swal.fire({
            title: "Error",
            icon: "error",
            text: "Admins cannot check out products",
          });
        } else {
          Swal.fire({
            title: "Items checked out successfully",
            icon: "success",
            text: "Click to view your cart",
          }).then((redirect) => {
            window.location = "/cart";
          });
        }
      });
  }

  //Remove Item Function
  function removeItem(e) {
    e.preventDefault();
    console.log(`I'm removing you`);
    fetch(
      `https://fathomless-beyond-35679.herokuapp.com/orders/myOrders/remove`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          selectedIndex: selectedIndex,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data !== true) {
          Swal.fire({
            title: "Error",
            icon: "error",
            text: "Admins cannot check out products",
          });
        } else {
          Swal.fire({
            title: `You've successfully delete items from your cart.`,
            icon: "success",
            text: "Click to view your cart",
          }).then((redirect) => {
            window.location = "/cart";
          });
        }
      });
  }

  //Update Cart Function
  function updateCart(e) {
    e.preventDefault();
    fetch(
      `https://fathomless-beyond-35679.herokuapp.com/orders/myOrders/update`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          selectedIndex: selectedIndex,
          newQuantity: e.target.value,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data !== true) {
          Swal.fire({
            title: "Error",
            icon: "error",
            text: "Admins cannot check out products",
          });
        } else {
          Swal.fire({
            title: `You've successfully changed quantity.`,
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
      {isEmpty === true ? (
        <Fragment>
          <h1>Your Cart is Empty</h1>
          <h1>
            Click <a href="/products">here</a> to shop now
          </h1>
        </Fragment>
      ) : (
        <Container>
          <Row>
            <Col lg={12} className="text-center my-5">
              <h1 id="title-productsolo">Shopping Cart</h1>
            </Col>
          </Row>
          <Row>
            <Col lg={12} className="d-flex justify-content-center">
              <Form>
                <Table responsive id="table-cart">
                  <thead>
                    <tr>
                      <th colSpan={2}>Product</th>
                      <th>Unit Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((item) => (
                      <tr>
                        <td id="checkbox">
                          {item.isPaid ? (
                            <Form.Check type="checkbox" disabled />
                          ) : (
                            <Form.Check
                              type="checkbox"
                              name={item.productName}
                              value={orders.indexOf(item)}
                              onChange={(e) => handleCheckbox(e)}
                            />
                          )}
                        </td>
                        <td>{item.productName}</td>
                        <td>???{item.price}</td>
                        <td>
                          {item.isPaid ? (
                            <Form.Control
                              type="number"
                              defaultValue={item.quantity}
                              disabled
                            />
                          ) : (
                            <Form.Control
                              type="number"
                              name={orders.indexOf(item)}
                              defaultValue={item.quantity}
                              onChange={(e) => updateCart(e)}
                            />
                          )}
                        </td>
                        <td>{item.price * item.quantity} PHP</td>
                        <td>{item.isPaid ? `Paid` : `Pending Payment`}</td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan="2">
                        <b>Total Price:</b>
                      </td>
                      <td colSpan="5">
                        <b>???{totalPrice}</b>
                      </td>
                    </tr>
                  </tbody>
                </Table>
                <Fragment>
                  <Button
                    id="checkout-button"
                    className="py-2 px-4"
                    type="submit"
                    onClick={(e) => checkOut(e)}
                    key="1"
                  >
                    Check Out
                  </Button>
                  <Button
                    id="remove-button"
                    className="py-2 px-3"
                    type="submit"
                    onClick={(e) => removeItem(e)}
                    key="2"
                    style={{ marginLeft: "10px" }}
                  >
                    Remove Item
                  </Button>
                </Fragment>
              </Form>
            </Col>
          </Row>
        </Container>
      )}
    </Fragment>
  );
};

export default Cart;
