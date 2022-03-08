import React, { useState, useEffect } from "react";
import { listDecks } from "../../utils/api";
import { Link } from "react-router-dom";
import Deck from "./Deck";

function Decks() {
    const [decks, setDecks] = useState([]);

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

    const deleteHandler = () => {
        window.confirm("Delete this deck? \n\nYou will not be able to recover it");
    }

    const allDecks = decks.map((deck, index) => {
        return (
            <Deck deck={deck} key={index} deleteHandler={deleteHandler} />
        );
    })

    return (
        <div>
            <Link to="/decks/new" className="btn btn-secondary">+ Create Deck</Link>
            {allDecks}
        </div>
    );
}

export default Decks;