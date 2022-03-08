import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { readDeck, readCard } from "../../utils/api";

///decks/:deckId/cards/:cardId/edit

function ModifyCard( { type } ) {
    const params = useParams();
    const deckId = params.deckId;
    const cardId = params.cardId;

    const [deck, setDeck] = useState({});
    const [card, setCard] = useState({});
    const [form, setForm] = useState("");

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

        setForm(type);

        return () => abortController.abort();
    }, [deckId, cardId])

    const handleSubmit = () => {

    }

    let title = "";
    let frontValue = "";
    let backValue = "";

    if (form === "add") {
        title = "Add Card"
        frontValue = "Front side of card";
        backValue = "Back side of card";

    } else {
        title = `Edit Card`;
        frontValue = card.front;
        backValue = card.back;
    }
 
    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                    <li className="breadcrumb-item active">{title} {cardId}</li>
                </ol>
            </nav>
            <h3>{title}</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Front</label>
                    <textarea 
                        className="form-control" 
                        id="name" 
                        value={frontValue}
                        placeholder={frontValue} />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Back</label>
                    <textarea 
                        className="form-control" 
                        id="description" 
                        value={backValue}
                        placeholder={backValue} />
                </div>
                <div className="d-flex flex-row">
                    <Link to={`/decks/${deck.id}`} className="btn btn-secondary">Cancel</Link>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default ModifyCard;