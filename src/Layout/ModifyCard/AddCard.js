import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck } from "../../utils/api";
import Form from "./Form";

function AddCard() {
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

    const handleSubmit = () => {

    }

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                    <li className="breadcrumb-item active">Add Card</li>
                </ol>
            </nav>
            <h3>{title}</h3>
            <Form deck={deck} cardFront={""} cardBack={""} formType={"add"}/>
        </div>
        
    )
}

export default AddCard; 