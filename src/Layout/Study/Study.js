import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { readDeck } from "../../utils/api";
import Card from "./Card";

// study page
function Study() {
    // crates deckId based on params that is used in useEffect
    const params = useParams();
    const deckId = params.deckId;

    // creates a state for the current deck
    const [deck, setDeck] = useState({});

    // loads the current deck
    useEffect(() => {
        const abortController = new AbortController();

        async function loadDeck() {
            try {
                const response = await readDeck(deckId);
                setDeck(response);
            } catch (error) {
                console.log(error);
            }
        }

        loadDeck();
        return () => abortController.abort();
    }, [deckId])

    // does not load page until deck has loaded 
    if (!deck.name) return null

    // makes sure the deck has cards to use deckLength for the number of cards in the deck
    let deckLength = 0;
    if (deck.cards && deck.cards.length) deckLength = deck.cards.length;

    // html
    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                    <li className="breadcrumb-item active">Study</li>
                </ol>
            </nav>
            <h3 className="my-3">Study: {deck.name}</h3>
            <Card deck={deck} deckLength={deckLength}/>
        </div>
    )
}

export default Study;