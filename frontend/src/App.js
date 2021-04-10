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

  const onDragEnd = result => {
    console.log(result);
    console.log(lists)
    console.log(cards)
    const oldCards = Array.from(cards)
    const [reorderedCard] = oldCards.splice(result.source.index, 1);
    oldCards.splice(result.destination.index, 0, reorderedCard);

    setCards(oldCards)
  }

  return (
    <DragDropContext onDragEnd= {onDragEnd} >
      <div className="App">
        <h1 style={styles.titleContainer}>Agility 2.0</h1>
        <div style={styles.listsContainer}>
        { lists.map(list => 
          <List title={ list.title } cards={cards} listID={list.id} key={list.id}/>
        )}
      </div>
      <ActionButton />
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
