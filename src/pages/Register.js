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

const RegisterCard = styled.div`
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

const Register = () => {
  //Construct necessary hooks and context

  const { user, setUser } = useContext(UserContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const [isActive, setIsActive] = useState(false);

  //Register Function
  function registerUser(e) {
    // Prevents page redirection via form submission
    e.preventDefault();

    fetch("https://glacial-woodland-05160.herokuapp.com/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password1,
        mobileNo: mobileNumber,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data === false) {
          Swal.fire({
            title: "Duplicate email found.",
            icon: "error",
            text: "Please provide a different email",
          });
        } else {
          Swal.fire({
            title: "Registration successful!",
            icon: "success",
            text: "Welcome to NOT.A.SCAM. click to login!",
          }).then((redirect) => {
            window.location = "/login";
          });
        }
      });

    //Clear all input fields
    setEmail("");
    setPassword1("");
    setPassword2("");
    setFirstName("");
    setLastName("");
    setMobileNumber("");
  }

  useEffect(() => {
    if (
      email !== "" &&
      password1 !== "" &&
      password2 !== "" &&
      firstName !== "" &&
      lastName !== "" &&
      mobileNumber !== "" &&
      password1 === password2 &&
      mobileNumber.length === 15
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [email, password1, password2, firstName, lastName, mobileNumber]);

  //Render register page
  return user.id !== null ? (
    <Navigate to="/" />
  ) : (
    <Fragment>
      <ContainerMain>
        <RegisterCard>
          <Container>
            <Row>
              <Col sm={12}>
                <h1>Register</h1>
              </Col>
            </Row>

            <Row>
              <Col sm={12}>
                <Form onSubmit={(e) => registerUser(e)}>
                  <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter first name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter last name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </Form.Group>

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

                  <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control
                      type="string"
                      placeholder="+639XX-XXX-XXXX"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formGroupPassword1">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={password1}
                      onChange={(e) => setPassword1(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formGroupPassword1">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm Password"
                      value={password2}
                      onChange={(e) => setPassword2(e.target.value)}
                      required
                    />
                  </Form.Group>

                  {isActive ? (
                    <Button1 type="submit">SIGNUP</Button1>
                  ) : (
                    <Button2 type="submit">SIGNUP</Button2>
                  )}
                </Form>
              </Col>
            </Row>
            <Row>
              <Col sm={12}></Col>
            </Row>
            <Row style={{ marginBottom: "10px", marginTop: "10px" }}>
              <Col sm={12}>
                Already have an account? Click <a href="/login">here</a> to
                Login
              </Col>
            </Row>
          </Container>
        </RegisterCard>
      </ContainerMain>
    </Fragment>
  );
};

export default Register;
