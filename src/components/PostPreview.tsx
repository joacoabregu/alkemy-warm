import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { PostPreviewProps } from "../types/interfaces";

export default function PostPreview({ post, key }: PostPreviewProps) {
  let [postDeleted, setPostDeleted] = useState(false);
  let url = "/detalle/" + post.id.toString();
  let editUrl = "/detalle/edit/" + post.id.toString();

  async function deletePost() {
    let deleteUrl =
      "https://jsonplaceholder.typicode.com/posts/" + post.id.toString();
    axios
      .delete(deleteUrl)
      .then((response) => {
        setPostDeleted(true);
      })
      .catch((err) => {
        console.log("error :" + err);
      });
  }

  return (
    <Card style={{ width: "18rem" }} key={key}>
      <Card.Body>
        <Card.Title> {post.title} </Card.Title>

        <Card.Link href={url}>Ver más</Card.Link>
        <Card.Link href={editUrl}>Editar</Card.Link>
        {postDeleted ? (
          <Card.Text> El post se ha eliminado </Card.Text>
        ) : (
          <Button variant="primary" onClick={deletePost}>
            Eliminar
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}
