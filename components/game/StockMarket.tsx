import React from 'react';

interface StockMarketProps {
  stocks: any;
  onBuyStock: (ticker: string) => void;
}

export default function StockMarket({ stocks, onBuyStock }: StockMarketProps) {
  return (
    <div className="space-y-3">
      {Object.entries(stocks).map(([ticker, stock]: [string, any]) => (
        <div key={ticker} className="p-3 bg-white/5 rounded-lg">
          <div className="font-bold">{ticker}</div>
          <div className="text-green-400">${stock.price}</div>
          <button onClick={() => onBuyStock(ticker)} className="mt-2 bg-blue-600 px-4 py-1 rounded">
            Buy
          </button>
        </div>
      ))}
    </div>
  );
}