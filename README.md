# Web Development Project 3 - Flashcards! Part 2

Submitted by: **Harold Alexander Silva**

This web app: **An interactive React flashcard application that tests users' knowledge of the 2026 FIFA World Cup, featuring user text input, fuzzy answer matching, and streak tracking.**

Time spent: **6** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] The user can enter a guess in an input field.
- [x] The user can submit a guess and see visual feedback for a correct or incorrect answer.
- [x] The user can navigate to the next card.
- [x] The user can navigate to the previous card.
- [x] The next and back buttons disable appropriately at the ends of the card list.

The following **stretch** features are implemented:

- [x] The user can click a "Shuffle" button to randomize the card order.
- [x] A user's answer is evaluated using fuzzy matching (e.g., ignoring capitalization, punctuation, and checking for core keywords regardless of order).
- [x] A counter displays the user's current and longest streak of correct responses.

## Video Walkthrough

Here's a walkthrough of implemented user stories:

![Flashcard Walkthrough](demo.gif)

## Notes

### Challenges Encountered
- **Fuzzy Matching for Lists**: The hardest challenge was writing validation logic for a card with multiple answers (e.g., "United States, Canada, and Mexico"). A standard `.includes()` check failed if the user typed the countries out of order. I solved this by cleaning the string, breaking the correct answer into an array of keywords, and checking if *every* keyword existed in the user's guess.
- **Short-Answer False Negatives (The "48" Bug)**: I initially used a `guess.length > 2` condition to prevent small inputs (like "co") from accidentally triggering larger words (like "Colombia"). However, this unintentionally blocked legitimate short answers like "48". I resolved this by removing the arbitrary length limit and implementing Word Boundary Regular Expressions (`\b`) to ensure the user's guess exists as a complete, standalone word within the answer string.
- **Navigation Array Indexing**: I encountered a UI bug where the "Next" button would not disable on the final card. I realized the condition was checking if the index matched the array's total `length` (13) rather than `length - 1` (12), since arrays are zero-indexed. Correcting the math instantly fixed the disabled state.
- **State Management**: Managing multiple points of state (flip status, user input, right/wrong feedback, and streak counters) required careful resetting whenever the user navigated to a new card to prevent old answers from bleeding over.

### Resources Used
- **Vite & React**: For fast local development and component-based state management.
- **Local SVG Graphics**: Utilized local vector graphics to bypass external image server blocking (404 errors) during deployment.
- **Ezgif**: Utilized for finalizing the video walkthrough asset into the required `.gif` format.