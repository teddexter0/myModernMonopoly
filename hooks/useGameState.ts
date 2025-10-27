import { useState } from 'react';

// Custom hook for game state management
// Use this when you want to extract logic from app/page.tsx

export function useGameState() {
  const [players, setPlayers] = useState([]);
  const [turnNumber, setTurnNumber] = useState(0);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

  const rollDice = () => {
    // Logic here
  };

  const endTurn = () => {
    setCurrentPlayerIndex((prev) => (prev + 1) % players.length);
  };

  return {
    players,
    turnNumber,
    currentPlayerIndex,
    rollDice,
    endTurn,
  };
}