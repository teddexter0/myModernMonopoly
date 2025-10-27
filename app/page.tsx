'use client';

import React, { useState } from 'react';
import { DollarSign, TrendingUp, Building2, Zap, Users, Globe, Rocket, Brain, Shield, Factory, Landmark, Package } from 'lucide-react';

// TypeScript interfaces
interface District {
  id: number;
  name: string;
  type?: string;
  cost?: number;
  rent?: number[];
  color: string;
  group?: string;
  region?: string;
  icon: React.FC<any>;
  amount?: number;
}

interface Player {
  id: number;
  name: string;
  cash: number;
  position: number;
  properties: number[];
  stocks: Record<string, number>;
  netWorth: number;
  inJail: boolean;
  color: string;
  border: string;
}

interface Stock {
  name: string;
  price: number;
  volatility: number;
  icon: React.FC<any>;
  color: string;
}

interface GameEvent {
  name: string;
  effect: string;
  type: string;
  icon: React.FC<any>;
}

// Game data
const DISTRICTS: District[] = [
  { id: 0, name: 'HQ START', type: 'special', color: 'emerald', icon: Rocket },
  { id: 1, name: 'Silicon Valley', cost: 60, rent: [2, 10, 30, 90, 160, 250], color: 'blue', group: 'tech', region: 'NA', icon: Brain },
  { id: 2, name: 'Investment Card', type: 'card', color: 'purple', icon: TrendingUp },
  { id: 3, name: 'Austin Tech Hub', cost: 60, rent: [4, 20, 60, 180, 320, 450], color: 'blue', group: 'tech', region: 'NA', icon: Brain },
  { id: 4, name: 'Corporate Tax', type: 'tax', amount: 200, color: 'red', icon: Landmark },
  { id: 5, name: 'Hyperloop Station', cost: 200, type: 'transport', color: 'gray', icon: Zap },
  { id: 6, name: 'Seoul District', cost: 100, rent: [6, 30, 90, 270, 400, 550], color: 'cyan', group: 'asia', region: 'Asia', icon: Factory },
  { id: 7, name: 'Market Event', type: 'card', color: 'orange', icon: Globe },
  { id: 8, name: 'Tokyo Tower', cost: 100, rent: [6, 30, 90, 270, 400, 550], color: 'cyan', group: 'asia', region: 'Asia', icon: Factory },
  { id: 9, name: 'Shanghai Finance', cost: 120, rent: [8, 40, 100, 300, 450, 600], color: 'cyan', group: 'asia', region: 'Asia', icon: Factory },
  { id: 10, name: 'Detention Center', type: 'special', color: 'gray', icon: Shield },
  { id: 11, name: 'London Offices', cost: 140, rent: [10, 50, 150, 450, 625, 750], color: 'pink', group: 'europe', region: 'EU', icon: Building2 },
  { id: 12, name: 'Energy Corp', cost: 150, type: 'utility', color: 'yellow', icon: Zap },
  { id: 13, name: 'Berlin Campus', cost: 140, rent: [10, 50, 150, 450, 625, 750], color: 'pink', group: 'europe', region: 'EU', icon: Building2 },
  { id: 14, name: 'Paris Innovation', cost: 160, rent: [12, 60, 180, 500, 700, 900], color: 'pink', group: 'europe', region: 'EU', icon: Building2 },
  { id: 15, name: 'Maglev Network', cost: 200, type: 'transport', color: 'gray', icon: Zap },
  { id: 16, name: 'Miami Blockchain', cost: 180, rent: [14, 70, 200, 550, 750, 950], color: 'orange', group: 'crypto', region: 'NA', icon: Package },
  { id: 17, name: 'Investment Card', type: 'card', color: 'purple', icon: TrendingUp },
  { id: 18, name: 'Dubai Crypto', cost: 180, rent: [14, 70, 200, 550, 750, 950], color: 'orange', group: 'crypto', region: 'EM', icon: Package },
  { id: 19, name: 'Singapore Web3', cost: 200, rent: [16, 80, 220, 600, 800, 1000], color: 'orange', group: 'crypto', region: 'Asia', icon: Package },
  { id: 20, name: 'Free Market', type: 'special', color: 'green', icon: DollarSign },
  { id: 21, name: 'Lagos Tech', cost: 220, rent: [18, 90, 250, 700, 875, 1050], color: 'red', group: 'emerging', region: 'EM', icon: Rocket },
  { id: 22, name: 'Market Event', type: 'card', color: 'orange', icon: Globe },
  { id: 23, name: 'Nairobi Innovation', cost: 220, rent: [18, 90, 250, 700, 875, 1050], color: 'red', group: 'emerging', region: 'EM', icon: Rocket },
  { id: 24, name: 'Mumbai Finance', cost: 240, rent: [20, 100, 300, 750, 925, 1100], color: 'red', group: 'emerging', region: 'EM', icon: Rocket },
  { id: 25, name: 'Space Elevator', cost: 200, type: 'transport', color: 'gray', icon: Rocket },
  { id: 26, name: 'Buenos Aires', cost: 260, rent: [22, 110, 330, 800, 975, 1150], color: 'yellow', group: 'latam', region: 'EM', icon: Factory },
  { id: 27, name: 'São Paulo', cost: 260, rent: [22, 110, 330, 800, 975, 1150], color: 'yellow', group: 'latam', region: 'EM', icon: Factory },
  { id: 28, name: 'Quantum Corp', cost: 150, type: 'utility', color: 'purple', icon: Brain },
  { id: 29, name: 'Mexico City', cost: 280, rent: [24, 120, 360, 850, 1025, 1200], color: 'yellow', group: 'latam', region: 'EM', icon: Factory },
  { id: 30, name: 'Audit Lockdown', type: 'special', color: 'red', icon: Shield },
  { id: 31, name: 'New York Prime', cost: 300, rent: [26, 130, 390, 900, 1100, 1275], color: 'green', group: 'premium', region: 'NA', icon: Building2 },
  { id: 32, name: 'LA Complex', cost: 300, rent: [26, 130, 390, 900, 1100, 1275], color: 'green', group: 'premium', region: 'NA', icon: Building2 },
  { id: 33, name: 'Investment Card', type: 'card', color: 'purple', icon: TrendingUp },
  { id: 34, name: 'Chicago Tower', cost: 320, rent: [28, 150, 450, 1000, 1200, 1400], color: 'green', group: 'premium', region: 'NA', icon: Building2 },
  { id: 35, name: 'Orbital Station', cost: 200, type: 'transport', color: 'gray', icon: Rocket },
  { id: 36, name: 'Market Event', type: 'card', color: 'orange', icon: Globe },
  { id: 37, name: 'Mars Colony', cost: 350, rent: [35, 175, 500, 1100, 1300, 1500], color: 'indigo', group: 'space', region: 'Space', icon: Rocket },
  { id: 38, name: 'Wealth Tax', type: 'tax', amount: 100, color: 'red', icon: Landmark },
  { id: 39, name: 'Moon Base', cost: 400, rent: [50, 200, 600, 1400, 1700, 2000], color: 'indigo', group: 'space', region: 'Space', icon: Rocket },
];

