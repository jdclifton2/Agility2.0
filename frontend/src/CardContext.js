import React, {useEffect, useState, createContext} from "react";

export const CardContext = createContext();

/**
 * This card provider is used to provide Context for the whole application. This means that the state
 * created here can be accessed from anywhere in the application without having to pass props between components.
 */
export const CardProvider = (props) => {
    const [cards, setCards] = useState([]);
    console.log("CARDS FROM PROVIDER");
    console.log(cards);
  useEffect(() => {
    const getCards = async () => {
      const cardsFromServer = await fetchCards();
      setCards(cardsFromServer);

      console.log(cardsFromServer);
    };

    getCards()
  }, []);

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