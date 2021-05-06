import {createContext, useEffect, useState} from "react";
import React from "react";


export const ListContext = createContext();

/**
 * This list provider is used to provide Context for the whole application. This means that the state
 * created here can be accessed from anywhere in the application without having to pass props between components.
 */
export const ListsProvider = (props) => {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const getLists = async() => {
      const listsFromServer = await fetchLists();
      setLists(listsFromServer);

      console.log(listsFromServer)
    };

    getLists()
  }, []);

  const fetchLists = async () => {
    const res = await fetch('http://localhost:8000/api/columns/')
    const data = await res.json();

    return data;
  };

  return (
      <ListContext.Provider value={[lists, setLists]}>
          {props.children}
        </ListContext.Provider>
  )
};