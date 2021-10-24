import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { PostPreviewProps } from "../types/interfaces";
import Col from "react-bootstrap/Col";

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
    <Col xs={12} md={6} xl={4} xxl={3} className="d-flex align-items-stretch">
      <Card style={{ width: "18rem" }} key={key} className="text-center mb-4 ">
        <Card.Body className="d-flex flex-column justify-content-between">
          <Card.Title className="mb-4 "> {post.title} </Card.Title>
          <div>
            <Card.Link className="btn btn-primary" href={url}>
              Ver más
            </Card.Link>
            <Card.Link className="btn btn-secondary m-1" href={editUrl}>
              Editar
            </Card.Link>
            {postDeleted ? (
              <Card.Text> El post se ha eliminado </Card.Text>
            ) : (
              <Button variant="danger" onClick={deletePost}>
                Eliminar
              </Button>
            )}
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}
