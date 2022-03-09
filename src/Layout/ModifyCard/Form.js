import React, {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import { createCard } from "../../utils/api";

function Form({deck, cardFront, cardBack, formType}) {

    // TODO: make sure the form values start with the current card data
    // TODO: properly add and edit cards using the API

    // initial form data
    const initialCardData = {
        front: cardFront,
        back: cardBack
    }
    // creates a state for the card form data 
    const [cardData, setCardData] = useState({...initialCardData});
    //const history = useHistory();

    // sets the cardData to the target value when the value of the form changes
    const handleChange = ({target}) => {
        setCardData({
            ...cardData,
            [target.name]: target.value
        })
        console.log(cardData)
    }

    // when the user submits, it adds/edits a card based on the cardData
    const handleSubmit = (event) => {
        event.preventDefault();

        if (formType === "add") {
            createCard(cardData);
            setCardData({...initialCardData})
            //history.push(`decks/${deck.id}`)
        }
    }

    //html
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="front">Front</label>
                <textarea 
                    className="form-control" 
                    id="front" 
                    name="front"
                    value={cardData.front}
                    onChange={handleChange}
                    placeholder="Front side of card" />
            </div>
            <div className="form-group">
                <label htmlFor="back">Back</label>
                <textarea
                    className="form-control" 
                    id="back" 
                    name="back"
                    value={cardData.back}
                    onChange={handleChange}
                    placeholder="Back side of card" />
            </div>
            <div className="d-flex flex-row">
                <Link to={`/decks/${deck.id}`} className="btn btn-secondary mr-2">Done</Link>
                <button type="submit" className="btn btn-primary">Save</button>
            </div>
        </form>
    )
}

export default Form;