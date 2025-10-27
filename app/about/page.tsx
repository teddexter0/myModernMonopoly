import React from 'react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-indigo-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-6">About Capital Wars 2050</h1>
        
        <div className="space-y-6 text-lg">
          <p>
            Capital Wars 2050 is a modern economic strategy game that combines classic property 
            trading mechanics with contemporary financial systems.
          </p>
          
          <h2 className="text-3xl font-bold mt-8">Features</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Dynamic stock market with real-time price changes</li>
            <li>Global economic events affecting gameplay</li>
            <li>Inflation simulation</li>
            <li>40 unique districts across different regions</li>
            <li>2-4 player local multiplayer</li>
          </ul>

          <Link href="/" className="inline-block mt-8 bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700">
            Back to Game
          </Link>
        </div>
      </div>
    </div>
  );
}