import { test, expect } from '@playwright/test';

test.describe('Spanish Flashcards App', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the home page with navigation buttons', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('Spanish Flashcards');

    const studyButton = page.locator('a.study-button');
    const quizButton = page.locator('a.quiz-button');
    const statsButton = page.locator('a.stats-button');

    await expect(studyButton).toHaveText('Study Mode');
    await expect(quizButton).toHaveText('Quiz Mode');
    await expect(statsButton).toHaveText('Stats Page');

    await expect(studyButton).toHaveCSS('background-color', 'rgb(76, 175, 80)');
    await expect(quizButton).toHaveCSS('background-color', 'rgb(244, 67, 54)');
    await expect(statsButton).toHaveCSS('background-color', 'rgb(33, 150, 243)');
  });

  test('should navigate through the study flow', async ({ page }) => {
    // Navigate to Study Mode
    await page.click('a.study-button');
    await expect(page).toHaveURL('/study');
    await expect(page.locator('h1')).toHaveText('Study Mode - Select a Category');

    // Navigate to Animals category
    await page.click('a:has-text("Animals")');
    await expect(page).toHaveURL('/study/animals');
    await expect(page.locator('h1')).toHaveText('Studying: Animals');

    // Check card counter
    await expect(page.locator('.card-counter')).toHaveText('Card 1 of 5');

    // Interact with flashcard
    const flashcard = page.locator('.flashcard');
    const flashcardInner = flashcard.locator('.flashcard-inner');

    await expect(flashcard).toBeVisible();
    await expect(flashcardInner).not.toHaveClass(/is-flipped/);

    // Flip the card
    await flashcard.click();
    await expect(flashcardInner).toHaveClass(/is-flipped/);

    // Flip it back
    await flashcard.click();
    await expect(flashcardInner).not.toHaveClass(/is-flipped/);

    // Navigate to next card
    await page.click('button:has-text("Next Card")');
    // Ensure the new card is not flipped
    await expect(flashcardInner).not.toHaveClass(/is-flipped/);
    await expect(page.locator('.card-counter')).toHaveText('Card 2 of 5');

    // Navigate back to categories
    await page.click('a:has-text("Back to Categories")');
    await expect(page).toHaveURL('/study');

    // Navigate back to home
    await page.click('a:has-text("Back to Home")');
    await expect(page).toHaveURL('/');
  });
}); 