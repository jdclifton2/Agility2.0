import logo from './logo.svg';
import React from 'react';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cardList: [],
            activeItem: {
                id:null,
                title: '',
                description: '',
                label: '',
                comment: '',
            },
            editing: false,
        }
        this.fetchTasks = this.fetchTasks.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    componentWillMount() {
        this.fetchTasks()
    }

    fetchTasks() {
        console.log('Fetching...')

        fetch('http://localhost:8000/api/cards/')
            .then(response => response.json())
            .then(data =>
                this.setState({
                    cardList: data
                })
            )
        console.log(this.cardList)
    }

    handleChange(e) {
        var title = e.target.name
        var value = e.target.value
        console.log("name: ", title)
        console.log("value: ", value)

        this.setState({
            activeItem:{
                ...this.state.activeItem,
                title: value
            }
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        console.log('Item: ', this.state.activeItem)

        var url = 'http://localhost:8000/api/cards/'
        fetch(url, {
            method: 'POST',

            headers:{
                'Content-type': 'application/json',
            },
            body:JSON.stringify(this.state.activeItem)
        }).then((response) => {
            this.fetchTasks()
            this.setState({
                activeItem: {
                id:null,
                title: '',
                description: '',
                label: '',
                comment: '',
            }
            })
        }).catch(function(error) {
            console.log("ERROR: ", error);
        })
    }

    render() {
        var tasks = this.state.cardList;
        return(
            <div className="container">

                <div id="task-container">
                    <div id="form-wrapper">
                        <form onSubmit={this.handleSubmit} id="form" method="post">
                            <div className="flex-wrapper">
                                <div style={{flex: 6}}>
                                    <input onChange={this.handleChange} className="form-control" id="title" type="text" name="title" placeholder="Title"/>
                                </div>

                                <div style={{flex: 6}}>
                                    <input className="form-control" id="description" type="text" name="description" placeholder="Description"/>
                                </div>

                                <div style={{flex: 6}}>
                                    <input className="form-control" id="comment" type="text" name="comment" placeholder="Comment"/>
                                </div>

                                <div style={{flex: 1}}>
                                    <input id="submit" className="btn" type="submit"/>
                                </div>
                            </div>
                        </form>

                        <div id="list-wrapper">
                            {tasks.map(function(card, index) {
                                return(
                                    <div key={index} className="task-wrapper flex-wrapper">
                                        <div style={{flex: 7}}>
                                            <pre>{card.description}     {card.created_at}</pre>
                                            <pre>Label:  {card.label}</pre>
                                            <pre>Comment:  {card.comment}</pre>
                                            <pre>Created_at: {card.created_at}</pre>
                                        </div>

                                        <div style={{flex:1}}>
                                            <button className="btn">Edit</button>
                                        </div>

                                        <div style={{flex:1}}>
                                            <button className="btn">Delete</button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;
