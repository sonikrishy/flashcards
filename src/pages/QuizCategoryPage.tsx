import { Link } from 'react-router-dom';

import { flashcards } from '../data/flashcards';
import './QuizCategoryPage.css';

function QuizCategoryPage() {
  const categories = [...new Set(flashcards.map((card) => card.category))];

  return (
    <div className="quiz-category-container">
      <Link to="/" className="back-link">
        &larr; Back to Home
      </Link>
      <h1>Quiz Mode - Select a Category</h1>
      <div className="category-list">
        {categories.map((category) => (
          <Link
            key={category}
            to={`/quiz/${category}`}
            className="category-link"
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default QuizCategoryPage; 