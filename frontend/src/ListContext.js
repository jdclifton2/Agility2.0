import {createContext, useEffect, useState} from "react";
import React from "react";
import App from "./App";
import List from "./List";
import ActionButton from "./ActionButton";
import AddCard from "./AddCard";


export const ListContext = createContext();

export const ListsProvider = (props) => {
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

  return (
      <ListContext.Provider value={[lists, setLists]}>
          {props.children}
        </ListContext.Provider>
  )
}