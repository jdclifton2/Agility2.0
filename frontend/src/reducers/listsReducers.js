import { CONSTANTS } from "../actions";

let listID = 2;
let cardID = 5;


const initialState = [
    {
        title: "Must",
        id: `list-${0}`,
        cards: [
            {
                id: `card-${0}`,
                text: "This is static data"
            },
            {
                id: `card-${1}`,
                text: "We are going to be implementing data from the API later"
            }
        ]
    },
    {
        title: "Should",
        id: `list-${1}`,
        cards: [
            {
                id: `card-${2}`,
                text: "This data SHOULDn't be static"
            },
            {
                id: `card-${3}`,
                text: "It should be dynamic"
            },
            {
                id: `card-${4}`,
                text: "Maybe one day... who knows?"
            }
        ]
    },
    {
        title: "Would",
        id: `list-${2}`,
        cards: [
            {
                id: `card-${5}`,
                text: "We will also add more features to our cards"
            },
            {
                id: `card-${6}`,
                text: "Such as a pop window for adding comments and what not"
            }
        ]
    }
]


const listsReducers = (state = initialState, action) => {
    switch(action.type) {

        case CONSTANTS.ADD_LIST:
            const newList = {
                title: action.payload,
                cards: [],
                id: `list-${listID}`
            }
            listID += 1
            return [...state, newList];

        case CONSTANTS.ADD_CARD: {
            const newCard = {
                text: action.payload.text,
                id: `card-${cardID}`
            };
            cardID += 1

            const newState = state.map(list => {
                if(list.id === action.payload.listID) {
                    return {
                        ...list,
                        cards: [...list.cards, newCard]
                    };
                } else {
                    return list;
                }
            });

            return newState;
        }

        case CONSTANTS.DRAG_HAPPENED:
            const {
                droppableIdStart,
                droppableIdEnd,
                droppableIndexStart,
                droppableIndexEnd,
                draggableId
            } = action.payload;
            const newState = [...state];

            // same list
            if(droppableIdStart === droppableIdEnd) {
                const list = state.find(list => droppableIdStart === list.id);
                const card = list.cards.splice(droppableIndexStart, 1)
                list.cards.splice(droppableIndexEnd, 0, ...card)
            }

            return newState;

        default:
            return state;
    }
};

export default listsReducers;