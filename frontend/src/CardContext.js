import React, {useEffect, useState, createContext} from "react";
import ActionButton from "./ActionButton";
import App from "./App";
import List from "./List";
import AddCard from "./AddCard";

export const CardContext = createContext();

export const CardProvider = (props) => {
    const [cards, setCards] = useState([])
    console.log("CARDS FROM PROVIDER");
    console.log(cards);
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
    return (
        <CardContext.Provider value={[cards, setCards]}>
          {props.children}
        </CardContext.Provider>
    );
}