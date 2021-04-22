import React, {useContext, useState} from 'react';
import Icon from "@material-ui/core/Icon";
import Card from "@material-ui/core/Card";
import Textarea from "react-textarea-autosize";
import {Button} from "react-bootstrap";
import {ListContext} from "./ListContext";
import { v4 as uuidv4 } from 'uuid';

function ListActionButton() {
    const [state, setState] = useState({isOpen: false})

    const [textState, setTextState] = useState({title: ''})

    const [lists, setLists] = useContext(ListContext);

    const openForm = () => {
        setState({isOpen: true})
    };

    const closeForm = () => {
        setState({isOpen: false})
    }

    const handleChange = (e) => {
        setTextState(e.target.value);
        console.log(textState)
    }

    const createList = (e) => {
        e.preventDefault()

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

        //const newList = {title: "Would",
        //                 dashboard: null}
        console.log("###########################################################################")
        console.log(lists)
        setState({isOpen: false})
        //setLists(prevLists => [...prevLists, newList])
    }

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
    }

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
}

    return state.isOpen ? renderForm() : renderAddButton();
}


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
}
export default ListActionButton;