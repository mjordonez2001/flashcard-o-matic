import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck } from "../../utils/api";

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
            <h3>{deck.name}: Add Card</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Front</label>
                    <textarea className="form-control" id="name" placeholder="Front side of card" />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Back</label>
                    <textarea className="form-control" id="description" placeholder="Back side of card" />
                </div>
                <div className="d-flex flex-row">
                    <Link to={`/decks/${deck.id}`} className="btn btn-secondary">Done</Link>
                    <button type="submit" className="btn btn-primary">Save</button>
                </div>
            </form>
        </div>
    )
}

export default AddCard;