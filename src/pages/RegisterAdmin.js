import React from "react";
import { useState, useEffect, useContext } from "react";
import { Fragment } from "react";
import { Navigate } from "react-router-dom";
// import styled from "styled-components";
import Swal from "sweetalert2";
import { Container, Row, Col } from "react-grid-system";
import { Form, Button } from "react-bootstrap";

import UserContext from "../UserContext";

// const ContainerMain = styled.div`
//   height: 100vh;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

// const RegisterCard = styled.div`
//   width: 50%;
//   height: auto;
//   background-color: rgba(0, 0, 0, 0.3);
// `;

// const Button1 = styled.button`
//   width: 40%;
//   border: none;
//   padding: 15px 20px;
//   background-color: blue;
//   color: white;
//   cursor: pointer;
//   margin-bottom: 10;
// `;

// const Button2 = styled.button`
//   width: 40%;
//   border: none;
//   padding: 15px 20px;
//   background-color: maroon;
//   color: white;
//   margin-bottom: 10;
// `;

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
  function registerAdminUser(e) {
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
        joinAdmin: true,
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
            text: "Please wait our admins will review your application",
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
      mobileNumber.length === 11
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
      <Container>
        <Row>
          <Col sm={12}>
            <h1 className="text-center m-5" id="header">
              Join Gizbytes!
            </h1>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col sm={12} lg={6}>
            <Form onSubmit={(e) => registerAdminUser(e)}>
              <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label id="form-label">First Name*</Form.Label>
                <Form.Control
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="my-5" controlId="formGroupEmail">
                <Form.Label id="form-label">Last Name*</Form.Label>
                <Form.Control
                  id="form-control-register"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="my-5" controlId="formGroupEmail">
                <Form.Label id="form-label">Email*</Form.Label>
                <Form.Control
                  id="form-control-register"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="my-5" controlId="formGroupEmail">
                <Form.Label id="form-label">Contact Number*</Form.Label>
                <Form.Control
                  id="form-control-register"
                  type="string"
                  placeholder="09XX-XXX-XXXX"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="my-5" controlId="formGroupPassword1">
                <Form.Label id="form-label">Password*</Form.Label>
                <Form.Control
                  id="form-control-register"
                  type="password"
                  value={password1}
                  onChange={(e) => setPassword1(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="my-5" controlId="formGroupPassword1">
                <Form.Label id="form-label">Confirm Password*</Form.Label>
                <Form.Control
                  id="form-control-register"
                  type="password"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                  required
                />
              </Form.Group>
              {isActive ? (
                <div className="text-center">
                  {" "}
                  <Button id="register-button-active" type="submit">
                    Create Account
                  </Button>
                </div>
              ) : (
                <div className="text-center">
                  {" "}
                  <Button
                    id="register-button-inactive"
                    className="text-center"
                    type="submit"
                  >
                    Create Account
                  </Button>
                </div>
              )}
            </Form>
          </Col>
        </Row>
        <Row
          className="justify-content-md-center my-4 text-center"
          style={{ marginBottom: "10px", marginTop: "10px" }}
        >
          <Col sm={12} lg={6}>
            Already have an account? Click <a href="/login">here</a> to Login
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Register;
