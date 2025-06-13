import { Link } from 'react-router-dom';
import { flashcards } from '../data/flashcards';

const categories = [...new Set(flashcards.map((card) => card.category))];

function StudyCategoryPage() {
  return (
    <div>
      <Link to="/" className="back-link">
        &larr; Back to Home
      </Link>
      <h1>Study Mode - Select a Category</h1>
      <div className="category-list">
        {categories.map((category) => (
          <Link
            key={category}
            to={`/study/${category}`}
            className="category-link"
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default StudyCategoryPage; 