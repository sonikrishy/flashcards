import { Link } from 'react-router-dom';

function QuizCategoryPage() {
  return (
    <div>
      <Link to="/" className="back-link">
        &larr; Back to Home
      </Link>
      <h1>Quiz Mode - Select a Category</h1>
      {/* Category selection will be implemented in Phase 4 */}
    </div>
  );
}

export default QuizCategoryPage; 