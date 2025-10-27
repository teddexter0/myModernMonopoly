import React from 'react';

interface PlayerPanelProps {
  players: any[];
  currentPlayerIndex: number;
}

export default function PlayerPanel({ players, currentPlayerIndex }: PlayerPanelProps) {
  return (
    <div className="space-y-3">
      {players.map((player, idx) => (
        <div key={player.id} className={`p-3 rounded-lg ${idx === currentPlayerIndex ? 'bg-yellow-500/30' : 'bg-white/5'}`}>
          <div className="font-bold">{player.name}</div>
          <div className="text-sm">Cash: ${player.cash}</div>
        </div>
      ))}
    </div>
  );
}