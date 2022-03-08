import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { readDeck, readCard, createCard, updateCard } from "../../utils/api";

function ModifyCard( { type } ) {
    const params = useParams();
    const deckId = params.deckId;
    const cardId = params.cardId;
    const history = useHistory();

    let initialCardData = {};
    if (!cardId) {
        initialCardData ={
            id: 0,
            front: "",
            back: "",
            deckId: deckId
        } 
    }
        

    const [deck, setDeck] = useState({});
    const [card, setCard] = useState({});
    const [cardData, setCardData] = useState({...initialCardData});

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
        if (cardId) {
            loadCard();
            setCardData({
                id: cardId,
                front: card.front,
                back: card.back,
                deckId: deckId,
                works: true
            })
            console.log(cardData.works)
        }

        return () => abortController.abort();
    }, [deckId, cardId, type])

    const changeHandler = ({target}) => {
        setCardData({
            ...cardData,
            [target.name]: target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        

        if (!cardId) {
            setCardData({
                ...cardData,
                id: deck.length
            })
        }

        if (type === "add") {
            /*
            console.log(cardData)
            createCard(cardData); */
            setCardData({
                ...initialCardData
            })
        } else {
            updateCard(cardData);
            history.push(`/decks/${deckId}`)
        }
    }

    let title = "";
    let frontValue = "";
    let backValue = "";

    if (type === "add") {
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
                        name="front"
                        required
                        value={cardData.front}
                        onChange={changeHandler}
                        placeholder={frontValue} />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Back</label>
                    <textarea 
                        className="form-control" 
                        id="description" 
                        name="back"
                        required
                        value={cardData.back}
                        onChange={changeHandler}
                        placeholder={backValue} />
                </div>
                <div className="d-flex flex-row">
                    <Link to={`/decks/${deck.id}`} className="btn btn-secondary">Cancel</Link>
                    <button type="submit" className="btn btn-primary">Save</button>
                </div>
            </form>
        </div>
    )
}

export default ModifyCard;