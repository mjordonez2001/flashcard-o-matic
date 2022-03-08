import { useState } from "react";
import React from "react";

function Form( { deck, cardFront, cardBack, formType } ) {

    const initialCardData = {
        
    }
    const [card, setCard] = useState({});

    const changeHandler = () => {

    }

    return (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Front</label>
                    <textarea 
                        className="form-control" 
                        id="name" 
                        name="front"
                        required
                        value={cardFront}
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
                        value={cardBack}
                        onChange={changeHandler}
                        placeholder={backValue} />
                </div>
                <div className="d-flex flex-row">
                    <Link to={`/decks/${deck.id}`} className="btn btn-secondary">Cancel</Link>
                    <button type="submit" className="btn btn-primary">Save</button>
                </div>
            </form>
    )

}

export default Form;

