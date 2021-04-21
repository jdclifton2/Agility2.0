import React, {useEffect, useState} from "react";
import {Button, Col, Form, Modal, Row} from 'react-bootstrap';

function AddCard(props) {

    const handleSubmit = (event) => {
        event.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                title: event.target.title.value,
                description: event.target.description.value,
                comment: event.target.comment.value,
                column: props.listID
            })
        };
        fetch('http://localhost:8000/api/cards/', requestOptions)
            .then(response => response.json())

        handleOnClick(requestOptions.body)

    }

    const handleOnClick = (card) => {
        props.modalClosed()
        props.updatestate2(card)
    }

    return (
            <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header style={{backgroundColor: "#592C99"}} closeButton>
            <Modal.Title style={{color: "#CDAB7D"}} id="contained-modal-title-vcenter">
              Create New Card
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{backgroundColor: "#CDAB7D"}}>
              <Row>
                  <Col sm={6}>
                      <Form onSubmit={handleSubmit}>
                          <Form.Group controlId="title">
                              <Form.Label>Title</Form.Label>
                              <Form.Control
                                type="text"
                                name="title"
                                required
                                placeholder="Card Title"/>
                          </Form.Group>

                          <Form.Group controlId="description">
                              <Form.Label>Description</Form.Label>
                              <Form.Control style={{height: "100px", width: "700px"}}
                                type="text"
                                name="description"
                                required
                                placeholder="Card Description"/>
                          </Form.Group>

                          <Form.Group controlId="Comment">
                              <Form.Label>Comment</Form.Label>
                              <Form.Control
                                type="text"
                                name="comment"
                                required
                                placeholder="Card comments"/>
                          </Form.Group>

                          <Form.Group>
                              <Button onClick={handleOnClick} variant="primary" type="submit">Add Card</Button>
                          </Form.Group>
                      </Form>
                  </Col>
              </Row>
          </Modal.Body>
        </Modal>
    );
}

export default AddCard;