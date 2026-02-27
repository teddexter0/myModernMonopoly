'use client';

import React, { useState } from 'react';
import { DollarSign, TrendingUp, Building2, Zap, Users, Globe, Rocket, Brain, Shield, Factory, Landmark, Package, ShoppingCart, X } from 'lucide-react';

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
  jailTurns: number;
  color: string;
  border: string;
  doubles: number;
}

interface Stock {
  name: string;
  price: number;
  volatility: number;
  icon: React.FC<any>;
  color: string;
}

interface StockCartItem {
  ticker: string;
  quantity: number;
  price: number;
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
  { id: 10, name: 'Detention Center', type: 'jail', color: 'gray', icon: Shield },
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
  { id: 30, name: 'Go To Detention', type: 'gotojail', color: 'red', icon: Shield },
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

const CHANCE_CARDS = [
  { text: "Tech boom! Collect $200", amount: 200 },
  { text: "Market correction. Pay $50", amount: -50 },
  { text: "Dividend payout! Collect $150", amount: 150 },
  { text: "Regulatory fine. Pay $100", amount: -100 },
  { text: "Investment returns! Collect $100", amount: 100 },
  { text: "Go directly to Detention. Do not pass HQ.", special: "jail" },
  { text: "Advance to HQ. Collect $200", special: "go" },
  { text: "Universal income! Collect $50", amount: 50 },
];

const STOCKS: Record<string, Stock> = {
  TECH: { name: 'TechCorp AI', price: 100, volatility: 0.3, icon: Brain, color: 'blue' },
  ENERGY: { name: 'GreenPower', price: 150, volatility: 0.1, icon: Zap, color: 'green' },
  CRYPTO: { name: 'BlockChain Inc', price: 50, volatility: 0.7, icon: Package, color: 'orange' },
  SPACE: { name: 'AstroX', price: 200, volatility: 0.5, icon: Rocket, color: 'purple' },
};

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
  const [dice, setDice] = useState<[number, number]>([1, 1]);
  const [gameLog, setGameLog] = useState<string[]>(['Welcome to Capital Wars 2050!']);
  const [roundNumber, setRoundNumber] = useState(0);
  const [stockPrices, setStockPrices] = useState(STOCKS);
  const [showDistrictModal, setShowDistrictModal] = useState<District | null>(null);
  const [stockCart, setStockCart] = useState<StockCartItem[]>([]);
  const [showStockCart, setShowStockCart] = useState(false);
  const [turnPhase, setTurnPhase] = useState<'roll' | 'action' | 'end'>('roll');
  const [rolledThisTurn, setRolledThisTurn] = useState(false);
  // FIX: track when doubles were rolled so player can roll again
  const [canRollAgain, setCanRollAgain] = useState(false);

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
      jailTurns: 0,
      doubles: 0,
      color: PLAYER_COLORS[i].color,
      border: PLAYER_COLORS[i].border,
    }));
    setPlayers(newPlayers);
    setGameStarted(true);
    addLog(`Game started! ${newPlayers[0].name} goes first.`);
  };

  const simulateDiceRoll = (): Promise<[number, number]> => {
    return new Promise((resolve) => {
      let rolls = 0;
      const maxRolls = 10;
      const interval = setInterval(() => {
        const d1 = Math.floor(Math.random() * 6) + 1;
        const d2 = Math.floor(Math.random() * 6) + 1;
        setDice([d1, d2]);
        rolls++;
        if (rolls >= maxRolls) {
          clearInterval(interval);
          resolve([d1, d2]);
        }
      }, 100);
    });
  };

  const rollDice = async () => {
    // FIX: allow rolling when canRollAgain is true (after doubles), even if rolledThisTurn
    if (!currentPlayer || (rolledThisTurn && !canRollAgain)) return;

    // Consume the roll-again opportunity before rolling
    setCanRollAgain(false);

    // Handle jail roll
    if (currentPlayer.inJail) {
      const [d1, d2] = await simulateDiceRoll();
      // FIX: deep-copy each player object to avoid mutating existing state references
      const updatedPlayers = players.map(p => ({ ...p }));

      if (d1 === d2) {
        addLog(`${currentPlayer.name} rolled doubles (${d1}+${d2})! Released from detention!`);
        updatedPlayers[currentPlayerIndex].inJail = false;
        updatedPlayers[currentPlayerIndex].jailTurns = 0;
        updatedPlayers[currentPlayerIndex].doubles = 0;
        setPlayers(updatedPlayers);
        // FIX: pass updatedPlayers and actual dice values through to avoid stale closures
        movePlayer(d1 + d2, updatedPlayers, [d1, d2]);
      } else {
        updatedPlayers[currentPlayerIndex].jailTurns++;
        if (updatedPlayers[currentPlayerIndex].jailTurns >= 3) {
          // On the 3rd failed attempt, must pay $50 and move
          addLog(`${currentPlayer.name} paid $50 fine to leave detention!`);
          updatedPlayers[currentPlayerIndex].cash = Math.max(0, updatedPlayers[currentPlayerIndex].cash - 50);
          updatedPlayers[currentPlayerIndex].inJail = false;
          updatedPlayers[currentPlayerIndex].jailTurns = 0;
          setPlayers(updatedPlayers);
          movePlayer(d1 + d2, updatedPlayers, [d1, d2]);
        } else {
          const turnsLeft = 3 - updatedPlayers[currentPlayerIndex].jailTurns;
          addLog(`${currentPlayer.name} rolled ${d1}+${d2}. No doubles — ${turnsLeft} turn(s) left in detention.`);
          setPlayers(updatedPlayers);
          setTurnPhase('end');
        }
      }
      setRolledThisTurn(true);
      return;
    }

    // Normal roll
    const [d1, d2] = await simulateDiceRoll();
    const isDoubles = d1 === d2;

    addLog(`${currentPlayer.name} rolled ${d1} + ${d2} = ${d1 + d2}${isDoubles ? ' (DOUBLES!)' : ''}`);

    // FIX: deep-copy players to avoid mutating existing state references
    const updatedPlayers = players.map(p => ({ ...p }));

    if (isDoubles) {
      updatedPlayers[currentPlayerIndex].doubles++;

      if (updatedPlayers[currentPlayerIndex].doubles >= 3) {
        // 3 doubles in a row = go to jail, turn ends
        addLog(`${currentPlayer.name} rolled 3 doubles in a row! Sent to detention!`);
        updatedPlayers[currentPlayerIndex].position = 10;
        updatedPlayers[currentPlayerIndex].inJail = true;
        updatedPlayers[currentPlayerIndex].doubles = 0;
        setPlayers(updatedPlayers);
        setRolledThisTurn(true);
        setCanRollAgain(false);
        setTurnPhase('end');
        return;
      }

      // FIX: move player on doubles, then grant an extra roll
      setPlayers(updatedPlayers);
      movePlayer(d1 + d2, updatedPlayers, [d1, d2]);
      setRolledThisTurn(true);
      setCanRollAgain(true);  // FIX: was never set before — doubles couldn't re-roll
      setTurnPhase('roll');   // stay in roll phase so they can roll again
    } else {
      updatedPlayers[currentPlayerIndex].doubles = 0;
      setPlayers(updatedPlayers);
      movePlayer(d1 + d2, updatedPlayers, [d1, d2]);
      setRolledThisTurn(true);
      setCanRollAgain(false);
      setTurnPhase('action');
    }
  };

  // FIX: takes currentPlayers & diceValues so we never read stale closure state
  const movePlayer = (steps: number, currentPlayers: Player[], diceValues: [number, number]) => {
    const player = currentPlayers[currentPlayerIndex];
    const newPosition = (player.position + steps) % 40;
    // FIX: reliable passedHQ — checks raw sum before modulo, not newPos < oldPos
    const passedHQ = (player.position + steps) >= 40;

    const updatedPlayers = currentPlayers.map(p => ({ ...p }));
    updatedPlayers[currentPlayerIndex].position = newPosition;

    if (passedHQ) {
      updatedPlayers[currentPlayerIndex].cash += 200;
      updatedPlayers[currentPlayerIndex].netWorth += 200;
      addLog(`${player.name} passed HQ! Collected $200`);
    }

    setPlayers(updatedPlayers);

    const landedDistrict = DISTRICTS[newPosition];
    // FIX: pass updatedPlayers and diceValues forward — no more stale closure reads
    handleLanding(landedDistrict, updatedPlayers[currentPlayerIndex], updatedPlayers, diceValues);
  };

  // FIX: takes currentPlayers and diceValues — all property lookups use fresh data
  const handleLanding = (
    district: District,
    player: Player,
    currentPlayers: Player[],
    diceValues: [number, number]
  ) => {
    if (district.type === 'gotojail') {
      addLog(`${player.name} is sent to detention!`);
      const updatedPlayers = currentPlayers.map(p => ({ ...p }));
      updatedPlayers[currentPlayerIndex].position = 10;
      updatedPlayers[currentPlayerIndex].inJail = true;
      updatedPlayers[currentPlayerIndex].doubles = 0;
      setPlayers(updatedPlayers);
      setCanRollAgain(false);
      setTurnPhase('end');
    } else if (district.type === 'jail') {
      addLog(`${player.name} is just visiting detention.`);
    } else if (district.type === 'special' && district.name === 'Free Market') {
      addLog(`${player.name} enjoys free market benefits!`);
    } else if (district.type === 'tax' && district.amount) {
      addLog(`${player.name} pays $${district.amount} for ${district.name}`);
      updatePlayerCash(player.id, -district.amount);
    } else if (district.type === 'card') {
      // FIX: pass currentPlayers so drawChanceCard doesn't read stale state
      drawChanceCard(player, currentPlayers);
    } else if (district.type === 'utility') {
      // FIX: pass currentPlayers and diceValues
      handleUtilityLanding(district, player, currentPlayers, diceValues);
    } else if (district.type === 'transport') {
      // FIX: pass currentPlayers
      handleTransportLanding(district, player, currentPlayers);
    } else if (district.cost && !district.type) {
      // FIX: use currentPlayers.find instead of stale players.find
      const owner = currentPlayers.find(p => p.properties.includes(district.id));
      if (!owner) {
        setShowDistrictModal(district);
      } else if (owner.id !== player.id) {
        const rent = calculateRent(district, owner);
        addLog(`${player.name} pays $${rent} rent to ${owner.name}`);
        updatePlayerCash(player.id, -rent);
        updatePlayerCash(owner.id, rent);
      } else {
        addLog(`${player.name} landed on their own property.`);
      }
    }
  };

  // FIX: takes currentPlayers; also ends turn properly when jail card drawn
  const drawChanceCard = (player: Player, currentPlayers: Player[]) => {
    const card = CHANCE_CARDS[Math.floor(Math.random() * CHANCE_CARDS.length)];
    addLog(`${player.name} drew: "${card.text}"`);

    if (card.special === 'jail') {
      const updatedPlayers = currentPlayers.map(p => ({ ...p }));
      updatedPlayers[currentPlayerIndex].position = 10;
      updatedPlayers[currentPlayerIndex].inJail = true;
      updatedPlayers[currentPlayerIndex].doubles = 0;
      setPlayers(updatedPlayers);
      setCanRollAgain(false);
      setTurnPhase('end'); // FIX: jail card now correctly ends the current turn
    } else if (card.special === 'go') {
      const updatedPlayers = currentPlayers.map(p => ({ ...p }));
      const oldPos = updatedPlayers[currentPlayerIndex].position;
      updatedPlayers[currentPlayerIndex].position = 0;
      // Collect $200 when advancing to HQ (standard Monopoly rule)
      if (oldPos !== 0) {
        updatedPlayers[currentPlayerIndex].cash += 200;
        updatedPlayers[currentPlayerIndex].netWorth += 200;
        addLog(`${player.name} advanced to HQ! Collected $200`);
      }
      setPlayers(updatedPlayers);
    } else if (card.amount) {
      updatePlayerCash(player.id, card.amount);
    }
  };

  // FIX: uses diceValues param instead of stale dice state; uses currentPlayers for ownership
  const handleUtilityLanding = (
    district: District,
    player: Player,
    currentPlayers: Player[],
    diceValues: [number, number]
  ) => {
    const owner = currentPlayers.find(p => p.properties.includes(district.id));
    if (!owner) {
      setShowDistrictModal(district);
    } else if (owner.id !== player.id) {
      const utilitiesOwned = owner.properties.filter(id => DISTRICTS[id].type === 'utility').length;
      const multiplier = utilitiesOwned === 2 ? 10 : 4;
      // FIX: use passed diceValues, not the stale dice state variable
      const rent = (diceValues[0] + diceValues[1]) * multiplier;
      addLog(`${player.name} pays $${rent} (${diceValues[0]}+${diceValues[1]} × ${multiplier}) to ${owner.name}`);
      updatePlayerCash(player.id, -rent);
      updatePlayerCash(owner.id, rent);
    }
  };

  // FIX: uses currentPlayers for ownership lookup
  const handleTransportLanding = (district: District, player: Player, currentPlayers: Player[]) => {
    const owner = currentPlayers.find(p => p.properties.includes(district.id));
    if (!owner) {
      setShowDistrictModal(district);
    } else if (owner.id !== player.id) {
      const transportsOwned = owner.properties.filter(id => DISTRICTS[id].type === 'transport').length;
      const rent = 25 * Math.pow(2, transportsOwned - 1);
      addLog(`${player.name} pays $${rent} transport fee to ${owner.name}`);
      updatePlayerCash(player.id, -rent);
      updatePlayerCash(owner.id, rent);
    }
  };

  const calculateRent = (district: District, owner: Player) => {
    if (!district.rent || !district.group) return district.rent?.[0] || 0;
    const groupProperties = DISTRICTS.filter(d => d.group === district.group && d.cost);
    const ownsAll = groupProperties.every(d => owner.properties.includes(d.id));
    return ownsAll ? district.rent[0] * 2 : district.rent[0];
  };

  const buyDistrict = () => {
    if (!showDistrictModal || !currentPlayer) return;
    const district = showDistrictModal;
    if (district.cost && currentPlayer.cash >= district.cost) {
      const updatedPlayers = players.map(p => ({ ...p }));
      updatedPlayers[currentPlayerIndex].cash -= district.cost;
      updatedPlayers[currentPlayerIndex].properties = [
        ...updatedPlayers[currentPlayerIndex].properties,
        district.id,
      ];
      // Net worth: cash decreases by cost, but property asset added at cost — net neutral
      // We still track it so UI stays consistent
      setPlayers(updatedPlayers);
      addLog(`${currentPlayer.name} acquired ${district.name} for $${district.cost}`);
      setShowDistrictModal(null);
    }
  };

  // Uses functional update so it always gets the latest state (safe for chained calls)
  const updatePlayerCash = (playerId: number, amount: number) => {
    setPlayers(prev => prev.map(p =>
      p.id === playerId
        ? { ...p, cash: Math.max(0, p.cash + amount), netWorth: Math.max(0, p.netWorth + amount) }
        : p
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
          price: Math.max(10, Math.floor(stock.price * (1 + change))),
        };
      });
      return updated;
    });
    addLog('Market prices updated!');
  };

  const addToCart = (ticker: string) => {
    const currentPrice = stockPrices[ticker].price;
    const existing = stockCart.find(item => item.ticker === ticker);
    if (existing) {
      setStockCart(prev =>
        prev.map(item =>
          item.ticker === ticker ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setStockCart(prev => [...prev, { ticker, quantity: 1, price: currentPrice }]);
    }
  };

  const removeFromCart = (ticker: string) => {
    setStockCart(prev => prev.filter(item => item.ticker !== ticker));
  };

  const updateCartQuantity = (ticker: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(ticker);
    } else {
      setStockCart(prev =>
        prev.map(item => (item.ticker === ticker ? { ...item, quantity } : item))
      );
    }
  };

  const checkoutCart = () => {
    if (!currentPlayer || stockCart.length === 0) return;
    // Use current live market prices at checkout time
    const total = stockCart.reduce(
      (sum, item) => sum + (stockPrices[item.ticker]?.price ?? item.price) * item.quantity,
      0
    );
    if (currentPlayer.cash >= total) {
      const updatedPlayers = players.map(p => ({ ...p }));
      updatedPlayers[currentPlayerIndex].cash -= total;
      stockCart.forEach(item => {
        const currentQty = updatedPlayers[currentPlayerIndex].stocks[item.ticker] || 0;
        updatedPlayers[currentPlayerIndex].stocks = {
          ...updatedPlayers[currentPlayerIndex].stocks,
          [item.ticker]: currentQty + item.quantity,
        };
      });
      setPlayers(updatedPlayers);
      addLog(`${currentPlayer.name} bought ${stockCart.length} stock type(s) for $${total}`);
      setStockCart([]);
      setShowStockCart(false);
    } else {
      addLog(`${currentPlayer.name} doesn't have enough cash!`);
    }
  };

  // FIX: market update moved here — triggers every 3 full rounds, not on every dice move
  const endTurn = () => {
    const nextIndex = (currentPlayerIndex + 1) % players.length;
    const completingRound = nextIndex === 0;
    const newRound = completingRound ? roundNumber + 1 : roundNumber;

    if (completingRound && newRound > 0 && newRound % 3 === 0) {
      updateMarket(dice[0] + dice[1]);
    }

    setCurrentPlayerIndex(nextIndex);
    setRoundNumber(newRound);
    setShowDistrictModal(null);
    setTurnPhase('roll');
    setRolledThisTurn(false);
    setCanRollAgain(false); // FIX: always clear doubles state between turns
    setStockCart([]);
    setShowStockCart(false);
    addLog(`--- ${players[nextIndex]?.name}'s turn ---`);
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

  // Use live market prices for cart total
  const cartTotal = stockCart.reduce(
    (sum, item) => sum + (stockPrices[item.ticker]?.price ?? item.price) * item.quantity,
    0
  );

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 text-white flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-black/40 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
          <div className="text-center mb-8">
            <h1
              className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400"
              style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
            >
              CAPITAL WARS
            </h1>
            <p className="text-3xl text-gray-200 mb-3 font-semibold">2050</p>
            <p className="text-gray-300 text-lg">Build your corporate empire in the age of AI & space exploration</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold mb-3 text-gray-200 uppercase tracking-wide">
                Select Corporations
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[2, 3, 4].map(num => (
                  <button
                    key={num}
                    onClick={() => setPlayerCount(num)}
                    className={`p-5 rounded-xl border-2 transition-all font-semibold ${
                      playerCount === num
                        ? 'bg-purple-600 border-purple-400 scale-105 shadow-lg shadow-purple-500/50'
                        : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10'
                    }`}
                  >
                    <Users className="w-8 h-8 mx-auto mb-2" />
                    <div className="font-bold text-lg">{num} Players</div>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={startGame}
              className="w-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-600 hover:via-purple-600 hover:to-pink-600 py-5 rounded-xl font-bold text-xl transition-all transform hover:scale-105 shadow-lg"
            >
              🚀 START GAME
            </button>

            <div className="bg-white/5 rounded-xl p-5 text-sm text-gray-300 border border-white/10">
              <div className="font-bold text-white mb-3 text-base">🎮 MONOPOLY-STYLE FEATURES:</div>
              <ul className="space-y-2 leading-relaxed">
                <li>• Roll doubles to get extra turns (roll again after each double!)</li>
                <li>• Jail/Detention mechanics (3 attempts to roll doubles, then pay $50)</li>
                <li>• Chance cards with rewards & penalties</li>
                <li>• Dynamic rent based on monopolies (own all in a group = 2× rent)</li>
                <li>• Stock trading with shopping cart</li>
                <li>• Utilities & transport stations</li>
              </ul>
              <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-yellow-300 text-xs">
                ⚠️ <strong>Hotseat mode:</strong> Pass the device between players on your turn. Real-time multiplayer across separate devices is not yet supported.
              </div>
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
          <h1
            className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-pink-400"
            style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
          >
            CAPITAL WARS 2050
          </h1>
          <div className="text-sm text-gray-300 mt-1 font-medium">
            Round {roundNumber + 1}
            {canRollAgain && (
              <span className="ml-2 text-yellow-300 font-bold animate-pulse">
                🎯 DOUBLES — Roll again!
              </span>
            )}
          </div>
          {/* Hotseat reminder */}
          <div className="mt-2 inline-block text-xs bg-white/5 border border-white/10 rounded px-3 py-1 text-gray-400">
            Hotseat — pass the device on each turn
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left column */}
          <div className="space-y-4">
            {/* Players panel */}
            <div className="bg-black/40 backdrop-blur-xl rounded-xl p-4 border border-white/10">
              <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Corporations
              </h2>
              {players.map((player, idx) => (
                <div
                  key={player.id}
                  className={`mb-3 p-3 rounded-lg border-2 transition-all ${
                    idx === currentPlayerIndex
                      ? `${player.border} bg-white/10 shadow-lg`
                      : 'border-white/5 bg-white/5'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full ${player.color} shadow-md`}></div>
                      <span className="font-bold text-sm">
                        {player.name}
                        {idx === currentPlayerIndex && (
                          <span className="ml-1 text-yellow-300 text-xs">▶ YOUR TURN</span>
                        )}
                      </span>
                    </div>
                    {player.inJail && (
                      <span className="text-xs bg-red-500/30 px-2 py-1 rounded border border-red-400">
                        🔒 JAIL {player.jailTurns}/3
                      </span>
                    )}
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
                      <span className="font-semibold">{player.properties.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Location:</span>
                      <span className="text-xs truncate max-w-[120px]">{DISTRICTS[player.position].name}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Stock market */}
            <div className="bg-black/40 backdrop-blur-xl rounded-xl p-4 border border-white/10">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Global Markets
                </h2>
                {stockCart.length > 0 && (
                  <button
                    onClick={() => setShowStockCart(!showStockCart)}
                    className="relative bg-purple-600 hover:bg-purple-700 p-2 rounded-lg transition-all"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                      {stockCart.length}
                    </span>
                  </button>
                )}
              </div>

              {showStockCart && stockCart.length > 0 && (
                <div className="mb-3 p-3 bg-purple-900/30 rounded-lg border border-purple-500">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-sm">Shopping Cart</h3>
                    <button onClick={() => setShowStockCart(false)}>
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-2 mb-2">
                    {stockCart.map(item => {
                      const livePrice = stockPrices[item.ticker]?.price ?? item.price;
                      return (
                        <div
                          key={item.ticker}
                          className="flex items-center justify-between text-xs bg-white/5 p-2 rounded"
                        >
                          <div>
                            <div className="font-bold">{item.ticker}</div>
                            <div className="text-gray-400">${livePrice} × {item.quantity}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateCartQuantity(item.ticker, item.quantity - 1)}
                              className="bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-xs"
                            >
                              -
                            </button>
                            <span className="font-bold">{item.quantity}</span>
                            <button
                              onClick={() => updateCartQuantity(item.ticker, item.quantity + 1)}
                              className="bg-green-600 hover:bg-green-700 px-2 py-1 rounded text-xs"
                            >
                              +
                            </button>
                            <button
                              onClick={() => removeFromCart(item.ticker)}
                              className="bg-gray-600 hover:bg-gray-700 px-2 py-1 rounded text-xs ml-1"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex items-center justify-between mb-2 pt-2 border-t border-white/20">
                    <span className="font-bold">Total:</span>
                    <span className="text-green-400 font-bold">${cartTotal.toLocaleString()}</span>
                  </div>
                  <button
                    onClick={checkoutCart}
                    disabled={!currentPlayer || currentPlayer.cash < cartTotal}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed py-2 rounded text-xs font-bold transition-all"
                  >
                    Checkout (${cartTotal})
                  </button>
                </div>
              )}

              {Object.entries(stockPrices).map(([ticker, stock]) => {
                const Icon = stock.icon;
                const owned = currentPlayer?.stocks[ticker] || 0;
                // FIX: stock buying only allowed after rolling (can't buy before your roll)
                const cantBuy = !currentPlayer || currentPlayer.cash < stock.price || turnPhase === 'roll';
                return (
                  <div
                    key={ticker}
                    className="mb-3 p-3 bg-white/5 rounded-lg border border-white/10 hover:border-white/20 transition-all"
                  >
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
                      onClick={() => addToCart(ticker)}
                      disabled={cantBuy}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed py-1.5 rounded text-xs font-bold transition-all"
                    >
                      {turnPhase === 'roll' ? 'Roll first' : 'Add to Cart'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right two columns */}
          <div className="lg:col-span-2 space-y-4">
            {/* Dice & controls */}
            <div className="bg-black/40 backdrop-blur-xl rounded-xl p-6 border border-white/10">
              <div className="text-center mb-4">
                <h3 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${currentPlayer?.color} shadow-lg`}></div>
                  {currentPlayer?.name}
                  {currentPlayer?.inJail && <span className="text-red-400 text-sm">(IN JAIL)</span>}
                </h3>
                <div className="text-sm text-gray-300">
                  {currentPlayer?.inJail
                    ? `Roll doubles to escape, or wait ${3 - currentPlayer.jailTurns} more turn(s) then pay $50`
                    : canRollAgain
                    ? 'You rolled doubles! Roll again or end your turn.'
                    : turnPhase === 'roll'
                    ? 'Roll the dice to move'
                    : turnPhase === 'action'
                    ? 'Take actions, buy stocks, or end your turn'
                    : 'Processing...'}
                </div>
              </div>

              <div className="flex justify-center gap-4 mb-6">
                <div className="bg-gradient-to-br from-white to-gray-200 text-black rounded-xl p-8 flex items-center justify-center shadow-xl transform hover:scale-105 transition-transform w-20 h-20">
                  <span className="text-5xl font-bold">{dice[0]}</span>
                </div>
                <div className="bg-gradient-to-br from-white to-gray-200 text-black rounded-xl p-8 flex items-center justify-center shadow-xl transform hover:scale-105 transition-transform w-20 h-20">
                  <span className="text-5xl font-bold">{dice[1]}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={rollDice}
                  // FIX: allow rolling when canRollAgain (doubles), block otherwise if already rolled
                  disabled={rolledThisTurn && !canRollAgain}
                  className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 transition-all transform hover:scale-105 shadow-lg"
                >
                  🎲 {canRollAgain ? 'Roll Again!' : 'Roll Dice'}
                </button>
                <button
                  onClick={endTurn}
                  disabled={!rolledThisTurn}
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 transition-all transform hover:scale-105 shadow-lg"
                >
                  End Turn →
                </button>
              </div>

              {canRollAgain && !currentPlayer?.inJail && (
                <div className="mt-3 bg-yellow-500/20 border border-yellow-500 rounded-lg p-3 text-center">
                  <span className="text-yellow-300 font-bold">
                    🎯 Doubles! Roll again or end your turn.
                  </span>
                </div>
              )}
            </div>

            {/* Board */}
            <div className="bg-black/40 backdrop-blur-xl rounded-xl p-4 border border-white/10">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Global Map
              </h3>
              <div className="grid grid-cols-10 gap-1">
                {DISTRICTS.map(district => {
                  const playersHere = players.filter(p => p.position === district.id);
                  const owner = players.find(p => p.properties.includes(district.id));
                  const Icon = district.icon;
                  return (
                    <div
                      key={district.id}
                      className={`h-16 rounded-lg ${getDistrictColor(district.color)} relative border-2 border-white/30 flex flex-col items-center justify-center cursor-pointer hover:scale-110 hover:shadow-lg transition-all`}
                      title={`${district.name}${district.cost ? ` — $${district.cost}` : ''}`}
                    >
                      <Icon className="w-4 h-4 text-white mb-0.5" />
                      {playersHere.length > 0 && (
                        <div className="absolute -top-1 -right-1 flex gap-0.5">
                          {playersHere.map(p => (
                            <div
                              key={p.id}
                              className={`w-2.5 h-2.5 rounded-full ${p.color} border border-white shadow-lg`}
                            ></div>
                          ))}
                        </div>
                      )}
                      {owner && (
                        <div
                          className={`absolute -bottom-1 -left-1 w-3 h-3 rounded-full ${owner.color} border-2 border-white shadow-md`}
                        ></div>
                      )}
                      {district.type === 'jail' && (
                        <span className="absolute top-0 left-0 text-[8px] bg-red-500 px-1 rounded">JAIL</span>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="mt-3 text-xs text-gray-400 flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-white border border-gray-400"></div>
                  <span>Player token (top-right)</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-white border border-gray-400"></div>
                  <span>Owner dot (bottom-left)</span>
                </div>
              </div>
            </div>

            {/* Activity log */}
            <div className="bg-black/40 backdrop-blur-xl rounded-xl p-4 border border-white/10">
              <h3 className="font-bold mb-2 flex items-center gap-2">📜 Activity Log</h3>
              <div className="space-y-1 text-xs font-mono max-h-40 overflow-y-auto">
                {gameLog.map((log, idx) => (
                  <div
                    key={idx}
                    className="text-gray-300 bg-white/5 px-3 py-1.5 rounded hover:bg-white/10 transition-colors"
                  >
                    {log}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Buy district modal */}
        {showDistrictModal && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 max-w-md w-full border-2 border-cyan-500 shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                {React.createElement(showDistrictModal.icon, { className: 'w-8 h-8' })}
                <h2 className="text-2xl font-bold">{showDistrictModal.name}</h2>
              </div>
              <div className="space-y-3 mb-6">
                {showDistrictModal.type === 'utility' && (
                  <div className="bg-blue-500/20 border border-blue-400 rounded p-2 text-sm">
                    <span className="font-bold">Utility:</span> Rent = Dice roll × (4 if 1 owned, 10 if both owned)
                  </div>
                )}
                {showDistrictModal.type === 'transport' && (
                  <div className="bg-purple-500/20 border border-purple-400 rounded p-2 text-sm">
                    <span className="font-bold">Transport:</span> $25 → $50 → $100 → $200 based on number owned
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Cost:</span>
                  <span className="font-bold text-green-400 text-lg">
                    ${showDistrictModal.cost?.toLocaleString()}
                  </span>
                </div>
                {showDistrictModal.rent && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Base Rent:</span>
                    <span className="font-bold">${showDistrictModal.rent[0]}</span>
                  </div>
                )}
                {showDistrictModal.region && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Region:</span>
                    <span className="font-bold">{showDistrictModal.region}</span>
                  </div>
                )}
                {showDistrictModal.group && (
                  <div className="bg-yellow-500/20 border border-yellow-400 rounded p-2 text-sm">
                    💡 <span className="font-bold">Tip:</span> Own all in this group for 2× rent!
                  </div>
                )}
                <div className="h-px bg-white/20 my-3"></div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Your Cash:</span>
                  <span
                    className={`font-bold ${
                      currentPlayer && showDistrictModal.cost && currentPlayer.cash >= showDistrictModal.cost
                        ? 'text-green-400'
                        : 'text-red-400'
                    }`}
                  >
                    ${currentPlayer?.cash.toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={buyDistrict}
                  disabled={
                    !currentPlayer ||
                    !showDistrictModal.cost ||
                    currentPlayer.cash < showDistrictModal.cost
                  }
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed py-3 rounded-lg font-bold transition-all transform hover:scale-105 shadow-lg"
                >
                  Buy Property
                </button>
                <button
                  onClick={() => setShowDistrictModal(null)}
                  className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 py-3 rounded-lg font-bold transition-all transform hover:scale-105 shadow-lg"
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
