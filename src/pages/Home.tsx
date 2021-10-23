import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { Post } from "../types/interfaces";
import PostPreview from "../components/PostPreview";
import Spinner from "../components/Spinner";

export default function Home() {
  let [posts, setPosts] = useState<Post[]>();
  let [error, setError] = useState(false);

  useEffect(() => {
    let url = "https://jsonplaceholder.typicode.com/posts";
    axios
      .get(url)
      .then((response) => {
        let result = response.data as Post[];
        setPosts(result);
      })
      .catch((error) => {
        setError(true);
      });
  });

  if (error) {
    return <div>Se ha producido un error. Intentelo más tarde.</div>;
  }

  if (!posts) {
    return <Spinner />;
  }

  return (
    <>
      <Container>
        <Row>
          <Col>
            {posts.map((post, index) => {
              return <PostPreview post={post} key={index} />;
            })}
          </Col>
        </Row>
      </Container>
    </>
  );
}
