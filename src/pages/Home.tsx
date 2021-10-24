import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
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
    <Container>
      <Row className="bg-light p-5 mt-5 mb-3 position-relative justify-content-center">
        {posts.map((post, index) => {
          return <PostPreview post={post} key={index} />;
        })}
      </Row>
    </Container>
  );
}
