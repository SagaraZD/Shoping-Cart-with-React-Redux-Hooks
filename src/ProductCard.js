import React from "react";
import {
  Col,
  Button,
  Card
} from "react-bootstrap";

export default function ProductCard(item, key) {
  return (
    <Col md={4} key={key}>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={item.details.image} />
        <Card.Body>
          <Card.Title>{item.name}</Card.Title>
          <Card.Text>
            Price: {item.details.price} <br />
            size: {item.details.size}
          </Card.Text>
          <Button variant="primary">Add to Cart</Button>
        </Card.Body>
      </Card>
    </Col>
  );
}
