import React from "react";
import Card from "./Card";

function CardsList( { cards = [], deckId} ) {

    const allCards = !!cards.length && cards.map((card, i) => {
        if (!card || !card.id) return null;

        return <Card key={i} card={card} deckId={deckId}/>
    })

    return (
        <div>
            {allCards}
        </div>
    )
}

export default CardsList;