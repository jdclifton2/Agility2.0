import logo from './logo.svg';
import React from 'react';
import Card from './card';
import './App.css';

/**
 * This will act as our frontend component. This will render the cards, boards,
 * and all the other components in our frontend.
 */
class App extends React.Component {
    render() {
        return (
            <div>
                <Card/>
            </div>
        )
    }
}

export default App;
