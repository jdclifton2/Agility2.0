import React, {useContext} from 'react';
import { Droppable, Draggable } from "react-beautiful-dnd";
import CardItem from "./CardItem"
import styled from 'styled-components';
import ActionButton from "./ActionButton";
import {CardContext} from "./CardContext";
import Icon from "@material-ui/core/Icon";
import {ListContext} from "./ListContext";
import { Container } from '@material-ui/core';

const Containers = styled.div``;
const Title = styled.h4``;
/**
 * Functional component used to represent a list in our kanban board. Will sort cards by order of
 * their position.
 * @param title The title of the list.
 * @param listID The ID of the list.  
 */
function List({ title, listID, index }) {

    const[cards, setCards] = useContext(CardContext);

    const[lists, setLists] = useContext(ListContext);

    /**
     * This event handler is triggered when the user clicks on the "X" button on the list. It will make a
     * delete request to the backend and remove the list from the database based on the list ID. This function
     * will also update the state of our lists.
     * @param e delete event
     */
    const handleDeleteList = (e) => {
        e.preventDefault();
        const newState = lists.filter(function(list) {
            return list.id !== listID;
        });

        fetch(`http://localhost:8000/api/columns/${listID}/`, { method: 'DELETE'})
            .then(() => setLists(newState));
    };

    return (
        /**
        * This is used to enable drag and drop functionality.
        * Consult beautiful-dnd documentation if confused. Wrappling a list in droppable enables
        * draggable items to be dropped within that space. In this case, we want each list to be
        * a droppable zone.
        */
       <Draggable draggableId={String(listID)} index={index}>
        
        {(provided2) => (
            // would prefer to get rid of this but it needs to be wrapped in something
            <Containers
            {...provided2.draggableProps}
            ref={provided2.innerRef}
            >  
 
        <Droppable droppableId={String(listID)} type="card">
              {(provided) => (
                <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={styles.container}>
                    <div style={{position: "relative"}}>
                        <Title
                        //make a list draggable by the title
                        {...provided2.dragHandleProps}
                        style={styles.title}>{title}
                        </Title>
                        <Icon onClick={handleDeleteList} style={styles.buttonContainer}>close</Icon>
                    </div>
                    {cards.sort( 
                        //sort based on position
                        (cardA, cardB) => (cardA.position > cardB.position) ? 1 : -1)
                            .map((card, index2) => { 
                                //only cards that belong to that column
                                if(card.column === listID){
                                    return (
                                    <CardItem title={card.title} description={card.description}
                                        id = {card.id} index={index2} key={card.id}/>)
                                }; //end if
                            }
                        )}
                        
                {provided.placeholder}
                <ActionButton listID={listID}/>
                </div>
            )}
        </Droppable>
     </Containers>
    )}
    </Draggable>
    );
}

/**
 * Used to style our list component.
 */
const styles = {
    container: {
        boxShadow: "0 10px 35px rgba(0, 0, 0, 0.8)",
        background: "linear-gradient(to bottom, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.1) 15%, transparent 50%, transparent 85%, rgba(255, 255, 255 .3) 100%)",
        //backgroundColor: "#dfe3e6",
        borderRadius: 9,
        width: 300,
        padding: 8,
        height: "100%",
        marginRight: 1,
        marginLeft: 10
    },
    title: {
        fontSize: "25px",
        color: "#CDAB7D"
    },
    buttonContainer: {
        position: "absolute",
        top: "0px",
        right: "0px",
        fontSize: '30px',
        color: "#CDAB7D"
    }
};
export default List;