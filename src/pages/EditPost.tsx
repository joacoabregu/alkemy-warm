import React, { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Post } from "../types/interfaces";
import Spinner from "../components/Spinner";

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
  let [errorSubmitting, setErrorSubmitting] = useState<boolean>(false);
  let [post, setPost] = useState<Post>();
  let [errorServer, setErrorServer] = useState(false);
  let [postUpdated, setPostUpdated] = useState<Post>();
  let [loading, setLoading] = useState<boolean>(false);
  let [formikValues, setFormikValues] = useState<{
    title?: string;
    body?: string;
  }>({ title: "", body: "" });

  let { id } = useParams<{ id: string }>();
  let url = "https://jsonplaceholder.typicode.com/posts/" + id;

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        let result = response.data as Post;
        setPost(result);
        setFormikValues({ title: result.title, body: result.body });
      })
      .catch((error) => {
        setErrorServer(true);
      });
  }, [url, id]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      ...formikValues,
    },
    validate,
    onSubmit: (values) => {
      setLoading(true);
      setErrorSubmitting(false);
      axios
        .patch(url, values)
        .then((response) => {
          let data = response.data as Post;
          setLoading(false);
          setPostUpdated(data);
          setFormikValues({ title: data.title, body: data.body });
        })
        .catch((error) => {
          setLoading(false);
          setErrorSubmitting(true);
        });
    },
  });

  if (!post) {
    return <Spinner />;
  }

  if (errorServer) {
    <div> Se ha producido un error al buscar el post solicitado. </div>;
  }

  return (
    <>
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
          <label htmlFor="body">Contenido del Post</label>

          <textarea id="body" {...formik.getFieldProps("body")} />

          {formik.touched.body && formik.errors.body ? (
            <Form.Text>{formik.errors.body}</Form.Text>
          ) : null}
        </Form.Group>
        <Button variant="primary" type="submit">
          Enviar
        </Button>
      </Form>

      {postUpdated && (
        <Alert data-testid="alerta" variant="warning">
          Su post se ha creado con exito. Titulo: {postUpdated.title}
          Contenido: {postUpdated.body}
        </Alert>
      )}

      {loading && <Spinner />}

      {errorSubmitting && (
        <Alert data-testid="alerta" variant="warning">
          Se ha producido un error al actulizar los datos de su post
        </Alert>
      )}
    </>
  );
}
