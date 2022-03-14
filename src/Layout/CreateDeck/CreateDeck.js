import React, {useState} from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../../utils/api";

// creates a new deck
function CreateDeck() {

    // initializes the form data for deckData state
    const initialDeckData = {
        name: "",
        description: ""
    }
    const [deckData, setDeckData] = useState({...initialDeckData});
    const history = useHistory();

    // updates deckData on change
    const handleChange = ({target}) => {
        setDeckData({
            ...deckData,
            [target.name]: target.value
        });
    }

    // creates a new deck based on deckData, resets the form, and takes user back to home screen
    const handleSubmit = (event) => {
        event.preventDefault();
        createDeck(deckData);

        setDeckData({...initialDeckData});
        history.push(`/`);
    }

    // html
    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item active">Create Deck</li>
                </ol>
            </nav>
            <h3>Create Deck</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="name" 
                        name="name"
                        value={deckData.name}
                        onChange={handleChange}
                        required
                        placeholder="Deck Name" />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea 
                        className="form-control" 
                        id="description" 
                        name="description"
                        value={deckData.description}
                        onChange={handleChange}
                        required
                        placeholder="Brief description of the deck" />
                </div>
                <div className="d-flex flex-row">
                    <Link to="" className="btn btn-secondary mr-2">Cancel</Link>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default CreateDeck;