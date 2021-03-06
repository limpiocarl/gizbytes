import React from "react";
import { Fragment, useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import "../App.css";

const OrderAccordion = () => {
  const [orders, setOrders] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);

  // Get paid items
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

  let paidOrders = [];
  orders.forEach((item) => {
    if (item.isPaid === true) {
      paidOrders.push(item);
    }
  });

  return (
    <Fragment>
      {isEmpty ? (
        <p>
          <i>(You have no previous orders.)</i>
        </p>
      ) : (
        <Fragment>
          <Accordion id="order-acc">
            {paidOrders.map((item) => (
              <Accordion.Item>
                <Accordion.Header id="order-acc-header">
                  Order ID: {item._id}
                </Accordion.Header>
                <Accordion.Body>
                  <p>Prodcut Name:{item.productName} </p>
                  <p>Product ID: {item.productId}</p>
                  <p>Unit Price: {item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Purchased On: {item.purchasedOn}</p>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderAccordion;
