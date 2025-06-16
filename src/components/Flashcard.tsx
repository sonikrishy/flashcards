import { useState, useEffect } from 'react';

interface FlashcardProps {
  front: string;
  back: string;
  onFlip?: () => void;
}

/**
 * A reusable component that displays an interactive flashcard.
 * It manages its own flipped state and notifies parent components of flips.
 */
function Flashcard({ front, back, onFlip }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  /**
   * Resets the card to its front-facing (unflipped) state whenever the `front` content changes.
   * This is crucial for ensuring that when a new card is displayed (e.g., navigating
   * to the next card in a deck), it always starts unflipped.
   */
  useEffect(() => {
    setIsFlipped(false);
  }, [front]);

  /**
   * Toggles the flipped state of the card.
   * If an `onFlip` callback is provided, it is called only when the card is
   * flipped from front to back, not back to front.
   */
  const handleFlip = () => {
    // The state update is asynchronous, so we check the *current* `isFlipped`
    // value to determine if we are about to show the back of the card.
    if (!isFlipped && onFlip) {
      onFlip();
    }
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