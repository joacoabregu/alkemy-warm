import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Alert } from "react-bootstrap";
import Spinner from "../components/Spinner";
import { PostCreated } from "../types/interfaces";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const validate = (values: { title?: string; body?: string }) => {
  const errors: { title?: string; body?: string } = {};

  if (!values.title) {
    errors.title = "Requerido";
  }
  if (!values.body) {
    errors.body = "Requerido";
  }
  return errors;
};

export default function EditPost() {
  let [isError, setIsError] = useState<boolean>(false);
  let [postCreated, setPostCreated] = useState<PostCreated>();
  let [loading, setLoading] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      title: "",
      body: "",
    },
    validate,
    onSubmit: (values) => {
      setLoading(true);
      setIsError(false);
      axios
        .post("https://jsonplaceholder.typicode.com/posts/", values)
        .then((response) => {
          let data = response.data as PostCreated;
          setLoading(false);
          setPostCreated(data);
        })
        .catch((error) => {
          setLoading(false);
          setIsError(true);
        });
    },
  });

  return (
    <Container fluid="sm">
      <Row className="justify-content-center">
        <Col md={3}>
          <Form onSubmit={formik.handleSubmit} className="mb-3">
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Titulo</Form.Label>
              <Form.Control
                name="title"
                type="text"
                placeholder="Titulo"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
              />

              {formik.touched.title && formik.errors.title ? (
                <Form.Text>{formik.errors.title}</Form.Text>
              ) : null}
            </Form.Group>

            <Form.Group className="mb-3" controlId="body">
              <label className="form-label" htmlFor="body">
                Contenido del Post
              </label>
              <textarea
                className="form-control"
                id="body"
                {...formik.getFieldProps("body")}
              />

              {formik.touched.body && formik.errors.body ? (
                <Form.Text>{formik.errors.body}</Form.Text>
              ) : null}
            </Form.Group>
            <Button variant="primary" type="submit">
              Enviar
            </Button>
          </Form>
          {postCreated && (
            <Alert data-testid="alerta" variant="warning">
              Su post se ha creado con exito. Titulo: {postCreated.title}
              Contenido: {postCreated.body}
            </Alert>
          )}

          {loading && <Spinner />}

          {isError && (
            <Alert data-testid="alerta" variant="warning">
              Se ha producido un error al crear su post.
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
}
