import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "../components/Form";

export default function Login() {
  return (
    <Container fluid="sm">
      <Row className="justify-content-center">
        <Col md={3}>
          <Form />
        </Col>
      </Row>
    </Container>
  );
}
