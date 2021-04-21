import './App.css';
import React, {useState, useEffect, useContext} from 'react';
import List from "./List";
import ActionButton from "./ActionButton";
import { DragDropContext } from 'react-beautiful-dnd';

import {CardContext, CardProvider} from './CardContext';
import {ListContext, ListsProvider} from './ListContext';

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

  //const [lists, setLists] = useContext(ListContext);
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
    console.log(removedCard.column);
    removedCard.column = Number(newCol);
    console.log(removedCard);
    //removedCard.index = result.source.index
    //removedCard.column = col;
    //console.log(cards)
    //console.log("Destination index " + result.destination.index)

    oldCards.splice(result.destination.index, 0, removedCard);

    //setLists([oldCards]);
    console.log(oldCards);
    setCards(oldCards);
  }


  return (
        <DragDropContext onDragEnd= {onDragEnd} >
            <div className="App">
              <h1 style={styles.titleContainer}>Agility 2.0</h1>
              <div style={styles.listsContainer}>
                {lists.map(list =>
                  <List title={ list.title } cards={cards} listID={list.id} key={list.id}/>
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
