import React, {useContext} from 'react'
import { Draggable } from 'react-beautiful-dnd';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Icon from "@material-ui/core/Icon";
import {CardContext} from "./CardContext";

function CardItem({title, description, id, index}) {

    const [cards, setCards] = useContext(CardContext);
    //console.log("CARDS STATE FROM CARDITEM.JS");
    //console.log(cards);

    const handleOnDelete = (e) => {
        e.preventDefault();
        const newState = cards.filter(function(card) {
            return card.id !== id;
        })

        //console.log("NEW STATE")
        //console.log(newState);

        fetch(`http://localhost:8000/api/cards/${id}/`, { method: 'DELETE'})
            .then(() => setCards(newState))

        //console.log(cards)
    }

    return (
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


}

export default CardItem;
