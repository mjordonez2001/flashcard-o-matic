import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { readDeck, readCard } from "../../utils/api";

///decks/:deckId/cards/:cardId/edit

function EditCard() {
    const params = useParams();
    const deckId = params.deckId;
    const cardId = params.cardId;

    const [deck, setDeck] = useState({});
    const [card, setCard] = useState({});

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

        async function loadCard() {
            try {
                const response = await readCard(cardId);
                setCard(response);
            } catch(error) {
                console.log(error);
            }
        }

        loadDeck();
        loadCard();

        return () => abortController.abort();
    }, [deckId, cardId])

    const handleSubmit = () => {

    }
 
    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>Deck {deck.name}</Link></li>
                    <li className="breadcrumb-item active">Edit Card {cardId}</li>
                </ol>
            </nav>
            <h3>Edit Card</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Front</label>
                    <textarea 
                        className="form-control" 
                        id="name" 
                        value={card.front}
                        placeholder={card.front} />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Back</label>
                    <textarea 
                        className="form-control" 
                        id="description" 
                        value={card.back}
                        placeholder={card.back} />
                </div>
                <div className="d-flex flex-row">
                    <Link to={`/decks/${deck.id}`} className="btn btn-secondary">Cancel</Link>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default EditCard;