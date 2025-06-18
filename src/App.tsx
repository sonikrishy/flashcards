import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import StudyCategoryPage from './pages/StudyCategoryPage';
import StudyPage from './pages/StudyPage';
import QuizCategoryPage from './pages/QuizCategoryPage';
import QuizPage from './pages/QuizPage';
import StatsPage from './pages/StatsPage';
import { IncorrectCardsProvider } from './context/IncorrectCardsContext';
import './App.css';

function App() {
  return (
    <IncorrectCardsProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/study" element={<StudyCategoryPage />} />
        <Route path="/study/:category" element={<StudyPage />} />
                <Route path="/quiz" element={<QuizCategoryPage />} />
        <Route path="/quiz/:category" element={<QuizPage />} />
        <Route path="/stats" element={<StatsPage />} />
      </Routes>
    </IncorrectCardsProvider>
  );
}

export default App;
