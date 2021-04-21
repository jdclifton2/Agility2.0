import React, {useContext} from 'react';
import { Droppable } from "react-beautiful-dnd";
import CardItem from "./CardItem"
import ActionButton from "./ActionButton";
import {CardContext} from "./CardContext";

function List({ title, listID}) {

    const[cards, setCards] = useContext(CardContext);

    console.log("These are the cards in the list");
    console.log(cards);

    const handleCallBack = (childData) => {
        console.log("Data made it back to the parent: ")
        console.log(childData)

        cards.append(childData)
    }

    //Temporary var
    return (
        <Droppable droppableId={String(listID)}>
              {(provided) => (
                <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={styles.container}>
                <h4 style={styles.title}>{title}</h4>
                    {cards.map(
                    (card, index) => {
                        if(card.column === listID)
                            return (<CardItem title={card.title} description={card.description}
                            id = {card.id} index={index} key={card.id}/>);
                        // Default return. Should be unreachable.
                        return null;
                }
                )}
                {provided.placeholder}
                <ActionButton listID={listID} parentCallback={handleCallBack}/>
                </div>
            )}
        </Droppable>
    );
}

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
