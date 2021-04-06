import React from "react";
import CardItem from "./CardItem";
import ActionButton from "./actionButton";
import { Droppable } from "react-beautiful-dnd";

const List = ({ title, cards, listID}) => {
    return (
        <Droppable droppableId={String(listID)}>
            {(provided) => (
                <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={styles.container}>
                    <h4 style={styles.title}>{title}</h4>
                    { cards.map((card, index) =>
                    <CardItem key={card.id} index={index} text={card.text} id={card.id}/>
                    )}
                    <ActionButton listID={listID}/>
                    {provided.placeholder}
                </div>
            )}

        </Droppable>
    );
};

const styles = {
    container: {
        boxShadow: "0 10px 35px rgba(0, 0, 0, 0.8)",
        background: "linear-gradient(to bottom, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.1) 15%, transparent 50%, transparent 85%, rgba(255, 255, 255 .3) 100%)",
        //backgroundColor: "#dfe3e6",
        borderRadius: 3,
        width: 300,
        padding: 8,
        height: "100%",
        marginRight: 8
    },
    title: {
        fontSize: "25px",
        color: "#CDAB7D"
    }
}

export default List;