import React, { useContext } from "react";
import {Button, Col, Form, Modal, Row} from 'react-bootstrap';
import {CardContext} from "./CardContext";
import axios from "axios";


/**
 * This function reacts to a card being added to a list. Updates the database and the state.
 * @param {*} props Passed down from parent component.
 */
function AddCard(props) {

    const [cards, setCards] = useContext(CardContext);

    /**
     * This handleSubmit event listener is triggered when the user clicks on the "Add Card" button. It will create
     * a Card JSON object based on the user's input and post the newly added card to the backend. This function
     * will also update the state of the cards so that we don't have to refresh the page after adding a new card.
     * @param event Add button clicked.
     */
    const handleSubmit = (event) => {
        event.preventDefault();

        const cardJson = JSON.stringify({
            title: event.target.title.value,
            description: event.target.description.value,
            comment: event.target.comment.value,
            column: props.listID,
        });

        //required headers
        const headers = { 'Content-Type': 'application/json'};

        axios.post('http://localhost:8000/api/cards/', cardJson , {
            headers: headers
          })
        .then(res => 
            setCards([...cards, res.data]));
    };

    /**
     * This function is called when the user clicks on the "Add" button in the pop-up window. It will
     * handle the event by closing the window.
     */
    const handleOnClick = () => {
        props.modalClosed();
    };

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
                                autocomplete="off"
                                required
                                placeholder="Card Title"/>
                          </Form.Group>

                          <Form.Group controlId="description">
                              <Form.Label>Description</Form.Label>
                              <Form.Control style={{height: "100px", width: "700px"}}
                                type="text"
                                name="description"
                                autocomplete="off"
                                required
                                placeholder="Card Description"/>
                          </Form.Group>

                          <Form.Group controlId="Comment">
                              <Form.Label>Comment</Form.Label>
                              <Form.Control
                                type="text"
                                name="comment"
                                autocomplete="off"
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