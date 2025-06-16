import { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { flashcards } from '../data/flashcards';
import Flashcard from '../components/Flashcard';
import { useIncorrectCards } from '../context/IncorrectCardsContext';

/**
 * The main page for studying flashcards.
 * This component handles both regular category-based study sessions and "Redo" sessions
 * for reviewing incorrectly answered cards. It manages the session state, card navigation,
 * and user answers.
 */
function StudyPage() {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const { incorrectCards, addIncorrectCard, removeIncorrectCard } = useIncorrectCards();

  /**
   * Determines the set of cards to be studied based on the URL parameter.
   * If the category is "redo", it uses the globally stored list of incorrect cards.
   * Otherwise, it filters the main flashcards list by the selected category.
   */
  const categoryCards = useMemo(() => {
    if (category === 'redo') {
      return incorrectCards;
    }
    return flashcards.filter((card) => card.category === category);
  }, [category, incorrectCards]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);
  /**
   * Tracks the number of incorrect answers *within the current study session*.
   * This is used to display a summary at the end of the session.
   */
  const [sessionIncorrectCount, setSessionIncorrectCount] = useState(0);

  if (!category) {
    return <div>Category not found.</div>;
  }

  const handleNextCard = () => {
    if (currentIndex < categoryCards.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setIsFlipped(false);
    } else {
      setSessionComplete(true);
    }
  };

  const handleCardFlip = () => {
    setIsFlipped(true);
  };

  /**
   * Processes the user's answer for the current card.
   * If the answer is incorrect, the card is added to the global `incorrectCards` list.
   * If the session is a "Redo" session and the answer is correct, the card is
   * removed from the global list.
   */
  const handleAnswer = (isCorrect: boolean) => {
    const currentCard = categoryCards[currentIndex];
    if (!isCorrect) {
      addIncorrectCard(currentCard);
      setSessionIncorrectCount(prev => prev + 1);
    } else if (category === 'redo') {
      removeIncorrectCard(currentCard);
    }
    handleNextCard();
  };
  
  /**
   * Resets the current study session to its initial state, allowing the user
   * to study the same set of cards again.
   */
  const handleRestart = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setSessionComplete(false);
    setSessionIncorrectCount(0);
  };

  if (sessionComplete) {
    return (
      <div className="session-complete">
        <h1>Session Complete!</h1>
        <p>You got {sessionIncorrectCount} card(s) wrong.</p>
        {sessionIncorrectCount > 0 && (
           <button className="nav-button" onClick={() => navigate('/study/redo')}>
             Redo Wrong Cards
           </button>
        )}
        <button className="nav-button" onClick={handleRestart}>
          Study Again
        </button>
        <Link to="/study" className="back-link">
          &larr; Back to Categories
        </Link>
      </div>
    );
  }

  const currentCard = categoryCards[currentIndex];
  const pageTitle = category === 'redo' ? 'Redo Incorrect Cards' : `Studying: ${category.charAt(0).toUpperCase() + category.slice(1)}`;

  return (
    <div>
      <Link to="/study" className="back-link">
        &larr; Back to Categories
      </Link>
      <h1>{pageTitle}</h1>
      {currentCard ? (
        <>
          <p className="card-counter">{`Card ${currentIndex + 1} of ${
            categoryCards.length
          }`}</p>
          <Flashcard 
            front={currentCard.spanish} 
            back={currentCard.english} 
            onFlip={handleCardFlip}
          />
          {isFlipped && (
            <div className="answer-buttons">
              <button 
                onClick={() => handleAnswer(true)} 
                className="answer-button correct"
              >
                ✅ Right
              </button>
              <button 
                onClick={() => handleAnswer(false)} 
                className="answer-button incorrect"
              >
                ❌ Wrong
              </button>
            </div>
          )}
        </>
      ) : (
        <div>
          <p>No cards found in this category.</p>
          {category === 'redo' && <p>You have no incorrect cards to review. Great job!</p>}
        </div>
      )}
    </div>
  );
}

export default StudyPage; 