import React, {  } from "react";
import { Link } from "react-router-dom";
import { deleteDeck } from "../../utils/api";


function Deck( { deck } ) {

    let deckLength = 0;
    if (deck.cards && deck.cards.length) deckLength = deck.cards.length;

    const deleteHandler = () => {
        if (window.confirm("Delete this deck? \n\nYou will not be able to recover it")) {
            deleteDeck(deck.id)
            window.location.reload();
        }
    }


    return (
        <div className="card">
            <div className="card-body">
                <div className="d-flex flex-row justify-content-between">
                    <h5 className="card-title">{deck.name}</h5>
                    <p className="card-text"><small className="text-muted">{deckLength} cards</small></p>
                </div>
                <p className="card-text">{deck.description}</p>
                <div className="d-flex flex-row justify-content-around">
                    <Link to={`/decks/${deck.id}`} className="btn btn-secondary">View</Link>
                    <Link to={`/decks/${deck.id}/study`}className="btn btn-primary">Study</Link>
                    <button type="button" className="btn btn-danger" onClick={deleteHandler}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default Deck;