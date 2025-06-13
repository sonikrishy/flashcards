import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { flashcards } from '../data/flashcards';
import Flashcard from '../components/Flashcard';

function StudyPage() {
  const { category } = useParams<{ category: string }>();
  const [currentIndex, setCurrentIndex] = useState(0);

  const categoryCards = flashcards.filter((card) => card.category === category);

  if (!category) {
    return <div>Category not found.</div>;
  }

  const handleNextCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % categoryCards.length);
  };

  const currentCard = categoryCards[currentIndex];

  return (
    <div>
      <Link to="/study" className="back-link">
        &larr; Back to Categories
      </Link>
      <h1>Studying: {category.charAt(0).toUpperCase() + category.slice(1)}</h1>
      {currentCard ? (
        <>
          <Flashcard front={currentCard.spanish} back={currentCard.english} />
          <button onClick={handleNextCard} className="nav-button">
            Next Card &rarr;
          </button>
        </>
      ) : (
        <p>No cards found in this category.</p>
      )}
    </div>
  );
}

export default StudyPage; 