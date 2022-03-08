import React from "react";
import { Link } from "react-router-dom"

function Card( { card, deckId } ) {
    const deleteHandler = () => {
        if (window.confirm("Delete this card? \n\nYou will not be able to recover it")) {
            
        }

    }

    return (
        <div className="card">
            <div className="d-flex flex-row justify-content-between">
                <div className="card-text">{card.front}</div>
                <div className="card-text">{card.back}</div>
            </div>
            <div className="d-flex flex-row justify-content-end">
                <Link to={`/decks/${deckId}/cards/${card.id}/edit`} className="btn btn-secondary">Edit</Link>
                <button className="btn btn-danger" onClick={deleteHandler}>Delete</button>
            </div>

        </div>
    )
}

export default Card;