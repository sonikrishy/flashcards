import { useState } from 'react';

interface FlashcardProps {
  front: string;
  back: string;
}

function Flashcard({ front, back }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="flashcard" onClick={handleFlip}>
      <div className={`flashcard-inner ${isFlipped ? 'is-flipped' : ''}`}>
        <div className="flashcard-front">{front}</div>
        <div className="flashcard-back">{back}</div>
      </div>
    </div>
  );
}

export default Flashcard; 