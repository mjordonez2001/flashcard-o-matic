import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck } from "../../utils/api";
import Form from "./Form";

function AddCard() {
    // crates a deckId based on the params
    const params = useParams();
    const deckId = params.deckId;

    // creates a state for the current deck
    const [deck, setDeck] = useState({});

    // loads the deck
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

    // html -- uses Form component
    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                    <li className="breadcrumb-item active">Add Card</li>
                </ol>
            </nav>
            <h3>{deck.name}: Add Card</h3>
            <Form deck={deck} cardFront="" cardBack="" formType="add"/>
        </div>
    )
}

export default AddCard;