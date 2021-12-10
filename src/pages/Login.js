import React from "react";
import { useState, useEffect, useContext } from "react";
import { Fragment } from "react";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";
import { Container, Row, Col } from "react-grid-system";
import { Form } from "react-bootstrap";

import UserContext from "../UserContext";

const ContainerMain = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginCard = styled.div`
  width: 50%;
  height: auto;
  background-color: rgba(0, 0, 0, 0.3);
`;

const Button1 = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: blue;
  color: white;
  cursor: pointer;
  margin-bottom: 10;
`;

const Button2 = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: maroon;
  color: white;
  margin-bottom: 10;
`;

const Login = () => {
  //Function Code
  const { user, setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isActive, setIsActive] = useState(false);

  function authenticate(e) {
    e.preventDefault();

    fetch("https://glacial-woodland-05160.herokuapp.com/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("gumana fetch");
        if (data === false) {
          Swal.fire({
            title: "Authentication failed.",
            icon: "error",
            text: "Check your login details",
          });
        } else {
          localStorage.setItem("token", data.access);
          retrieveUserDetails(data.access);
          console.log(data);

          Swal.fire({
            title: "Login successful!",
            icon: "success",
            text: "Welcome to Gizbytes",
          });
          /*.then(redirect => {
					window.location = "/"
				})*/
        }
      });

    setEmail("");
    setPassword("");
  }

  const retrieveUserDetails = (token) => {
    console.log(token);
    fetch("https://glacial-woodland-05160.herokuapp.com/users/details", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUser({
          id: data.id,
          isAdmin: data.isAdmin,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
        });
      });
  };

  useEffect(() => {
    if (email !== "" && password !== "") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [email, password]);

  //Render Login Page
  return user.id !== null ? (
    <Navigate to="/" />
  ) : (
    <Fragment>
      <ContainerMain>
        <LoginCard>
          <Container>
            <Row>
              <Col sm={12}>
                <h1>Login</h1>
              </Col>
            </Row>

            <Row>
              <Col sm={12}>
                <Form onSubmit={(e) => authenticate(e)}>
                  <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>

                  {isActive ? (
                    <Button1 type="submit">LOGIN</Button1>
                  ) : (
                    <Button2 type="submit">LOGIN</Button2>
                  )}
                </Form>
              </Col>
            </Row>
            <Row>
              <Col sm={12}></Col>
            </Row>
            <Row style={{ marginBottom: "10px", marginTop: "10px" }}>
              <Col sm={12}>Forgot your password?</Col>
            </Row>
            <Row style={{ marginBottom: "10px" }}>
              <Col sm={12}>Don't have an account yet?</Col>
            </Row>
          </Container>
        </LoginCard>
      </ContainerMain>
    </Fragment>
  );
};

export default Login;
