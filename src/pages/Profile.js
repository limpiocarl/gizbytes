import React from "react";
import { Fragment, useContext } from "react";
import UserContext from "../UserContext";
import { Navigate } from "react-router-dom";
// import styled from "styled-components";
import Orders from "../components/OrderAccordion";
import { Container } from "react-grid-system";
import { Row, Col } from "react-bootstrap";
import "../App.css";

// const Container = styled.div`
// 	height: auto;
// 	display: flex;
// 	align-items: start;
// 	flex-direction:column;
// `

const Profile = () => {
  const { user } = useContext(UserContext);

  return user.id === null ? (
    <Navigate to="/" />
  ) : (
    <Fragment>
      <Container>
        <Row>
          <Col sm={12} className="text-center mt-5">
            <h1 id="profile-header">User Profile</h1>
          </Col>
        </Row>
        <Row>
          <Col sm={12} className="my-4">
            {" "}
            <p id="profile-sub">
              Name: {user.firstName} {user.lastName}
            </p>
            <p id="profile-sub">Email: {user.email}</p>
            {/* <p>
              (Is this still your email? Click <a href="/">here</a> to change.)
            </p> */}
          </Col>
        </Row>
        <p id="profile-sub">Order Summary:</p>
        <Orders />
      </Container>
    </Fragment>
  );
};

export default Profile;
