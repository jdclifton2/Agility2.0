import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CardProvider } from './CardContext';
import { ListsProvider } from "./ListContext";

/**
 * This is where the app is rendered.
 */
ReactDOM.render(
    <CardProvider>
        <ListsProvider>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </ListsProvider>
    </CardProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
