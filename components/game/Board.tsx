import React from 'react';

interface BoardProps {
  districts: any[];
  players: any[];
}

export default function Board({ districts, players }: BoardProps) {
  return (
    <div className="grid grid-cols-10 gap-1">
      {districts.map((district) => (
        <div key={district.id} className="h-14 rounded-lg bg-blue-600">
          {district.name}
        </div>
      ))}
    </div>
  );
}