import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import StudyCategoryPage from './pages/StudyCategoryPage';
import QuizCategoryPage from './pages/QuizCategoryPage';
import StatsPage from './pages/StatsPage';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/study" element={<StudyCategoryPage />} />
      <Route path="/quiz" element={<QuizCategoryPage />} />
      <Route path="/stats" element={<StatsPage />} />
    </Routes>
  );
}

export default App;
