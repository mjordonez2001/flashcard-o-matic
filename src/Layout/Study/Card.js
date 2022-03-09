import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";

// card component for study page
function Card({deck, deckLength}) {
    
    // creates state for the current card index, the current card display, and if the card is flipped or not
    const [cardIndex, setCardIndex] = useState(0);
    const [cardDisplay, setCardDisplay] = useState("");
    const [flipped, setFlipped] = useState(false);
    const history = useHistory();

    // makes sure the deck is valid and sets the card display to the front of card upon loading
    useEffect(() => {
        if (!deck.cards || !deck.cards.length) return;
        setCardDisplay(deck.cards[cardIndex].front);
    }, [deck, cardIndex]);

    // if there are less than 3 cards, displays a message telling the user they need to add more cards to study
    if (deckLength < 3) {
        return (
            <div>
                <h2>Not enough cards.</h2>
                <p>You need at least 3 cards to study. There are {deckLength} cards in this deck.</p>
                <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-primary">+ Add Cards</Link>
            </div>
        )
    }

    // handles flip
    const flipHandler = () => {
        // when the card is flipped, it sets the display to the front/back of the card
        if (cardDisplay === deck.cards[cardIndex].front) {
            setCardDisplay(deck.cards[cardIndex].back);
        } else {
            setCardDisplay(deck.cards[cardIndex].front);
        }

        // used to know if the user can move on to the next card
        if (!flipped) {
            setFlipped(true);
        }
        
    }

    // handles next card
    const nextHandler = () => {
        // when the user clicks on the next card, it increases the card index by one
        if (cardIndex < deck.cards.length-1) {
            setCardIndex((currentID) => currentID + 1);
        }  else {
            // if there are no more cards left, prompts the user to restart the stack or go to the home page
            if (window.confirm("Restart cards? \n\nClick 'cancel' to return to the home page.")) {
                setCardIndex(0);
            } else {
                history.push("/");
            }
        }

        // used to know if the user can go to the next card
        setFlipped(false);
    }

    // creates a button variable that only shows if the user has already flipped the current card
    let nextButton;
    if (flipped) {
        nextButton = (<button className="btn btn-primary" onClick={nextHandler}>Next</button>);
    }

    //html
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