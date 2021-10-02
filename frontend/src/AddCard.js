import React, {useEffect, useState, useContext} from "react";
import {Button, Col, Form, Modal, Row} from 'react-bootstrap';
import {CardContext} from "./CardContext";
import axios from "axios";


/**
 * This function reacts to a card being added to a list. Updates the database and the state.
 * @param {*} props Passed down from parent component.
 */
function AddCard(props) {

    const [cards, setCards] = useContext(CardContext);

    const handleSubmit = (event) => {
        event.preventDefault();
        // card gets put at the bottom by default 
        let pos = 0;
        if(cards.length === 0){
            pos = 0;
        } else {  
          //get position of final card. array is sorted by position so should be largest
            pos = Number(cards[cards.length - 1].position) + 1 
        }
        // console.log("pos" + pos);
        // The data to be posted
        const cardJson = JSON.stringify({
            title: event.target.title.value,
            description: event.target.description.value,
            comment: event.target.comment.value,
            column: props.listID,
            position: pos,
        });

        //required headers
        const headers = { 'Content-Type': 'application/json'};

        axios.post('http://localhost:8000/api/cards/', cardJson , {
            headers: headers
          })
        .then(res => 
            setCards([...cards, res.data]));
    }

    const handleOnClick = (card) => {
        props.modalClosed()
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
                                autoComplete="off"
                                required
                                placeholder="Card Title"/>
                          </Form.Group>

                          <Form.Group controlId="description">
                              <Form.Label>Description</Form.Label>
                              <Form.Control style={{height: "100px", width: "700px"}}
                                type="text"
                                name="description"
                                autoComplete="off"
                                required
                                placeholder="Card Description"/>
                          </Form.Group>

                          <Form.Group controlId="Comment">
                              <Form.Label>Comment</Form.Label>
                              <Form.Control
                                type="text"
                                name="comment"
                                autoComplete="off"
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