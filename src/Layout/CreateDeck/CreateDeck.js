import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../../utils/api";

function CreateDeck() {
    const initialFormState = {
        name: "",
        description: ""
    }

    const [formData, setFormData] = useState({...initialFormState});  
    const history = useHistory();

    const handleChange = ({target}) => {
        setFormData({
            ...formData,
            [target.name]: target.value
        })
        console.log(formData);
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        setFormData({...initialFormState});

        await createDeck(formData);

        history.push(`/decks/${deckID}`)
        newDeckHandler();
    }


    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item active">Create Deck</li>
                </ol>
            </nav>
            <h1>Create Deck</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="name"
                        name="name" 
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Deck Name" />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea 
                        className="form-control" 
                        id="description" 
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Brief description of the deck" />
                </div>
                <div className="d-flex flex-row">
                    <Link to="" className="btn btn-secondary">Cancel</Link>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default CreateDeck;