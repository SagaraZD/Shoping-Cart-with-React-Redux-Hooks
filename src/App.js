import "./App.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  ButtonGroup,
  Modal,
  ListGroup,
} from "react-bootstrap";

import { addToCart, clearCart } from "./productReducer";

function App() {
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState([]);
  const [type, setType] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const currentCart = useSelector((state) => state.products.cart);

  const getList = () => {
    return fetch(
      "https://my-json-server.typicode.com/prasadhewage/ecommerce/shipments"
    ).then((data) => data.json());
  };

  useEffect(() => {
    let mounted = true;
    getList().then((items) => {
      if (mounted) {
        setProducts(items);
        setFiltersFromData(items);
      }
    });
    return () => (mounted = false);
  }, []);

  const setFiltersFromData = (items) => {
    let filters = [];
    items.map(function (item, i) {
      if (!filters.includes(item.details.size)) {
        filters.push(item.details.size);
      }
    });
    setFilters(filters);
  };

  const addToCardHandle = (item) => {
    if (!currentCart.includes(item)) {
      dispatch(addToCart(item));
    }
  };

  const clear = () => {
    if (currentCart) {
      dispatch(clearCart());
      setShow(false);
    }
  };

  const getTotal = () => {
    let total = 0;
    currentCart.map((item) => {
      total = total + item.details.price;
    });
    return parseFloat(total);
  };

  const sizeFilter = () => {
    if (type) {
      return products.map(
        (item, i) =>
          item.details.size == type && (
            <Col md={4} key={i}>
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={item.details.image} />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>
                    Price: {item.details.price} <br />
                    size: {item.details.size}
                  </Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => addToCardHandle(item)}
                  >
                    Add to Cart
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          )
      );
    } else {
      return products.map((item, i) => (
        <Col md={4} key={i}>
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={item.details.image} />
            <Card.Body>
              <Card.Title>{item.name}</Card.Title>
              <Card.Text>
                Price: {item.details.price} <br />
                size: {item.details.size}
              </Card.Text>
              <Button variant="primary" onClick={() => addToCardHandle(item)}>
                Add to Cart
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ));
    }
  };

  return (
    <div className="App">
      <Container>
        <div className="header">
          <h1>
            {" "}
            <b> Online Store </b>{" "}
          </h1>
          <div className="cart" onClick={handleShow}>
            <i className="fa">&#xf07a;</i>
            <span className="badge badge-warning" id="lblCartCount">
              {currentCart.length}
            </span>
          </div>
        </div>
        <Row>
          <Col md={3}>
            <ButtonGroup aria-label="Basic example">
              {filters.map((item, i) => (
                <div key={i}>
                  <Button
                    key={i}
                    variant="secondary"
                    onClick={() => setType(item)}
                  >
                    {item}
                  </Button>
                </div>
              ))}
            </ButtonGroup>
            <ButtonGroup aria-label="Basic example">
              <Button variant="secondary" onClick={() => setType("")}>
                all
              </Button>
            </ButtonGroup>
          </Col>
          <Col md={9}>
            <Row>{sizeFilter()}</Row>
          </Col>
        </Row>
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Bag</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup variant="flush">
            {currentCart &&
              currentCart.map((item, key) => (
                <ListGroup.Item key={key}>
                  {item.name} <b>{item.details.price}</b>
                </ListGroup.Item>
              ))}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => clear()}>
            Clear
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Go to checkout
          </Button>
          <p>
            <b>Total:</b> {getTotal()}
          </p>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
