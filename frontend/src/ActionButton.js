import React, { useState } from 'react'
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Textarea from 'react-textarea-autosize';

function ActionButton() {

    const [state, setState] = useState({formOpen: false});
    console.log(state);

    const openForm = () => {
        setState({formOpen: true});
    }

    const closeForm = () => {
        setState({formOpen: false});
    }

    const handleInputChange = e => {
        setState({text: e.target.value});
    }

    const renderAddButton = () => {
        return (
            <div 
            onClick={openForm}
            style = {{
                ...styles.openForButtonGroup,
                opacity: 1,
                color: "inherit",
                backgroundColor: "inherit"
            }}>
                <Icon>add</Icon>
                <p>Add</p>
            </div>
        )
    }

    const renderForm = () => {
        return (
            <div>
                <Card 
                style={{
                    backgroundColor: "#CDAB7D",
                    overflow: "visible",
                    minHeight: 80,
                    minWidth: 272,
                    padding: "6px 8px 2px"
                }}
                >
                    <Textarea placeholder = "Enter a title for this card"
                    autoFocus
                    onBlur={closeForm}
                    value={state.text}
                    onChange={handleInputChange}
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
                            variant="contained"
                            style={{
                                fontWeight: "bold",
                                boxShadow: "5px",
                                color: "#592c99",
                                backgroundColor: "#CDAB7D"}}>Add Card{" "}
                        </Button>
                        <Icon onClick={closeForm} style={{ marginLeft: 8, cursor: "pointer"}}>close</Icon>
                </div>       
            </div>
        )
    }

    return state.formOpen ? renderForm() : renderAddButton();
}

const styles = {
    openForButtonGroup: {
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        borderRadius: 3,
        height: 36,
        width: 272,
        paddingLeft: 10
    },
    formButtonGroup: {
        marginTop: 8,
        display: "flex",
        alignItems: "center"
    }
}

export default ActionButton
