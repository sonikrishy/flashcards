import { Link } from 'react-router-dom';
import { useIncorrectCards } from '../context/IncorrectCardsContext';

/**
 * The main landing page of the application.
 * It provides navigation to the primary modes (Study, Quiz, Stats).
 * It also conditionally displays options for "Redo" mode if there are any
 * cards that have been marked as incorrect.
 */
function HomePage() {
  const { incorrectCards, clearIncorrectCards } = useIncorrectCards();

  return (
    <div>
      <h1>Spanish Flashcards</h1>
      <p>Welcome! Choose a mode below to get started.</p>
      <nav>
        <ul>
          <li>
            <Link to="/study" className="study-button">Study Mode</Link>
          </li>
          <li>
            <Link to="/quiz" className="quiz-button">Quiz Mode</Link>
          </li>
          <li>
            <Link to="/stats" className="stats-button">Stats Page</Link>
          </li>
          {incorrectCards.length > 0 && (
            <>
              <li>
                <Link to="/study/redo" className="redo-button">
                  Redo Wrong Cards ({incorrectCards.length})
                </Link>
              </li>
              <li>
                <button onClick={clearIncorrectCards} className="clear-button">
                  Clear Incorrect Cards
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default HomePage; 