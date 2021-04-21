import './App.css';
import React, { useState, useEffect } from 'react';
import List from "./List";
import ActionButton from "./ActionButton";
import { DragDropContext } from 'react-beautiful-dnd';

function App() {
  const [cards, setCards] = useState([])

  useEffect(() => {
    const getCards = async () => {
      const cardsFromServer = await fetchCards()
      setCards(cardsFromServer)

      console.log(cardsFromServer);
    }

    getCards()
  }, [])

  const fetchCards = async () => {
    const res = await fetch('http://localhost:8000/api/cards/')
    const data = await res.json()

    return data;
  }

  const [lists, setLists] = useState([])

  useEffect(() => {
    const getLists = async() => {
      const listsFromServer = await fetchLists();
      setLists(listsFromServer)

      console.log(listsFromServer)
    }

    getLists()
  }, [])

  const fetchLists = async () => {
    const res = await fetch('http://localhost:8000/api/columns/')
    const data = await res.json()

    return data;
  }

  const onDragEnd = (result) => {
    console.log(result);
    console.log("Lists")
    console.log(lists)
    console.log("Cards")
    console.log(cards)
    //prevent app from crashing if card dragged in non droppable
    if(!result.destination) return;
    const oldCards = Array.from(cards)
    const col = result.source.droppableID;
  //const copiedItems = [...col.items];
    // remove the card 
    console.log("Source index " + result.source.index)
    const [removedCard] = oldCards.splice(result.source.index, 1);
    console.log(removedCard)
    removedCard.index = result.source.index
    // removedCard.column = col;
    //console.log(cards)
    console.log("Destination index " + result.destination.index)

    const newCards = oldCards.splice(result.destination.index, 0, removedCard);

    //setLists([oldCards]);
    console.log(oldCards)
    setCards(oldCards)
  }

  const update = (nextState) => {
    console.log("YOU'RE IN THE UPDATE METHOD IN APP")
    setCards([...cards, nextState]);
  }

  

  return (
    <DragDropContext onDragEnd= {onDragEnd} >
      <div className="App">
        <h1 style={styles.titleContainer}>Agility 2.0</h1>
        <div style={styles.listsContainer}>
        { lists.map(list => 
          <List updatestate={update} title={ list.title } cards={cards} listID={list.id} key={list.id}/>
        )}
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
  }

}
export default App;
