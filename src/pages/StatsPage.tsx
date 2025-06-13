import { Link } from 'react-router-dom';

function StatsPage() {
  return (
    <div>
      <Link to="/" className="back-link">
        &larr; Back to Home
      </Link>
      <h1>Statistics</h1>
      {/* Stats display will be implemented in Phase 5 */}
    </div>
  );
}

export default StatsPage; 