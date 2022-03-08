import React from "react";
import { Link } from "react-router-dom";
import Deck from "./Deck";

function DeckList({decks}) {

    const allDecks = decks.map((deck, index) => {
        return (
            <Deck deck={deck} key={index}/>
        );
    })

    return (
        <div>
            <Link to="/decks/new" className="btn btn-secondary">+ Create Deck</Link>
            {allDecks}
        </div>
    );
}

export default DeckList;