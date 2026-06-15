import { useState } from 'react'; // <-- 1. We imported useState here too!
import './App.css';
import Card from './Card';

const App = () => {
  const flashcards = [
    {
      id: 1,
      category: "2026 Facts",
      question: "Which three countries are co-hosting the 2026 FIFA World Cup?",
      answer: "United States, Canada, and Mexico",
      image: "/facts.svg"
    },
    {
      id: 2,
      category: "2026 Facts",
      question: "How many teams expanded to play in the 2026 World Cup?",
      answer: "48 teams (up from 32)",
      image: "/facts.svg"
    },
    {
      id: 3,
      category: "2026 Facts",
      question: "Which stadium is hosting the 2026 World Cup Final?",
      answer: "MetLife Stadium (New Jersey)",
      image: "/facts.svg"
    },
    {
      id: 4,
      category: "Tournament History",
      question: "Which country has won the most World Cups in history?",
      answer: "Brazil (5 titles)",
      image: "/history.svg"
    },
    {
      id: 5,
      category: "Co-Hosts",
      question: "Which Florida host city will feature matches at Hard Rock Stadium?",
      answer: "Miami",
      image: "/hosts.svg"
    },
    {
      id: 6,
      category: "Tournament History",
      question: "Which South American team, famous for its yellow jerseys, historically plays intense home qualifying matches in Barranquilla?",
      answer: "Colombia",
      image: "/history.svg"
    },
    {
      id: 7,
      category: "2026 Facts",
      question: "With the expansion to 48 teams, how many total matches will be played in the 2026 tournament?",
      answer: "104 matches",
      image: "/facts.svg"
    },
    {
      id: 8,
      category: "Co-Hosts",
      question: "Which co-host nation is hosting the Men's FIFA World Cup for the very first time in its history?",
      answer: "Canada",
      image: "/hosts.svg"
    },
    {
      id: 9,
      category: "Tournament History",
      question: "In what year did the United States previously host the men's FIFA World Cup?",
      answer: "1994",
      image: "/history.svg"
    },
    {
      id: 10,
      category: "2026 Facts",
      question: "How many groups of four teams will compete in the initial group stage of the 2026 tournament?",
      answer: "12 groups",
      image: "/facts.svg"
    },
    {
      id: 11,
      category: "Co-Hosts",
      question: "Which iconic stadium in Mexico will become the first venue in history to host matches in three different World Cups?",
      answer: "Estadio Azteca",
      image: "/hosts.svg"
    },
    {
      id: 12,
      category: "Tournament History",
      question: "Which legendary player captained Argentina to victory in 2022, entering the 2026 cycle as defending champions?",
      answer: "Lionel Messi",
      image: "/history.svg"
    },
    {
      id: 13,
      category: "2026 Facts",
      question: "What is the name of the new knockout stage introduced for the 2026 tournament due to the expanded team roster?",
      answer: "The Round of 32",
      image: "/facts.svg"
    }
  ];

  // 2. State to keep track of the current card index (starts at 0)
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  // 3. Function to pick a random card
  const getRandomCard = () => {
    // This generates a random number between 0 and the length of your flashcards list
    const randomIndex = Math.floor(Math.random() * flashcards.length);
    setCurrentCardIndex(randomIndex);
  };

  return (
    <div className="App">
      <div className="header">
        <h1>⚽ 2026 World Cup Trivia 🌎</h1>
        <h2>Test your knowledge of the biggest tournament in soccer history!</h2>
        <p>Total Cards: {flashcards.length}</p>
      </div>
      
    {/* By adding a unique 'key', React knows to completely reset the card's state! */}
      <Card 
        key={flashcards[currentCardIndex].id}
        category={flashcards[currentCardIndex].category}
        question={flashcards[currentCardIndex].question} 
        answer={flashcards[currentCardIndex].answer} 
        image={flashcards[currentCardIndex].image}
      />

      {/* 5. The Next Button! When clicked, it runs our randomizer function */}
      <div className="button-container">
        <button className="next-button" onClick={getRandomCard}>
          Next Card ➡
        </button>
      </div>
      
    </div>
  )
}

export default App;