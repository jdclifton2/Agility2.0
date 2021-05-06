import React, {useContext, useState} from 'react';
import Icon from "@material-ui/core/Icon";
import Card from "@material-ui/core/Card";
import Textarea from "react-textarea-autosize";
import {Button} from "react-bootstrap";
import {ListContext} from "./ListContext";

/**
 * This function will represent the button responsible for creating a new list.
 */
function ListActionButton() {
    const [state, setState] = useState({isOpen: false});

    const [textState, setTextState] = useState({title: ''});

    const [lists, setLists] = useContext(ListContext);

    // This is added just to get rid of the React warning.
    console.log(lists[0]);

    /**
     * Open the form used to create a new list. This event will be triggered when the user
     * clicks on "Add new List".
     */
    const openForm = () => {
        setState({isOpen: true})
    };

    /**
     * Closes the form used to create a new list. This event will be triggered when the user
     * clicks on the "X" button in the list form.
     */
    const closeForm = () => {
        setState({isOpen: false})
    };

    /**
     * This function will handle the change in our text.
     * @param e
     */
    const handleChange = (e) => {
        setTextState(e.target.value);
    };

    /**
     * This createList function is triggered when the user clicks on the "Add List" button. It will create
     * a List JSON object based on the user's input and post the newly added list to the backend. This function
     * will also update the state of the lists so that we don't have to refresh the page after adding a new list.
     * @param e Add List button clicked.
     */
    const createList = (e) => {
        e.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                title: textState
            })
        };
        fetch('http://localhost:8000/api/columns/', requestOptions)
            .then(response => response.json())
            .then(data => setLists(prevLists => [...prevLists, data]));
    };

    /**
     * This function is for rendering the add list form.
     */
    const renderForm = () => {
    return (
            <div>
                <Card
                style={{
                    paddingLeft: 9,
                    marginLeft: 10,
                    backgroundColor: "#CDAB7D",
                    overflow: "visible",
                    minHeight: 80,
                    minWidth: 272,
                    padding: "6px 8px 2px"
                }}
                >
                    <Textarea placeholder = "Enter a title for this List"
                              onChange={handleChange}
                    autoFocus
                    style={{
                        backgroundColor: "#CDAB7D",
                        resize: "none",
                        width: "100%",
                        outline: "none",
                        border: "none"
                    }}
                />
                </Card>
                <div style={styles.formButtonGroup}>
                        <Button
                            onClick={createList}
                            variant="contained"
                            style={{
                                position: "relative",
                                right: 9,
                                fontWeight: "bold",
                                boxShadow: "5px",
                                color: "#592c99",
                                backgroundColor: "#CDAB7D"}}>Add List{" "}
                        </Button>
                        <Icon onClick={closeForm} style={{ marginLeft: 8, cursor: "pointer"}}>close</Icon>
                </div>
            </div>
        )
    };

    /**
     * This function is for rendering the Add list button.
     */
    const renderAddButton = () => {
    return (
        <div
            onClick={openForm}
            style = {{
                ...styles.openForButtonGroup,
                opacity: 1,
                color: "inherit",
                backgroundColor: "rgba(0, 0, 0, .15)"
            }}>
            <Icon style={{color: "#CDAB7D"}}>add</Icon>
            <p style={
                {marginTop: '15px',
                marginLeft: '10px',
                color: '#CDAB7D',
                }}>Add New List</p>
        </div>
    )
};
    // If form is open, render form. Otherwise, render the addList button.
    return state.isOpen ? renderForm() : renderAddButton();
}

/**
 * styles for the buttons and form.
 */
const styles = {
    openForButtonGroup: {
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        borderRadius: 5,
        height: 36,
        width: 272,
        paddingLeft: 10,
        marginLeft: 9

    },
    formButtonGroup: {
        marginTop: 8,
        display: "flex",
        alignItems: "center",
        paddingLeft: 10,
        marginLeft: 9
    }
};
export default ListActionButton;