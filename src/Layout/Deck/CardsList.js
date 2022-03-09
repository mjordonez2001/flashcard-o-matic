import React from "react";
import Card from "./Card";

// the list of cards in the deck screen
function CardsList( { cards = [], deckId} ) {

    // makes sure there are cards, and then maps all cards as a Card component
    const allCards = !!cards.length && cards.map((card, i) => {
        // makes sure the card is valid
        if (!card || !card.id) return null;

        // returns Card component
        return <Card key={i} card={card} deckId={deckId}/>
    })

    // html
    return (
        <div>
            {allCards}
        </div>
    )
}

export default CardsList;