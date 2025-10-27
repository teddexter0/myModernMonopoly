// TypeScript type definitions
// Currently in app/page.tsx, move here for organization

export interface Player {
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

export interface District {
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

export interface Stock {
  name: string;
  price: number;
  volatility: number;
  icon: React.FC<any>;
  color: string;
}

export interface GameEvent {
  name: string;
  effect: string;
  type: string;
  icon: React.FC<any>;
}