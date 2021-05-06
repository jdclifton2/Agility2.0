import React, {useContext} from 'react'
import { Draggable } from 'react-beautiful-dnd';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Icon from "@material-ui/core/Icon";
import {CardContext} from "./CardContext";

/**
 * Functional component to represent a card item in our kanban board. 
 * @param Title The title of the card.
 * @param description The description of the card.
 * @param id The id of the card.
 * @param index The index of the card. Used for react-beautiful-dnd.
 * @returns A card object rendered on the page. 
 */
function CardItem({title, description, id, index}) {

    const [cards, setCards] = useContext(CardContext);

    /**
     * This event handler is triggered when the user clicks on the "X" button on the card. It will make a
     * delete request to the backend and remove the card from the database based on the card ID. This function
     * will also update the state of our cards.
     * @param e delete event
     */
    const handleOnDelete = (e) => {
        e.preventDefault();
        const newState = cards.filter(function(card) {
            return card.id !== id;
        });

        // aquire the cards from the database.
        fetch(`http://localhost:8000/api/cards/${id}/`, { method: 'DELETE'})
            .then(() => setCards(newState))
    };

    return (
        // used for react-beautiful-dnd. Used to make cards draggable. Consult documentation.
        <Draggable key={id} draggableId={String(id)} index={index}>
        {(provided, snapshot) => (
            <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}>

          <Card style = {styles.cardContainer}>
              <div>
                <div style={styles.cardTitleContainer}>
                    <span style={styles.cardTitleContainer}>{title}</span>
                </div>
                  <Icon onClick={handleOnDelete} style={styles.buttonContainer}>close</Icon>
              </div>
            <CardContent>
                <Typography gutterBottom>
                    {description}
                </Typography>
            </CardContent>
            </Card>
            
        </div>    
        )}  
        </Draggable>
    
    )
}

/**
 * Used to style the cards, title of cards, and buttons.
 */
const styles = {
    cardContainer: {
        marginBottom: 8,
        backgroundColor: "#CDAB7D"
    },
    cardTitleContainer: {
        fontWeight: "bold",
        fontSize: "15px",
        position: "relative",
        left: "3px",
        top: "3px"
    },
    buttonContainer: {
        position: "relative",
        left: "257px",
        bottom: "20px",
        fontSize: '20px',
    }
};
export default CardItem;
