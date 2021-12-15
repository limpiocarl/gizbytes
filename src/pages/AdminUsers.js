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
import Swal from "sweetalert2";

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

const AdminUsers = () => {
  //To determine if admin or not
  const { user, setUser } = useContext(UserContext);

  //Set pending users list
  const [users, setUsers] = useState([]);

  //To set search parameter
  const [search, setSearch] = useState("");
  const [searchParam, setSearchParam] = useState("");

  useEffect(() => {
    fetch(`https://fathomless-beyond-35679.herokuapp.com/users/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);

  function searchUsers(e) {
    e.preventDefault();

    fetch(`https://fathomless-beyond-35679.herokuapp.com/users/specific`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        search: search,
        searchParam: searchParam,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  }

  function agregateUsers(e) {
    console.log(e);
    if (e === 1) {
      fetch(`https://fathomless-beyond-35679.herokuapp.com/users/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUsers(data);
        });
    } else if (e === 2) {
      fetch(`https://fathomless-beyond-35679.herokuapp.com/users/admins`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUsers(data);
        });
    } else if (e === 3) {
      fetch(`https://fathomless-beyond-35679.herokuapp.com/users/customers`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUsers(data);
        });
    } else if (e === 4) {
      fetch(
        `https://fathomless-beyond-35679.herokuapp.com/users/pendingAdmins`,
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
          setUsers(data);
        });
    }
  }

  function setAdminUser(x) {
    fetch(`https://fathomless-beyond-35679.herokuapp.com/users/setAdminUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        user: x,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data === true) {
          Swal.fire({
            title: `You've successfully change user to admin!`,
            icon: "success",
            text: "Click to return to users page",
          }).then((redirect) => {
            window.location = "/adminUsers";
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

  return user.isAdmin === false ? (
    <Navigate to="/" />
  ) : (
    <Fragment>
      <ContainerMain>
        <ContainerTop>
          <FloatingLabel controlId="floatingSelectGrid" label="Sort Users">
            <Form.Select onChange={(e) => agregateUsers(e.target.value)}>
              <option value="1">All User</option>
              <option value="2">Admin Users</option>
              <option value="3">Customer Users</option>
              <option value="4">Pending Admin Users</option>
            </Form.Select>
          </FloatingLabel>
          <Form className="d-flex">
            <Form.Select
              className="mx-3"
              onChange={(e) => setSearchParam(e.target.value)}
            >
              <option>Set Search Parameter</option>
              <option value="._id">User ID</option>
              <option value="userEmail">User Email</option>
            </Form.Select>
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button
              id="search-button"
              type="submit"
              onClick={(e) => searchUsers(e)}
            >
              Search
            </Button>
          </Form>
        </ContainerTop>

        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Full Name</th>
              <th>email</th>
              <th>Mobile Number</th>
              <th>Type of User</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item) => (
              <tr>
                <td>{item._id}</td>
                <td>
                  {item.firstName} {item.lastName}
                </td>
                <td>{item.email}</td>
                <td>{item.mobileNo}</td>
                <td>
                  {item.isAdmin ? (
                    `Admin`
                  ) : item.joinAdmin ? (
                    <Form.Select
                      type="boolean"
                      onChange={(e) => setAdminUser(item._id)}
                    >
                      <option value="true">Admin Request Pending</option>
                      <option value="false">Make Admin</option>
                    </Form.Select>
                  ) : (
                    `Customer`
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </ContainerMain>
    </Fragment>
  );
};

export default AdminUsers;
