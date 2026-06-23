import { useState } from 'react';
import './App.css';
import Card from './Card';

const flashcardsData = [
  { id: 1, category: "2026 Facts", question: "Which three countries are co-hosting the 2026 FIFA World Cup?", answer: "United States, Canada, and Mexico", image: "/facts.svg" },
  { id: 2, category: "2026 Facts", question: "How many teams expanded to play in the 2026 World Cup?", answer: "48 teams (up from 32)", image: "/facts.svg" },
  { id: 3, category: "2026 Facts", question: "Which stadium is hosting the 2026 World Cup Final?", answer: "MetLife Stadium (New Jersey)", image: "/facts.svg" },
  { id: 4, category: "Tournament History", question: "Which country has won the most World Cups in history?", answer: "Brazil (5 titles)", image: "/history.svg" },
  { id: 5, category: "Co-Hosts", question: "Which Florida host city will feature matches at Hard Rock Stadium?", answer: "Miami", image: "/hosts.svg" },
  { id: 6, category: "Tournament History", question: "Which South American team, famous for its yellow jerseys, historically plays intense home qualifying matches in Barranquilla?", answer: "Colombia", image: "/history.svg" },
  { id: 7, category: "2026 Facts", question: "With the expansion to 48 teams, how many total matches will be played in the 2026 tournament?", answer: "104 matches", image: "/facts.svg" },
  { id: 8, category: "Co-Hosts", question: "Which co-host nation is hosting the Men's FIFA World Cup for the very first time in its history?", answer: "Canada", image: "/hosts.svg" },
  { id: 9, category: "Tournament History", question: "In what year did the United States previously host the men's FIFA World Cup?", answer: "1994", image: "/history.svg" },
  { id: 10, category: "2026 Facts", question: "How many groups of four teams will compete in the initial group stage of the 2026 tournament?", answer: "12 groups", image: "/facts.svg" },
  { id: 11, category: "Co-Hosts", question: "Which iconic stadium in Mexico will become the first venue in history to host matches in three different World Cups?", answer: "Estadio Azteca", image: "/hosts.svg" },
  { id: 12, category: "Tournament History", question: "Which legendary player captained Argentina to victory in 2022, entering the 2026 cycle as defending champions?", answer: "Lionel Messi", image: "/history.svg" },
  { id: 13, category: "2026 Facts", question: "What is the name of the new knockout stage introduced for the 2026 tournament due to the expanded team roster?", answer: "The Round of 32", image: "/facts.svg" }
];

function App() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [userGuess, setUserGuess] = useState("");
  const [feedbackStatus, setFeedbackStatus] = useState("idle"); 
  const [cardOrder, setCardOrder] = useState(flashcardsData);
  
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);

  const resetCardState = () => {
    setIsFlipped(false);
    setUserGuess("");
    setFeedbackStatus("idle");
  };

  const handleNextCard = () => {
    if (currentCardIndex < cardOrder.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      resetCardState();
    }
  };

  const handlePrevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      resetCardState();
    }
  };

  const handleShuffle = () => {
    const shuffled = [...cardOrder].sort(() => Math.random() - 0.5);
    setCardOrder(shuffled);
    setCurrentCardIndex(0);
    resetCardState();
  };

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleGuessSubmit = (e) => {
    e.preventDefault();
    
    const correctAnswer = cardOrder[currentCardIndex].answer.toLowerCase();
    let guess = userGuess.toLowerCase();

    // 1. Normalize common aliases
    guess = guess.replace(/\busa\b/g, "united states")
                 .replace(/\bu\.s\.a\.\b/g, "united states")
                 .replace(/\bus\b/g, "united states");

    // 2. Strip punctuation and extra spaces
    const cleanAnswer = correctAnswer.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g,"").replace(/\s{2,}/g," ").trim();
    const cleanGuess = guess.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g,"").replace(/\s{2,}/g," ").trim();

    let isCorrect = false;

    // Create a word-boundary safe regex pattern from the user's guess
    // This allows "48" to match "48 teams" but stops "10" from matching "104"
    const wordBoundaryRegex = new RegExp('\\b' + cleanGuess + '\\b', 'i');

    // Check A: Is it an exact match?
    if (cleanGuess === cleanAnswer) {
        isCorrect = true;
    } 
    // Check B: Smart whole-word/phrase match (Fixes the "48" and "Messi" issues safely)
    else if (wordBoundaryRegex.test(cleanAnswer) && cleanGuess.length > 0) {
        isCorrect = true;
    } 
    // Check C: Order-Independent Keyword Matching (for multi-country lists)
    else {
        const answerKeywords = cleanAnswer.replace(/\band\b/g, "").split(" ").filter(word => word.length > 0);
        const hasAllKeywords = answerKeywords.every(word => cleanGuess.includes(word));
        
        if (answerKeywords.length > 1 && hasAllKeywords) {
            isCorrect = true;
        }
    }

    // Apply score and visual updates
    if (isCorrect) {
        setFeedbackStatus("correct");
        setIsFlipped(true); 
        
        const newStreak = currentStreak + 1;
        setCurrentStreak(newStreak);
        if (newStreak > longestStreak) {
          setLongestStreak(newStreak);
        }
    } else {
        setFeedbackStatus("incorrect");
        setCurrentStreak(0); 
    }
  };

  return (
    <div className="App">
      <div className="header">
        <h1>2026 World Cup Trivia</h1>
        <p>Test your knowledge of the upcoming tournament!</p>
        <div className="stats-container">
          <p>Total Cards: {cardOrder.length}</p>
          <p>Current Streak: {currentStreak} | Longest Streak: {longestStreak}</p>
        </div>
      </div>

      <Card 
        card={cardOrder[currentCardIndex]} 
        isFlipped={isFlipped}
        onCardClick={handleCardClick}
      />

      <div className="guess-container">
        <form onSubmit={handleGuessSubmit}>
          <input 
            type="text" 
            value={userGuess}
            onChange={(e) => setUserGuess(e.target.value)}
            placeholder="Place your guess here..."
            className={feedbackStatus === "correct" ? "correct-input" : feedbackStatus === "incorrect" ? "incorrect-input" : ""}
            disabled={feedbackStatus === "correct"}
          />
          <button type="submit" className="submit-btn" disabled={feedbackStatus === "correct"}>Submit Guess</button>
        </form>
      </div>

      <div className="nav-controls">
        <button onClick={handlePrevCard} disabled={currentCardIndex === 0} className="nav-btn">&larr; Back</button>
        <button onClick={handleNextCard} disabled={currentCardIndex === cardOrder.length - 1} className="nav-btn">Next &rarr;</button>
        <button onClick={handleShuffle} className="shuffle-btn">Shuffle Cards</button>
      </div>
    </div>
  );
}

export default App;