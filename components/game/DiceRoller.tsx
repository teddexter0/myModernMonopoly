import React from 'react';

interface DiceRollerProps {
  dice: [number, number];
  onRoll: () => void;
}

export default function DiceRoller({ dice, onRoll }: DiceRollerProps) {
  return (
    <div className="text-center">
      <div className="flex justify-center gap-4 mb-4">
        <div className="w-16 h-16 bg-white text-black rounded flex items-center justify-center text-2xl font-bold">
          {dice[0]}
        </div>
        <div className="w-16 h-16 bg-white text-black rounded flex items-center justify-center text-2xl font-bold">
          {dice[1]}
        </div>
      </div>
      <button onClick={onRoll} className="bg-green-600 px-6 py-2 rounded-lg font-bold">
        🎲 Roll Dice
      </button>
    </div>
  );
}