const STOCKS: Record<string, Stock> = {
  TECH: { name: 'TechCorp AI', price: 100, volatility: 0.3, icon: Brain, color: 'blue' },
  ENERGY: { name: 'GreenPower', price: 150, volatility: 0.1, icon: Zap, color: 'green' },
  CRYPTO: { name: 'BlockChain Inc', price: 50, volatility: 0.7, icon: Package, color: 'orange' },
  SPACE: { name: 'AstroX', price: 200, volatility: 0.5, icon: Rocket, color: 'purple' },
};

const EVENTS: GameEvent[] = [
  { name: 'AI Boom', effect: 'Tech stocks +40%, automation reduces costs', type: 'positive', icon: Brain },
  { name: 'Recession Alert', effect: 'All rents -25% for 3 turns', type: 'negative', icon: TrendingUp },
  { name: 'Crypto Rally', effect: 'CRYPTO stock +80%', type: 'neutral', icon: Package },
  { name: 'Space Race', effect: 'Space properties +30% value', type: 'positive', icon: Rocket },
  { name: 'Universal Income', effect: 'All players get $300/turn', type: 'positive', icon: DollarSign },
  { name: 'Market Crash', effect: 'All stocks -40%', type: 'negative', icon: TrendingUp },
  { name: 'Green Revolution', effect: 'Energy utilities 2x income', type: 'positive', icon: Zap },
  { name: 'Quantum Breakthrough', effect: 'Tech properties rent +50%', type: 'positive', icon: Brain },
];

