# Flashcard-o-matic

## Summary
Flashcard-o-matic is an app where users can study cards by creating study decks and creating cards within those decks.
This app was built using HTML, CSS, Boostrap, and React. 
The app also uses React Router so that the app is a single page application and allows for faster transitions between pages.

## App Functionality
### Home Screen
<p>
The home screen shows a list of already created decks, with options to view, study, or delete each deck. 
The home screen also contains a button where users can create a new deck.  
</p>

![Home Screen](/README_IMGs/homescreen.png)

### New Deck Screen
<p>
The new deck screen allows users to submit a form creating a new deck with a name and a description.
Clicking the cancel button brings users back to the home screen and clicking the submit button brings users to the deck screen of the newly created deck.
</p>

![New Deck Screen](/README_IMGs/createdeck.png)

### Deck Screen
<p>
The deck screen allows users to see details about the selected deck. Users are able to see the deck name and description, and all of the cards associated with that deck. The deck screen also allows the users to have the option to view, study, add cards to, or delete the selected deck.
Within the deck screen there is a list of cards of all the cards associated with the deck. Users are able to edit and delete each card. 
</p>

![Deck Screen](/README_IMGs/deckscreen.png)

### Edit Deck Screen
<p>
The edit deck screen allows users to submit a form editing the selected deck. It also already contains the original name and description in the text fields so that users are able to easily edit the current deck.
Clicking the cancel or submit button brings the users back to the selected deck screen.
</p> 

![Edit Deck Screen](/README_IMGs/editdeck.png)

### Create Card Screen
<p>
The create card screen allows users to submit a form creating a new card with front and back side within the selected deck.
Clicking the cancel or submit button brings users back to the selected deck screen.
</p>  

![Create Card Screen](/README_IMGs/createcard.png)

### Edit Card Screen
<p>
The edit card screen allows users to submit a form editing the selected card. It also already contains the original front and back side of the card in the text fields so that users are able to easily edit the current card.
Clicking the cancel or submit button brings the users back to the selected deck screen.
</p>

![Edit Card Screeb](/README_IMGs/editcard.png)

### Study Deck Screen
<p>
The study deck screen allows users to study all the cards in the selected deck. Users are able to flip between the front and back side of the cards, and move on to the next card after studying both sides of the current card.
</p>

![Study Deck Screen](/README_IMGs/studydeck.png)
<p>
After the user has studied all cards, the user is asked whether they want to restart the deck. If they click OK, the deck restarts and the user can study the cards all over again, if they click cancel, they are brough back to the home screen.  
</p>

![Restart Deck](/README_IMGs/restart.png)