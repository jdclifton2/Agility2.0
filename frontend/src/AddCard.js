import React, {useEffect, useState, useContext} from "react";
import {Button, Col, Form, Modal, Row} from 'react-bootstrap';
import {CardContext} from "./CardContext";

function AddCard(props) {

    const [cards, setCards] = useContext(CardContext);
    //console.log("CARDS FROM CONTEXT IN ADDCARD!!!");
    //console.log(cards);

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
        // does a post request then sets the state to the newly posted data.
        fetch('http://localhost:8000/api/cards/', requestOptions)
            .then(response => response.json())
            .then(data => setCards(prevCards =>
                [...prevCards, data]
            ));

        console.log("###########################################################################")
        console.log(cards)
        const newCard = {title: event.target.title.value,
                        description: event.target.description.value,
                        comment: event.target.comment.value,
                        column: props.listID}

        //console.log("CARDS FROM API")
        //console.log(cards);
        //setCards(prevCards => [...prevCards, newCard])
    }

    const handleOnClick = (card) => {
        props.modalClosed()
        //console.log("THIS IS THE CARD WE ARE TRYING TO ADD")
        //console.log(card);

        //console.log("THIS IS THE CARDS LIST INSIDE OF HANDLEONCLICK");
        //console.log(cards)
        //setCards(prevCards => [...prevCards, card])

        //console.log("THIS IS THE CARDS LIST AFTER ADDING")
        //console.log(cards)
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