export interface Flashcard {
  category: string;
  spanish: string;
  english: string;
  quiz: {
    type: 'multiple-choice';
    options: string[];
  };
}

export const flashcards: Flashcard[] = [
  // Animals
  {
    category: 'animals',
    spanish: 'el gato',
    english: 'the cat',
    quiz: {
      type: 'multiple-choice',
      options: ['the dog', 'the house', 'the cat', 'the bird'],
    },
  },
  {
    category: 'animals',
    spanish: 'el perro',
    english: 'the dog',
    quiz: {
      type: 'multiple-choice',
      options: ['the cat', 'the dog', 'the fish', 'the lion'],
    },
  },
  {
    category: 'animals',
    spanish: 'el pájaro',
    english: 'the bird',
    quiz: {
      type: 'multiple-choice',
      options: ['the snake', 'the bird', 'the horse', 'the cow'],
    },
  },
  // Food
  {
    category: 'food',
    spanish: 'la manzana',
    english: 'the apple',
    quiz: {
      type: 'multiple-choice',
      options: ['the orange', 'the banana', 'the apple', 'the bread'],
    },
  },
  {
    category: 'food',
    spanish: 'el pan',
    english: 'the bread',
    quiz: {
      type: 'multiple-choice',
      options: ['the cheese', 'the bread', 'the water', 'the milk'],
    },
  },
  {
    category: 'food',
    spanish: 'el queso',
    english: 'the cheese',
    quiz: {
      type: 'multiple-choice',
      options: ['the wine', 'the ham', 'the cheese', 'the fruit'],
    },
  },
  // Verbs
  {
    category: 'verbs',
    spanish: 'comer',
    english: 'to eat',
    quiz: {
      type: 'multiple-choice',
      options: ['to drink', 'to sleep', 'to eat', 'to run'],
    },
  },
  {
    category: 'verbs',
    spanish: 'beber',
    english: 'to drink',
    quiz: {
      type: 'multiple-choice',
      options: ['to see', 'to drink', 'to write', 'to read'],
    },
  },
  {
    category: 'verbs',
    spanish: 'dormir',
    english: 'to sleep',
    quiz: {
      type: 'multiple-choice',
      options: ['to wake up', 'to dream', 'to sleep', 'to snore'],
    },
  },
]; 