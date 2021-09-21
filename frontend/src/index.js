import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom'
import { CardProvider } from './CardContext';
import {ListsProvider} from "./ListContext";


ReactDOM.render(
  <BrowserRouter>
    <CardProvider>
        <ListsProvider>
          <React.StrictMode>
          
            <App />
          </React.StrictMode>
        </ListsProvider>
    </CardProvider>
    </BrowserRouter>,
    
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
