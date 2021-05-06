import './App.css';
import React, { useContext } from 'react';
import styled from 'styled-components';
import List from "./List";
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import axios from "axios";
import logo from './logo.png';
import { CardContext } from './CardContext';
import { ListContext } from './ListContext';
import ListActionButton from './ListActionButton';

const Container = styled.div``;

/**
 * The main component for our kanban board application. All other components are rendered from 
 * here. 
 * @returns All rendered components. 
 */
function App() {
  //initial state of cards
  const [cards, setCards] = useContext(CardContext);
  //initial state of lists
  const [lists, setLists] = useContext(ListContext);
  
  /**
   * This function reacts to the end of a drag. Switches the card in the card array and
   * updates the database. Currently, cards get auto added to the bottom of the list.
   * @param {Promise} result This is what you use to access the source and destination objects
   * for your drag operation.
   */
  const onDragEnd = (result) => {
    // prevents app from crashing if draggable dragged to a non droppable
    if(result.type === 'card'){
      if(!result.destination) return;

      const oldCards = Array.from(cards);

      const newCol = result.destination.droppableId;

      // grab the card to be removed
      const [removedCard] = oldCards.splice(result.source.index, 1);
      //change the column
      removedCard.column = Number(newCol);
      //removedCard.position = result.destination.position;

      //put updated card back in.
      oldCards.splice(result.destination.index, 0, removedCard);

      const cardKey = removedCard.id;
      //update database
      axios.put('http://localhost:8000/api/cards/' + String(cardKey) + "/", removedCard)
      .then(res => console.log(res.data));

      setCards(oldCards);
    } else {
      const oldList = Array.from(lists);
      const [removedList] = oldList.splice(result.source.index, 1);
      oldList.splice(result.destination.index, 0, removedList);
      setLists(oldList);
      
    }
  };

  return (
        <DragDropContext onDragEnd= {onDragEnd} >
          <Droppable droppableId="all-columns" direction ="horizontal" type="list">
            {provided => (
            <Container            
            {...provided.droppableProps}
            ref={provided.innerRef}>
              
              <img style={styles.logoContainer} src={logo} alt="Agility 2.0" width="90" height="90"/>
              <h1 style={styles.titleContainer}>Team Purple Moscow </h1>
              <div style={styles.listsContainer}>
                {lists.map((list,index) =>
                  <List title={ list.title } cards={cards} listID={list.id} key={list.id} index={index}/>
                )}
                <ListActionButton />
            </div>
            {provided.placeholder}
          </Container>
          )}
        </Droppable>
        </DragDropContext>
  );
}

/**
 * Used to style our lists, page, and title of the lists.
 */
const styles = {
  pageContainer: {
    margin: "0",
    padding: "0",
    background: "linear-gradient(to bottom right, #592c99, #885dd0, #CDAB7D)"

  },
  listsContainer: {
    display: "flex",
    flexDirection: "row",
  },
  titleContainer: {
    color: "#CDAB7D",
    fontSize: "50px",
    position: "relative",
    bottom: "50px"
  },
  logoContainer: {
    position: "relative",
    left: "1800px",
    top: "15px"
  }
};
export default App;
