import React, { useState, useEffect } from "react";
import { listDecks } from "../../utils/api";
import { Link } from "react-router-dom";
import Deck from "./Deck";

// lists all the decks in the home page
function Decks() {
    // creates a state for all the decks
    const [decks, setDecks] = useState([]);

    // loads all decks
    useEffect(() => {
        const abortController = new AbortController();

        async function loadDecks() {
            try {
                const response = await listDecks();
                setDecks(response);
            } catch(error) {
                console.log(error);
            }
        }

        loadDecks();
        return () => abortController.abort();
    }, []);


    // maps all decks into the Deck component
    const allDecks = decks.map((deck, index) => {
        return (
            <Deck deck={deck} key={index} />
        );
    })

    // html
    return (
        <div>
            <Link to="/decks/new" className="btn btn-secondary">+ Create Deck</Link>
            {allDecks}
        </div>
    );
}

export default Decks;