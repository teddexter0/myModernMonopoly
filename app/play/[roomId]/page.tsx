import React from 'react';

// Dynamic route for multiplayer rooms (future feature)
export default function RoomPage({ params }: { params: { roomId: string } }) {
  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <h1 className="text-4xl font-bold">Room: {params.roomId}</h1>
      <p className="mt-4">Multiplayer feature coming soon!</p>
    </div>
  );
}