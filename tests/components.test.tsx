import {
  BOARD,
  COMMUNITY_CARDS,
  PULSE_CARDS,
  spaceIsWithinRadius,
} from "../lib/game-data";

describe("Board Component", () => {
  it("uses the complete 32-space fast-play board", () => {
    expect(BOARD).toHaveLength(32);
    expect(BOARD.map((space) => space.id)).toEqual(
      Array.from({ length: 32 }, (_, index) => index),
    );
  });

  it.each([
    ["Public Pulse", PULSE_CARDS],
    ["The Group Chat", COMMUNITY_CARDS],
  ])("%s deck balances boosts and shocks", (_name, cards) => {
    expect(cards.filter((card) => card.tone === "boost")).toHaveLength(6);
    expect(cards.filter((card) => card.tone === "shock")).toHaveLength(6);
    expect(cards.filter((card) => card.tone === "wild")).toHaveLength(3);
    expect(new Set(cards.map((card) => card.id)).size).toBe(cards.length);
  });

  it("computes tariff radius across the board seam", () => {
    expect(spaceIsWithinRadius(31, 1, 2)).toBe(true);
    expect(spaceIsWithinRadius(4, 1, 2)).toBe(false);
  });
});
