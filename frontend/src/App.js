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


function App() {
  const [cards, setCards] = useContext(CardContext);
  console.log("CARDS FROM CONTEXT IN APP")
  console.log(cards);

  //const [cards, setCards] = useState([])
  // useEffect(() => {
  //   const getCards = async () => {
  //     const cardsFromServer = await fetchCards()
  //     setCards(cardsFromServer)
  //
  //     //console.log(cardsFromServer);
  //   }
  //
  //   getCards()
  // }, [])
  //
  // const fetchCards = async () => {
  //   const res = await fetch('http://localhost:8000/api/cards/')
  //   const data = await res.json()
  //
  //   return data;
  // }

  const [lists, setLists] = useContext(ListContext);
  // const [lists, setLists] = useState([])
  //
  // useEffect(() => {
  //   const getLists = async() => {
  //     const listsFromServer = await fetchLists();
  //     setLists(listsFromServer)
  //
  //     console.log(listsFromServer)
  //   }
  //
  //   getLists()
  // }, [])
  //
  // const fetchLists = async () => {
  //   const res = await fetch('http://localhost:8000/api/columns/')
  //   const data = await res.json()
  //
  //   return data;
  // }

  /**
   * This function reacts to the end of a drag. Switches the card in the card array and
   * updates the database. Currently, cards get auto added to the bottom of the list.
   * @param {Promise} result This is what you use to access the source and destination objects
   * for your drag operation.
   * @returns
   */
  const onDragEnd = (result) => {
    console.log(result);
    console.log("Lists");
    console.log(lists);
    console.log("Cards");
    console.log(cards);
    //prevent app from crashing if card dragged in non droppable
    if(!result.destination) return;

    const oldCards = Array.from(cards);
    console.log("Old cards");
    console.log(oldCards);
    const newCol = result.destination.droppableId;
    console.log("col");
    console.log(newCol);

    //const colCards = oldCards.filter(card => card.column == col);
  //const copiedItems = [...col.items];
    // remove the card
    console.log("Source index " + result.source.index);
    console.log("Card to be removed ");
    //console.log(oldCards[result.source.index])
    //console.log(colCards)

    const [removedCard] = oldCards.splice(result.source.index, 1);
    //console.log(removedCard.column);
    removedCard.column = Number(newCol);
    //console.log(removedCard);
    //removedCard.index = result.source.index
    //removedCard.column = col;
    //console.log(cards)
    //console.log("Destination index " + result.destination.index)

    oldCards.splice(result.destination.index, 0, removedCard);

    //setLists([oldCards]);
    const cardKey = removedCard.id;
    console.log("Posting to card at" + String(cardKey));
    axios.put('http://localhost:8000/api/cards/' + String(cardKey) + "/", removedCard)
    .then(res => console.log(res.data));

    console.log(oldCards);
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
