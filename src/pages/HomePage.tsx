import { Link } from 'react-router-dom';

function HomePage() {
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
        </ul>
      </nav>
    </div>
  );
}

export default HomePage; 