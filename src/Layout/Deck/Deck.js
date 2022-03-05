import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { readDeck } from "../../utils/api";
import CardsList from "./CardsList";

function Deck() {
    const params = useParams();
    const deckId = params.deckId;

    const [deck, setDeck] = useState({});

    useEffect(() => {
        const abortController = new AbortController();

        async function loadDeck() {
            try {
                const response = await readDeck(deckId);
                setDeck(response);
            } catch(error) {
                console.log(error);
            }
        }

        loadDeck();
        return () => abortController.abort();
    }, [deckId])

    const deleteHandler = () => {
        window.confirm("Delete this deck? \n\nYou will not be able to recover it");
    }


    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item active">{deck.name}</li>
                </ol>
            </nav>
            <h5>{deck.name}</h5>
            <p>{deck.description}</p>
            <div className="d-flex flex-row">
                <Link to={`/decks/${deck.id}/edit`} className="btn btn-secondary">Edit</Link>
                <Link to={`/decks/${deck.id}/study`} className="btn btn-primary">Study</Link>
                <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-primary">Add Cards</Link>
                <button type="button" className="btn btn-danger" onClick={deleteHandler}>Delete</button>
            </div>
            <h2>Cards</h2>
            <CardsList cards={deck.cards} deckId={deckId}/>
        </div>
    )
}

export default Deck;