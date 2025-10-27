// Utility functions

export function formatCurrency(amount: number): string {
  return `$${amount.toLocaleString()}`;
}

export function generateRoomCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

export function calculateNetWorth(player: any): number {
  const propertyValue = player.properties.length * 200; // Simplified
  const stockValue = Object.values(player.stocks).reduce((a: any, b: any) => a + b, 0);
  return player.cash + propertyValue + (stockValue as number);
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}