import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { useParams } from "react-router-dom";
import { Post as PostInterface } from "../types/interfaces";
import Spinner from "../components/Spinner";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Post() {
  let [post, setPost] = useState<PostInterface>();
  let [error, setError] = useState(false);

  let { id } = useParams<{ id: string }>();

  useEffect(() => {
    let url = "https://jsonplaceholder.typicode.com/posts/" + id;
    axios
      .get(url)
      .then((response) => {
        let result = response.data as PostInterface;

        setPost(result);
      })
      .catch((error) => {
        setError(true);
      });
  }, [id]);

  if (error) {
    return <div>No se ha encontrado el post buscado</div>;
  }
  if (!post) {
    return <Spinner />;
  }
  return (
    <Container fluid="sm">
      <Row className="justify-content-center">
        <Col md={3}>
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title> {post.title} </Card.Title>
              <Card.Text>{post.body}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
