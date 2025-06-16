import React, { createContext, useState, useContext, type ReactNode } from 'react';
import type { FlashcardData } from '../data/flashcards';

interface IncorrectCardsContextType {
  incorrectCards: FlashcardData[];
  addIncorrectCard: (card: FlashcardData) => void;
  removeIncorrectCard: (card: FlashcardData) => void;
  clearIncorrectCards: () => void;
}

const IncorrectCardsContext = createContext<IncorrectCardsContextType | undefined>(undefined);

/**
 * Provides a global state for tracking flashcards that the user has answered incorrectly.
 * This allows the list of incorrect cards to be shared across different components,
 * such as the study page and the home page.
 */
export const IncorrectCardsProvider = ({ children }: { children: ReactNode }) => {
  const [incorrectCards, setIncorrectCards] = useState<FlashcardData[]>([]);

  /**
   * Adds a card to the list of incorrect cards.
   * To prevent duplicates, it only adds the card if it's not already in the list.
   */
  const addIncorrectCard = (card: FlashcardData) => {
    setIncorrectCards((prev) => {
      if (!prev.find(c => c.spanish === card.spanish)) {
        return [...prev, card];
      }
      return prev;
    });
  };

  /**
   * Removes a card from the list of incorrect cards.
   * This is used when a user correctly answers a card during a "Redo" session.
   */
  const removeIncorrectCard = (card: FlashcardData) => {
    setIncorrectCards((prev) => prev.filter(c => c.spanish !== card.spanish));
  };

  /**
   * Clears all cards from the incorrect cards list.
   */
  const clearIncorrectCards = () => {
    setIncorrectCards([]);
  };

  const value = {
    incorrectCards,
    addIncorrectCard,
    removeIncorrectCard,
    clearIncorrectCards,
  };

  return (
    <IncorrectCardsContext.Provider value={value}>
      {children}
    </IncorrectCardsContext.Provider>
  );
};

/**
 * A custom hook for accessing the incorrect cards context.
 * Throws an error if used outside of an `IncorrectCardsProvider`.
 */
export const useIncorrectCards = () => {
  const context = useContext(IncorrectCardsContext);
  if (context === undefined) {
    throw new Error('useIncorrectCards must be used within an IncorrectCardsProvider');
  }
  return context;
}; 