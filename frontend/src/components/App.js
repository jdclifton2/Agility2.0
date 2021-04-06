import React, { Component } from 'react';
import List from './List';
import { connect } from "react-redux"
import ActionButton from "./actionButton";
import { DragDropContext } from "react-beautiful-dnd";
import { sort } from "../actions";
import './App.css'


class App extends Component {

  onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if(!destination) {
      return;
    }

    this.props.dispatch(sort(
      source.droppableId,
      destination.droppableId,
      source.index,
      destination.index,
      draggableId
    ))

  }

  render() {
    const { lists } = this.props;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div>
          <h1 style={styles.titleContainer}>Agility 2.0</h1>
          <div style={styles.listsContainer}>
            { lists.map(list =>
              <List listID={list.id} key={list.id} title={list.title} cards={list.cards} />)}
              <ActionButton list />
          </div>
        </div>
      </DragDropContext>
    );
  }
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

const mapStateToProps = state => ({
  lists: state.lists
})

export default connect (mapStateToProps) (App);
