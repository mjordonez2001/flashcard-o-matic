import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"
import { readDeck } from "../../utils/api";

function EditDeck() {
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
                    <li className="breadcrumb-item"><Link to="">{deck.name}</Link></li>
                    <li className="breadcrumb-item active">Edit Deck</li>
                </ol>
            </nav>
            <h1>Edit Deck</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="name" 
                        value={deck.name}
                        placeholder={deck.name} />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea 
                        className="form-control" 
                        id="description" 
                        value={deck.description}
                        placeholder={deck.description} />
                </div>
                <div className="d-flex flex-row">
                    <Link to={`/decks/${deck.id}`} className="btn btn-secondary">Cancel</Link>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default EditDeck;