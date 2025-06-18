import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { flashcards } from '../data/flashcards';
import './QuizPage.css';

function QuizPage() {
  const { category } = useParams<{ category: string }>();
  const quizCards = flashcards.filter((card) => card.category === category);

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  if (!quizCards.length) {
    return (
      <div>
        <h2>No quiz available for this category.</h2>
        <Link to="/quiz">Back to Categories</Link>
      </div>
    );
  }

  const currentCard = quizCards[currentCardIndex];

  const handleOptionClick = (option: string) => {
    if (showFeedback) return; // Prevent changing answer after submission

    setSelectedOption(option);
    setShowFeedback(true);

    if (option === currentCard.english) {
      setScore(score + 1);
    }
  };

  const handleNextClick = () => {
    setShowFeedback(false);
    setSelectedOption(null);
    setCurrentCardIndex(currentCardIndex + 1);
  };

  if (currentCardIndex >= quizCards.length) {
    return (
      <div className="quiz-results">
        <h1>Quiz Complete!</h1>
        <p>Your final score is: {score} out of {quizCards.length}</p>
        <Link to="/quiz" className="back-link">Try another category</Link>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <Link to="/quiz" className="back-link">&larr; Back to Categories</Link>
      <div className="quiz-header">
        <h1>Quiz: {category?.charAt(0).toUpperCase() + category!.slice(1)}</h1>
        <p className="score">Score: {score}</p>
      </div>
      <div className="quiz-card">
        <p className="question">{currentCard.spanish}</p>
      </div>
      <div className="options-container">
        {currentCard.quiz.options.map((option) => {
          const isCorrect = option === currentCard.english;
          const isSelected = option === selectedOption;
          let buttonClass = 'option-button';
          if (showFeedback && isSelected) {
            buttonClass += isCorrect ? ' correct' : ' incorrect';
          } else if (showFeedback && isCorrect) {
            buttonClass += ' correct';
          }

          return (
            <button
              key={option}
              className={buttonClass}
              onClick={() => handleOptionClick(option)}
              disabled={showFeedback}
            >
              {option}
            </button>
          );
        })}
      </div>
      {showFeedback && (
        <button className="next-button" onClick={handleNextClick}>
          {currentCardIndex < quizCards.length - 1 ? 'Next' : 'Finish'}
        </button>
      )}
    </div>
  );
}

export default QuizPage;
