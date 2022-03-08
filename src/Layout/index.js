import React, { Fragment, useState, useEffect } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import DeckList from "./Home/DeckList";
import Study from "./Study/Study";
import CreateDeck from "./CreateDeck/CreateDeck";
import Deck from "./Deck/Deck";
import EditDeck from "./EditDeck/EditDeck";
import ModifyCard from "./ModifyCard/ModifyCard";
import { Route, Switch } from "react-router-dom";
import { listDecks } from "../utils/api";

function Layout() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();

    async function loadDecks() {
        try {
            const response = await listDecks();
            setDecks(response);
        } catch(error) {
            console.log(error);
        }
    }

    loadDecks();
    setDeckID(decks.length+1);

    return () => abortController.abort();
}, [decks]);

  return (
    <Fragment>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <DeckList decks={decks} />
          </Route>

          <Route path="/decks/:deckId/study">
            <Study />
          </Route>

          <Route path="/decks/new">
            <CreateDeck />
          </Route>

          <Route exact path="/decks/:deckId">
            <Deck />
          </Route>

          <Route path="/decks/:deckId/edit">
            <EditDeck />
          </Route>

          <Route path="/decks/:deckId/cards/new">
            <ModifyCard type="add"/>
          </Route>

          <Route path="/decks/:deckId/cards/:cardId/edit">
            <ModifyCard type="edit"/>
          </Route>
            
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Fragment>
  );
}

export default Layout;
