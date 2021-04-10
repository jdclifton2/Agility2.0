import React from 'react'
import { Draggable } from 'react-beautiful-dnd';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';

function CardItem({title, description, id, index}) {
    return (
        <Draggable key={id} draggableId={String(id)} index={index}>
        {(provided, snapshot) => (
            <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}>

          <Card style = {styles.cardContainer}>
            <div style={styles.cardTitleContainer}>{title}</div>
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
    }
}

export default CardItem
