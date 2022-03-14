import React, {useState, useEffect} from "react";
import {Link, useHistory} from "react-router-dom";
import { createCard, deleteCard } from "../../utils/api";

function Form({deck, cardFront, cardBack, formType, cardId}) {

    // initial form data
    const initialCardData = {
        front: "",
        back: ""
    }
    // creates a state for the card form data 
    const [cardData, setCardData] = useState({...initialCardData});
    const history = useHistory();

    // sets the cardData to the current card data
    useEffect(() => {
        setCardData({
            front: cardFront,
            back: cardBack,
            deckId: deck.id
        });
    }, [cardBack, cardFront, deck.id])

    // sets the cardData to the target value when the value of the form changes
    const handleChange = ({target}) => {
        setCardData({
            ...cardData,
            [target.name]: target.value
        });
    }

    // when the user submits, it adds/edits a card based on the cardData
    const handleSubmit = (event) => {
        event.preventDefault();

        if (formType === "add") {
            createCard(deck.id, cardData);
        } else if (formType === "edit") {
            deleteCard(cardId);
            createCard(deck.id, cardData);
        }

        history.push(`/decks/${deck.id}`);
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
                    required
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
                    required
                    value={cardData.back}
                    onChange={handleChange}
                    placeholder="Back side of card" />
            </div>
            <div className="d-flex flex-row">
                <Link to={`/decks/${deck.id}`} className="btn btn-secondary mr-2">Cancel</Link>
                <button type="submit" className="btn btn-primary">Save</button>
            </div>
        </form>
    )
}

export default Form;