const PLAYER_COLORS = [
  { name: 'Cyan Ventures', color: 'bg-cyan-500', border: 'border-cyan-400' },
  { name: 'Magenta Corp', color: 'bg-pink-500', border: 'border-pink-400' },
  { name: 'Gold Empire', color: 'bg-yellow-500', border: 'border-yellow-400' },
  { name: 'Emerald Group', color: 'bg-emerald-500', border: 'border-emerald-400' },
];

export default function CapitalWars() {
  const [gameStarted, setGameStarted] = useState(false);
  const [playerCount, setPlayerCount] = useState(2);
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [dice, setDice] = useState([1, 1]);
  const [gameLog, setGameLog] = useState<string[]>(['Welcome to Capital Wars 2050!']);
  const [turnNumber, setTurnNumber] = useState(0);
  const [stockPrices, setStockPrices] = useState(STOCKS);
  const [currentEvent, setCurrentEvent] = useState<GameEvent | null>(null);
  const [showDistrictModal, setShowDistrictModal] = useState<District | null>(null);
  const [economicState, setEconomicState] = useState('stable');
  const [inflationRate] = useState(0.02);

  const currentPlayer = players[currentPlayerIndex];

  const addLog = (message: string) => {
    setGameLog(prev => [...prev.slice(-9), message]);
  };

  const startGame = () => {
    const newPlayers: Player[] = Array.from({ length: playerCount }, (_, i) => ({
      id: i + 1,
      name: PLAYER_COLORS[i].name,
      cash: 1500,
      position: 0,
      properties: [],
      stocks: {},
      netWorth: 1500,
      inJail: false,
      color: PLAYER_COLORS[i].color,
      border: PLAYER_COLORS[i].border,
    }));
    setPlayers(newPlayers);
    setGameStarted(true);
    addLog('Game started! Roll dice to begin your empire.');
  };

  const rollDice = () => {
    if (!currentPlayer) return;

    const d1 = Math.floor(Math.random() * 6) + 1;
    const d2 = Math.floor(Math.random() * 6) + 1;
    setDice([d1, d2]);
    
    const sum = d1 + d2;
    const newPosition = (currentPlayer.position + sum) % 40;
    const passedHQ = newPosition < currentPlayer.position;
    
    const updatedPlayers = [...players];
    updatedPlayers[currentPlayerIndex].position = newPosition;
    
    if (passedHQ) {
      updatedPlayers[currentPlayerIndex].cash += 200;
      addLog(`${currentPlayer.name} passed HQ! Collected $200`);
    }
    
    setPlayers(updatedPlayers);
    addLog(`${currentPlayer.name} rolled ${d1} + ${d2} = ${sum}`);
    
    const landedDistrict = DISTRICTS[newPosition];
    handleLanding(landedDistrict, updatedPlayers[currentPlayerIndex]);
    
    if (turnNumber % 5 === 0 && turnNumber > 0) {
      updateMarket(sum);
      triggerEvent();
    }
    
    setTurnNumber(prev => prev + 1);
  };

  const handleLanding = (district: District, player: Player) => {
    if (district.type === 'special') {
      if (district.name === 'Audit Lockdown') {
        addLog(`${player.name} sent to detention!`);
        const updatedPlayers = [...players];
        const idx = players.findIndex(p => p.id === player.id);
        updatedPlayers[idx].position = 10;
        updatedPlayers[idx].inJail = true;
        setPlayers(updatedPlayers);
      } else if (district.name === 'Free Market') {
        addLog(`${player.name} enjoys free market benefits!`);
      }
    } else if (district.type === 'tax' && district.amount) {
      addLog(`${player.name} pays $${district.amount} ${district.name}`);
      updatePlayerCash(player.id, -district.amount);
    } else if (district.cost && !district.type) {
      const owner = players.find(p => p.properties.includes(district.id));
      if (!owner) {
        setShowDistrictModal(district);
      } else if (owner.id !== player.id) {
        const rent = calculateRent(district);
        addLog(`${player.name} pays $${rent} rent to ${owner.name}`);
        updatePlayerCash(player.id, -rent);
        updatePlayerCash(owner.id, rent);
      }
    } else if (district.type === 'card') {
      addLog(`${player.name} draws a ${district.name}`);
      const bonus = Math.floor(Math.random() * 200) + 50;
      updatePlayerCash(player.id, bonus);
      addLog(`Received $${bonus} bonus!`);
    }
  };

  const calculateRent = (district: District) => {
    const baseRent = district.rent ? district.rent[0] : 0;
    const inflationMultiplier = 1 + (inflationRate * turnNumber / 10);
    return Math.floor(baseRent * inflationMultiplier);
  };

  const buyDistrict = () => {
    if (!showDistrictModal || !currentPlayer) return;
    
    const district = showDistrictModal;
    if (district.cost && currentPlayer.cash >= district.cost) {
      const updatedPlayers = [...players];
      updatedPlayers[currentPlayerIndex].cash -= district.cost;
      updatedPlayers[currentPlayerIndex].properties.push(district.id);
      updatedPlayers[currentPlayerIndex].netWorth += district.cost * 0.8;
      setPlayers(updatedPlayers);
      addLog(`${currentPlayer.name} acquired ${district.name} for $${district.cost}`);
      setShowDistrictModal(null);
    }
  };

  const updatePlayerCash = (playerId: number, amount: number) => {
    setPlayers(prev => prev.map(p => 
      p.id === playerId ? { ...p, cash: Math.max(0, p.cash + amount), netWorth: Math.max(0, p.netWorth + amount) } : p
    ));
  };

  const updateMarket = (diceSum: number) => {
    setStockPrices(prev => {
      const updated: Record<string, Stock> = {};
      Object.keys(prev).forEach(ticker => {
        const stock = prev[ticker];
        const change = (diceSum - 7) * stock.volatility * 0.1;
        updated[ticker] = {
          ...stock,
          price: Math.max(10, Math.floor(stock.price * (1 + change)))
        };
      });
      return updated;
    });
    addLog('📊 Market prices updated!');
  };

  const triggerEvent = () => {
    const event = EVENTS[Math.floor(Math.random() * EVENTS.length)];
    setCurrentEvent(event);
    addLog(`🌍 GLOBAL EVENT: ${event.name}`);
    
    if (event.name === 'Universal Income') {
      setPlayers(prev => prev.map(p => ({ ...p, cash: p.cash + 300 })));
    } else if (event.name === 'Market Crash') {
      setStockPrices(prev => {
        const updated: Record<string, Stock> = {};
        Object.keys(prev).forEach(ticker => {
          updated[ticker] = { ...prev[ticker], price: Math.floor(prev[ticker].price * 0.6) };
        });
        return updated;
      });
    } else if (event.name === 'AI Boom') {
      setEconomicState('boom');
    } else if (event.name === 'Recession Alert') {
      setEconomicState('recession');
    }
    
    setTimeout(() => {
      setCurrentEvent(null);
      setEconomicState('stable');
    }, 5000);
  };

  const buyStock = (ticker: string) => {
    if (!currentPlayer) return;
    const stock = stockPrices[ticker];
    if (currentPlayer.cash >= stock.price) {
      const updatedPlayers = [...players];
      updatedPlayers[currentPlayerIndex].cash -= stock.price;
      updatedPlayers[currentPlayerIndex].stocks[ticker] = (updatedPlayers[currentPlayerIndex].stocks[ticker] || 0) + 1;
      updatedPlayers[currentPlayerIndex].netWorth += stock.price * 0.8;
      setPlayers(updatedPlayers);
      addLog(`${currentPlayer.name} bought 1 ${ticker} @ $${stock.price}`);
    }
  };

  const endTurn = () => {
    setCurrentPlayerIndex((prev) => (prev + 1) % players.length);
    setShowDistrictModal(null);
    addLog(`--- ${players[(currentPlayerIndex + 1) % players.length]?.name}'s turn ---`);
  };

  const getDistrictColor = (color: string) => {
    const colors: Record<string, string> = {
      blue: 'bg-blue-600',
      cyan: 'bg-cyan-600',
      pink: 'bg-pink-600',
      orange: 'bg-orange-600',
      red: 'bg-red-600',
      yellow: 'bg-yellow-500',
      green: 'bg-green-600',
      indigo: 'bg-indigo-700',
      gray: 'bg-gray-600',
      purple: 'bg-purple-600',
      emerald: 'bg-emerald-500',
    };
    return colors[color] || 'bg-gray-400';
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 text-white flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-black/40 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
          <div className="text-center mb-8">
            <h1 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
              CAPITAL WARS
            </h1>
            <p className="text-2xl text-gray-300 mb-2">2050</p>
            <p className="text-gray-400">Build your corporate empire in the age of AI & space exploration</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold mb-3 text-gray-300">SELECT CORPORATIONS</label>
              <div className="grid grid-cols-2 gap-3">
                {[2, 3, 4].map(num => (
                  <button
                    key={num}
                    onClick={() => setPlayerCount(num)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      playerCount === num
                        ? 'bg-purple-600 border-purple-400 scale-105'
                        : 'bg-white/5 border-white/10 hover:border-white/30'
                    }`}
                  >
                    <Users className="w-8 h-8 mx-auto mb-2" />
                    <div className="font-bold">{num} Players</div>
                  </button>
                ))}
              </div>
            </div>

            <button
            onClick={startGame}
              className="w-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-600 hover:via-purple-600 hover:to-pink-600 py-4 rounded-lg font-bold text-xl transition-all transform hover:scale-105"
            >
              🚀 START GAME
            </button>

            <div className="bg-white/5 rounded-lg p-4 text-sm text-gray-400">
              <div className="font-bold text-white mb-2">🎮 GAME FEATURES:</div>
              <ul className="space-y-1">
                <li>• Dynamic stock market with 4 sectors</li>
                <li>• Global events affecting economy</li>
                <li>• Real-time inflation simulation</li>
                <li>• Space & emerging market properties</li>
                <li>• Educational finance mechanics</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 text-white p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-4">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-pink-400">
            CAPITAL WARS 2050
          </h1>
          <div className="text-sm text-gray-400 mt-1">
            Turn {turnNumber} | Inflation: {(inflationRate * 100).toFixed(1)}% | Economy: {economicState.toUpperCase()}
          </div>
        </div>

        {currentEvent && (
          <div className={`mb-4 p-4 rounded-lg border-2 animate-pulse ${
            currentEvent.type === 'positive' ? 'bg-green-900/50 border-green-500' :
            currentEvent.type === 'negative' ? 'bg-red-900/50 border-red-500' :
            'bg-blue-900/50 border-blue-500'
          }`}>
            <div className="flex items-center gap-3">
              {React.createElement(currentEvent.icon, { className: "w-6 h-6" })}
              <div>
                <div className="font-bold text-lg">{currentEvent.name}</div>
                <div className="text-sm">{currentEvent.effect}</div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="space-y-4">
            <div className="bg-black/40 backdrop-blur-xl rounded-xl p-4 border border-white/10">
              <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Corporations
              </h2>
              {players.map((player, idx) => (
                <div key={player.id} className={`mb-3 p-3 rounded-lg border-2 ${
                  idx === currentPlayerIndex ? `${player.border} bg-white/10` : 'border-white/5 bg-white/5'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full ${player.color}`}></div>
                      <span className="font-bold text-sm">{player.name}</span>
                    </div>
                  </div>
                  <div className="text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Cash:</span>
                      <span className="text-green-400 font-bold">${player.cash.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Net Worth:</span>
                      <span className="text-cyan-400 font-bold">${player.netWorth.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Districts:</span>
                      <span>{player.properties.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Location:</span>
                      <span className="text-xs">{DISTRICTS[player.position].name}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-black/40 backdrop-blur-xl rounded-xl p-4 border border-white/10">
              <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Global Markets
              </h2>
              {Object.entries(stockPrices).map(([ticker, stock]) => {
                const Icon = stock.icon;
                const owned = currentPlayer?.stocks[ticker] || 0;
                return (
                  <div key={ticker} className="mb-3 p-3 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4" />
                        <div>
                          <div className="font-bold text-sm">{ticker}</div>
                          <div className="text-xs text-gray-400">{stock.name}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-green-400 font-bold">${stock.price}</div>
                        {owned > 0 && <div className="text-xs text-cyan-400">Own: {owned}</div>}
                      </div>
                    </div>
                    <button 
                      onClick={() => buyStock(ticker)}
                      disabled={!currentPlayer || currentPlayer.cash < stock.price}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed py-1.5 rounded text-xs font-bold transition-all"
                    >
                      Buy Share
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <div className="bg-black/40 backdrop-blur-xl rounded-xl p-6 border border-white/10">
              <div className="text-center mb-4">
                <h3 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${currentPlayer?.color}`}></div>
                  {currentPlayer?.name}
                </h3>
              </div>

              <div className="flex justify-center gap-4 mb-6">
                <div className="bg-gradient-to-br from-white to-gray-200 text-black rounded-xl p-6 flex items-center justify-center shadow-xl transform hover:scale-105 transition-transform">
                  <span className="text-4xl font-bold">{dice[0]}</span>
                </div>
                <div className="bg-gradient-to-br from-white to-gray-200 text-black rounded-xl p-6 flex items-center justify-center shadow-xl transform hover:scale-105 transition-transform">
                  <span className="text-4xl font-bold">{dice[1]}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={rollDice}
                  className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all transform hover:scale-105"
                >
                  🎲 Roll Dice
                </button>
                <button 
                  onClick={endTurn}
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all transform hover:scale-105"
                >
                  End Turn →
                </button>
              </div>
            </div>

            <div className="bg-black/40 backdrop-blur-xl rounded-xl p-4 border border-white/10">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Global Map
              </h3>
              <div className="grid grid-cols-10 gap-1">
                {DISTRICTS.map((district) => {
                  const playersHere = players.filter(p => p.position === district.id);
                  const owner = players.find(p => p.properties.includes(district.id));
                  const Icon = district.icon;
                  
                  return (
                    <div 
                      key={district.id} 
                      className={`h-14 rounded-lg ${getDistrictColor(district.color)} relative border border-white/30 flex flex-col items-center justify-center cursor-pointer hover:scale-110 transition-transform`}
                      title={district.name}
                    >
                      <Icon className="w-3 h-3 text-white mb-0.5" />
                      {playersHere.length > 0 && (
                        <div className="absolute -top-1 -right-1 flex gap-0.5">
                          {playersHere.map(p => (
                            <div key={p.id} className={`w-2 h-2 rounded-full ${p.color} border border-white shadow-lg`}></div>
                          ))}
                        </div>
                      )}
                      {owner && (
                        <div className={`absolute -bottom-1 -left-1 w-2 h-2 rounded-full ${owner.color} border border-white`}></div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-black/40 backdrop-blur-xl rounded-xl p-4 border border-white/10">
              <h3 className="font-bold mb-2">Activity Log</h3>
              <div className="space-y-1 text-xs font-mono max-h-40 overflow-y-auto">
                {gameLog.map((log, idx) => (
                  <div key={idx} className="text-gray-300 bg-white/5 px-2 py-1 rounded">{log}</div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {showDistrictModal && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 max-w-md w-full border-2 border-cyan-500 shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                {React.createElement(showDistrictModal.icon, { className: "w-8 h-8" })}
                <h2 className="text-2xl font-bold">{showDistrictModal.name}</h2>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Cost:</span>
                  <span className="font-bold text-green-400 text-lg">${showDistrictModal.cost?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Base Rent:</span>
                  <span className="font-bold">${showDistrictModal.rent?.[0]}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Region:</span>
                  <span className="font-bold">{showDistrictModal.region}</span>
                </div>
                <div className="h-px bg-white/20 my-3"></div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Your Cash:</span>
                  <span className={`font-bold ${currentPlayer && showDistrictModal.cost && currentPlayer.cash >= showDistrictModal.cost ? 'text-green-400' : 'text-red-400'}`}>
                    ${currentPlayer?.cash.toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={buyDistrict}
                  disabled={!currentPlayer || !showDistrictModal.cost || currentPlayer.cash < showDistrictModal.cost}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed py-3 rounded-lg font-bold transition-all transform hover:scale-105"
                >
                  Acquire
                </button>
                <button 
                  onClick={() => setShowDistrictModal(null)}
                  className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 py-3 rounded-lg font-bold transition-all transform hover:scale-105"
                >
                  Pass
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}