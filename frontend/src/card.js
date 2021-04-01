import React from 'react';
import './App.css';

/**
 * This Class will act as our Card component. It will retrieve Card information
 * from the django API and render cards on the frontend.
 */
class Card extends React.Component {
    /** Constructor to represent a card in JSON form. **/
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
        // This is used to "bind" our methods with our component.
        this.fetchTasks = this.fetchTasks.bind(this);
        //this.handleChange = this.handleChange.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.handleComment = this.handleComment.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getCookie = this.getCookie.bind(this);

    };

    /**
     * This method is responsible for making API calls to the server by calling
     * the fetchTasks() method.
     */
    componentWillMount() {
        this.fetchTasks()
    }

    /**
     * not sure what this is for yet. Just copied it from the django documentation.
     * Apparently csrf tokens are important
     * @param name
     * @returns {null}
     */
    getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            let cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                let cookie = cookies[i].trim();

                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    /**
     * This function will make an API call to the server to retrieve card data;
     * Said data will be used to display cards on the frontend.
     */
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

    /**
     * This function is used to handle the name submission for when the user
     * is creating a card. When the user inputs a title for the card, this
     * function will store the title value to its correspondent field in our
     * component.
     * @param e in this case, this is the title input element.
     */
    handleName(e) {
        this.setState({
            activeItem:{
                ...this.state.activeItem,
                title: e.target.value,
            },
        })
    }

    /**
     * This function is used to handle the description submission for when the user
     * is creating a card. When the user inputs a description for the card, this
     * function will store the description value to its correspondent field in our
     * component.
     * @param e in this case, this is the description input element.
     */
    handleDescription(e) {
        this.setState({
            activeItem: {
                ...this.state.activeItem,
                description: e.target.value,
            }
        })
    }

    /**
     * This function is used to handle the comment submission for when the user
     * is creating a card. When the user inputs a comment for the card, this
     * function will store the comment value to its correspondent field in our
     * component.
     * @param e in this case, this is the comment input element.
     */
    handleComment(e) {
        this.setState({
            activeItem: {
                ...this.state.activeItem,
                comment: e.target.value,
            }
        })
    }

    /**
     * This function is invoked when the "submit" button is clicked. This
     * function will fetch our API and post our new, user-created data to the
     * backend in JSON form and stores it in the database. Finally, this
     * function will clear out our component for future submissions by the user.
     */
    handleSubmit(e) {
        e.preventDefault()
        console.log('Item: ', this.state.activeItem)

        var csrftoken = this.getCookie('csrftoken');

        var url = 'http://localhost:8000/api/cards'

        if(this.state.editing === true) {
            url = `http://localhost:8000/api/cards/${this.state.activeItem.id}/`
            this.setState({
                editing:false
            })
        }

        fetch(url, {
            method: 'POST',
            headers:{
                'Content-type': 'application/json',
                'X-CSRFToken' : csrftoken,
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

    /**
     * This is supposed to allow the user to edit the card. Does not work yet.
     * @param card A single card component
     */
    startEdit(card) {
        this.setState({
            activeItem: card,
            editing: true,
        })
    }

    /**
     * This function returns a JSX element which will be what we're going to
     * show on the frontend.
     * @returns {JSX.Element}
     */
    render() {
        let cards = this.state.cardList;
        let self = this;
        return (
            <div className="container">

                <div id="task-container">
                    <div id="form-wrapper">
                        <form onSubmit={this.handleSubmit} id="form" method="post">
                            <div className="flex-wrapper">
                                <div style={{flex: 6}}>
                                    <input onChange={this.handleName} className="form-control" id="title" type="text" name="title" placeholder="Title"/>
                                </div>

                                <div style={{flex: 6}}>
                                    <input onChange={this.handleDescription} className="form-control" id="description" type="text" name="description" placeholder="Description"/>
                                </div>

                                <div style={{flex: 6}}>
                                    <input onChange={this.handleComment} className="form-control" id="comment" type="text" name="comment" placeholder="Comment"/>
                                </div>

                                <div style={{flex: 1}}>
                                    <input id="submit" className="btn" value="Create Card" type="submit"/>
                                </div>
                            </div>
                        </form>

                        <div id="list-wrapper">
                            {cards.map(function(card, index) {
                                return(
                                    <div key={index} className="task-wrapper flex-wrapper">
                                        <div style={{flex: 7}}>
                                            <pre id="card-title">{card.title}</pre>
                                            <span className="card-details">Description:</span>
                                            <pre className="details">  {card.description}</pre>
                                            <span className="card-details">Comment:</span>
                                            <pre className="details">  {card.comment}</pre>
                                            <span className="card-details">Created_at:</span>
                                            <pre className="details"> {card.created_at}</pre>
                                        </div>

                                        <div style={{flex:1}}>
                                            <button onClick={() => self.startEdit(card)} className="btn">Edit</button>
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
export default Card