import React from "react";
import { Link } from "react-router-dom"

// a single card component
function Card( { card, deckId } ) {

    // TODO: delete the card when user clicks delete button

    // deletes card if user clicks delete button
    const deleteHandler = () => {
        window.confirm("Delete this card? \n\nYou will not be able to recover it");
    }

    // html
    return (
        <div className="card my-2 p-3">
            <div className="d-flex flex-row justify-content-between">
                <div className="card-text col-5">{card.front}</div>
                <div className="card-text col-5">{card.back}</div>
            </div>
            <div className="d-flex flex-row justify-content-end mt-3">
                <Link to={`/decks/${deckId}/cards/${card.id}/edit`} className="btn btn-secondary mr-2">Edit</Link>
                <button className="btn btn-danger mr-2" onClick={deleteHandler}>Delete</button>
            </div>

        </div>
    )
}

export default Card;