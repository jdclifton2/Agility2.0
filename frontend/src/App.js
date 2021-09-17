import './App.css';
import React, {useState, useEffect, useContext} from 'react';
import List from "./List";
import ActionButton from "./ActionButton";
import { DragDropContext } from 'react-beautiful-dnd';
import axios from "axios";
import logo from './logo.png';

import {CardContext, CardProvider} from './CardContext';
import {ListContext, ListsProvider} from './ListContext';
import ListActionButton from './ListActionButton';

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
    let server = 'http://localhost:8000/api/cards/';
    // prevents app from crashing if draggable dragged to a non droppable
    if(!result.destination) return;

    const oldCards = Array.from(cards);

    const newCol = result.destination.droppableId;

    // grab the card to be removed
    const [removedCard] = oldCards.splice(result.source.index, 1);
    //grab card currently in destination spot
    const [destinationCard] = oldCards.splice(result.destination.index, 1);


    
    //change the column
    removedCard.column = Number(newCol);
    removedCard.position = Number(result.destination.index);
    console.log("dawg")
    console.log(result.destination)

    //put updated card back in.
    oldCards.splice(result.destination.index, 0, removedCard);

    if(destinationCard !== undefined){
      destinationCard.position = Number(result.source.index);
      oldCards.splice(result.destination.index, 0, destinationCard);
      axios.put( server + String(destinationCard.id) + "/", destinationCard)
      .then(res => console.log(res.data));
    }
    

    const cardKey = removedCard.id;
    //update database
    

    axios.put( server + String(cardKey) + "/", removedCard)
    .then(res => console.log(res.data));



    setCards(oldCards);

  }


  return (
        <DragDropContext onDragEnd= {onDragEnd} >
            <div className="App">

              <img style={styles.logoContainer} src={logo} alt="Agility 2.0" width="90" height="90"/>
              <h1 style={styles.titleContainer}>Team Purple Moscow </h1>
              <div style={styles.listsContainer}>
                {lists.map(list =>
                  <List title={ list.title } cards={cards} listID={list.id} key={list.id}/>
                )}
                <ListActionButton />
            </div>
            </div>
        </DragDropContext>
  );
}

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

}
export default App;
