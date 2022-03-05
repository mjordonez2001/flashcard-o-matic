import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";

function Card({deck, deckLength}) {
    const [cardIndex, setCardIndex] = useState(0);
    const [cardDisplay, setCardDisplay] = useState("");
    const [flipped, setFlipped] = useState(false);
    const history = useHistory();

    useEffect(() => {
        if (!deck.cards || !deck.cards.length) return;
        setCardDisplay(deck.cards[cardIndex].front);
    }, [deck, cardIndex]);

    if (deckLength < 3) {
        return (
            <div>
                <h2>Not enough cards.</h2>
                <p>You need at least 3 cards to study. There are {deckLength} cards in this deck.</p>
                <Link to="" className="btn btn-primary">+ Add Cards</Link>
            </div>
        )
    }

    const flipHandler = () => {
        if (cardDisplay === deck.cards[cardIndex].front) {
            setCardDisplay(deck.cards[cardIndex].back);
        } else {
            setCardDisplay(deck.cards[cardIndex].front);
        }

        if (!flipped) {
            setFlipped(true);
        }
        
    }

    const nextHandler = () => {
        if (cardIndex < deck.cards.length-1) {
            setCardIndex((currentID) => currentID + 1);
        }  else {
            if (window.confirm("Restart cards? \n\nClick 'cancel' to return to the home page.")) {
                setCardIndex(0);
            } else {
                history.push("/");
            }
        }

        setFlipped(false);
    }

    let nextButton;
    if (flipped) {
        nextButton = (<button className="btn btn-primary" onClick={nextHandler}>Next</button>);
    }

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Card {cardIndex+1} of {deckLength}</h5>
                <p className="card-text">{cardDisplay}</p>
                <div>
                    <button className="btn btn-secondary" onClick={flipHandler}>Flip</button>
                    {nextButton}
                </div>
            </div>
        </div>
    ) 
    
}

export default Card;