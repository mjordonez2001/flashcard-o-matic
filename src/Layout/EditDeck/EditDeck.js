import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom"
import { readDeck } from "../../utils/api";
import { updateDeck } from "../../utils/api";

// edits the selected deck
function EditDeck() {

    // creates deckId used in useEffect
    const params = useParams();
    const deckId = params.deckId;
    const history = useHistory();

    // initial form data
    const initialDeckData = {
        name: "",
        description: "",
        id: deckId
    }

    // creates a state for the form data (deckData), and a state for the current deck (deck)
    const [deckData, setDeckData] = useState({...initialDeckData})
    const [deck, setDeck] = useState({});

    // loads deck
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

        // if the deck has loaded, set deckData to current deck's data
        if (deck.name) {
            setDeckData({
                name: deck.name,
                description: deck.description,
                id: deckId
            })
        }

        return () => abortController.abort();
    }, [deckId, deck.name, deck.description])

    // changes deckData upon change in form
    const handleChange = ({target}) => {
        setDeckData({
            ...deckData,
            [target.name]: target.value
        })
    }

    // updates the deck with the new deckData and takes user back to deckscreen
    const handleSubmit = (event) => {
        event.preventDefault();
        updateDeck(deckData);
        history.push(`/decks/${deckId}`);
    }

    // html
    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to="">{deck.name}</Link></li>
                    <li className="breadcrumb-item active">Edit Deck</li>
                </ol>
            </nav>
            <h3>Edit Deck</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="name" 
                        name="name"
                        onChange={handleChange}
                        value={deckData.name}
                        placeholder={deck.name} />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea 
                        className="form-control" 
                        id="description" 
                        name="description"
                        onChange={handleChange}
                        value={deckData.description}
                        placeholder={deck.description} />
                </div>
                <div className="d-flex flex-row">
                    <Link to={`/decks/${deck.id}`} className="btn btn-secondary mr-2">Cancel</Link>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default EditDeck;