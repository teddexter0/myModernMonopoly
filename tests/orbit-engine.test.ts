import { BOARD } from "../lib/game-data";
import {
  buildReason,
  createGame,
  inventory,
  netWorth,
  orbitReducer as act,
  rentFor,
  OrbitState,
} from "../lib/orbit-engine";

function landed(id: number, count = 2) {
  const s = createGame(count, "classic");
  s.players[0].position = id;
  s.pending = id;
  s.phase = "resolve";
  return s;
}
describe("Orbital property economy", () => {
  it("liquidates a complete developed set without needing spare bank houses", () => {
    let s = createGame(2, "classic");
    s.players[0].assets = { 1: 5, 3: 4, 4: 4 };
    const opening = s.players[0].cash;
    s = act(s, { type: "LIQUIDATE", space: 1 });
    expect(s.players[0].assets).toEqual({ 1: 0, 3: 0, 4: 0 });
    expect(s.players[0].cash).toBe(opening + 650);
    expect(inventory(s)).toEqual({ houses: 32, hotels: 12 });
  });
  it.each([2, 3, 4])(
    "keeps a simulated %i-player session solvent and progressing",
    (count) => {
      let s = createGame(count, "classic"),
        seed = 1031;
      const rand = () => {
        seed = (seed * 16807) % 2147483647;
        return seed / 2147483647;
      };
      for (let step = 0; step < 2500 && s.phase !== "over"; step++) {
        if (s.card) s = act(s, { type: "DISMISS" });
        else if (s.auction) s = act(s, { type: "PASS" });
        else if (s.debt.length) {
          const p = s.players[s.debt[0].payer],
            developed = Object.keys(p.assets)
              .map(Number)
              .find((id) => p.assets[id] > 0),
            free = Object.keys(p.assets)
              .map(Number)
              .find((id) => !p.mortgages.includes(id));
          s =
            developed !== undefined
              ? act(s, { type: "LIQUIDATE", space: developed })
              : free !== undefined
                ? act(s, { type: "MORTGAGE", space: free })
                : act(s, { type: "BANKRUPT" });
        } else if (s.pending !== null)
          s = act(s, {
            type:
              s.players[s.current].cash >= BOARD[s.pending].cost!
                ? "BUY"
                : "AUCTION",
          });
        else if (s.phase === "roll")
          s = act(s, {
            type: "ROLL",
            dice: [1 + Math.floor(rand() * 6), 1 + Math.floor(rand() * 6)],
          });
        else s = act(s, { type: "END" });
        expect(
          s.players.every((p) => p.cash >= 0 && Number.isFinite(p.cash)),
        ).toBe(true);
        const deeds = s.players.flatMap((p) => Object.keys(p.assets));
        expect(new Set(deeds).size).toBe(deeds.length);
      }
      if (s.phase === "over")
        expect(s.players.filter((p) => !p.bankrupt)).toHaveLength(1);
      else expect(s.turn).toBeGreaterThan(100);
    },
  );
  it("requires buying or auctioning before the turn can end", () => {
    const s = landed(1);
    expect(act(s, { type: "END" })).toBe(s);
    const n = act(s, { type: "BUY" });
    expect(n.players[0].assets[1]).toBe(0);
    expect(n.players[0].cash).toBe(1380);
    expect(act(n, { type: "END" }).current).toBe(1);
  });
  it("auctions to the highest cash-backed bid including the decliner", () => {
    let s = act(landed(1), { type: "AUCTION" });
    s = act(s, { type: "BID", amount: 60 });
    expect(s.auction?.bidder).toBe(1);
    expect(act(s, { type: "BID", amount: 2000 })).toEqual(s);
    s = act(s, { type: "BID", amount: 100 });
    s = act(s, { type: "PASS" });
    expect(s.auction).toBeNull();
    expect(s.players[1].assets[1]).toBe(0);
    expect(s.players[1].cash).toBe(1400);
  });
  it("leaves a property unowned when everyone passes", () => {
    let s = act(landed(1), { type: "AUCTION" });
    s = act(s, { type: "PASS" });
    s = act(s, { type: "PASS" });
    expect(s.auction).toBeNull();
    expect(s.players.every((p) => !(1 in p.assets))).toBe(true);
  });
  it("cannot change reserved auction cash with property actions", () => {
    let s = act(landed(1), { type: "AUCTION" });
    s.players[0].assets[3] = 0;
    s = act(s, { type: "BID", amount: 1450 });
    expect(act(s, { type: "BUILD", space: 3 })).toEqual(s);
  });
  it("needs a complete set and enforces even building and selling", () => {
    let s = createGame(2, "classic");
    s.players[0].assets = { 1: 0, 3: 0 };
    expect(buildReason(s, 1)).toContain("entire");
    s.players[0].assets[4] = 0;
    expect(rentFor(s, 1)).toBe(36);
    s = act(s, { type: "BUILD", space: 1 });
    expect(s.players[0].assets[1]).toBe(1);
    expect(act(s, { type: "BUILD", space: 1 })).toBe(s);
    s.players[0].assets = { 1: 2, 3: 1, 4: 1 };
    expect(act(s, { type: "SELL", space: 3 })).toBe(s);
  });
  it("tracks house/hotel supply when upgrading and downgrading", () => {
    let s = createGame(2, "classic");
    s.players[0].cash = 10000;
    s.players[0].assets = { 1: 4, 3: 4, 4: 4 };
    expect(inventory(s)).toEqual({ houses: 20, hotels: 12 });
    s = act(s, { type: "BUILD", space: 1 });
    expect(inventory(s)).toEqual({ houses: 24, hotels: 11 });
    s = act(s, { type: "SELL", space: 1 });
    expect(inventory(s)).toEqual({ houses: 20, hotels: 12 });
  });
  it("mortgages for half value, suppresses rent and redeems with interest", () => {
    let s = createGame(2, "classic");
    s.players[0].assets[1] = 0;
    s = act(s, { type: "MORTGAGE", space: 1 });
    expect(s.players[0].cash).toBe(1560);
    expect(rentFor(s, 1)).toBe(0);
    s = act(s, { type: "MORTGAGE", space: 1 });
    expect(s.players[0].cash).toBe(1494);
    expect(rentFor(s, 1)).toBe(18);
  });
  it("refuses mortgages while any building exists in the colour set", () => {
    const s = createGame(2, "classic");
    s.players[0].assets = { 1: 0, 3: 1, 4: 0 };
    expect(act(s, { type: "MORTGAGE", space: 1 })).toBe(s);
  });
  it("uses current dice for utilities and network ownership for transit", () => {
    const s = createGame(2, "classic");
    s.players[1].assets = { 13: 0, 5: 0 };
    expect(rentFor(s, 13, 7)).toBe(28);
    s.players[1].assets[19] = 0;
    expect(rentFor(s, 13, 7)).toBe(70);
    s.players[1].assets[21] = 0;
    s.players[1].assets[29] = 0;
    expect(rentFor(s, 5)).toBe(100);
  });
  it("resolves rent as debt rather than inventing money or clamping balances", () => {
    let s = createGame(2, "classic");
    s.players[0].cash = 5;
    s.players[0].position = 0;
    s.players[0].assets[4] = 0;
    s.players[1].assets[3] = 0;
    s = act(s, { type: "ROLL", dice: [1, 2] });
    expect(s.debt[0].amount).toBe(22);
    expect(s.players[1].cash).toBe(1500);
    expect(act(s, { type: "END" })).toBe(s);
    s = act(s, { type: "MORTGAGE", space: 4 });
    expect(s.debt).toHaveLength(0);
    expect(s.players[0].cash).toBe(63);
    expect(s.players[1].cash).toBe(1522);
  });
  it("transfers insolvent estates to the creditor and ends a two-player game", () => {
    let s = createGame(2, "classic");
    s.players[0].cash = 5;
    s.players[0].assets[1] = 0;
    s.players[1].assets[3] = 5;
    s = act(s, { type: "ROLL", dice: [1, 2] });
    s = act(s, { type: "BANKRUPT" });
    expect(s.players[0].bankrupt).toBe(true);
    expect(s.players[1].assets[1]).toBe(0);
    expect(s.winner).toBe(1);
    expect(s.phase).toBe("over");
  });
  it("auctions returned bank estates and skips bankrupt players", () => {
    let s = createGame(3, "classic");
    s.players[0].position = 24;
    s.players[0].cash = 0;
    s.players[0].assets[1] = 0;
    s = act(s, { type: "ROLL", dice: [1, 1] });
    expect(s.debt[0].creditor).toBeNull();
    s = act(s, { type: "BANKRUPT" });
    expect(s.auction?.space).toBe(1);
    s = act(s, { type: "PASS" });
    s = act(s, { type: "PASS" });
    s = act(s, { type: "END" });
    expect(s.current).toBe(1);
  });
  it("keeps doubles until three sends the player to audit", () => {
    let s = createGame(2, "classic");
    s.players[0].assets = { 2: 0 };
    s = act(s, { type: "ROLL", dice: [2, 2] });
    s = act(s, { type: "BUY" });
    s = act(s, { type: "END" });
    expect(s.current).toBe(0);
    s = act(s, { type: "ROLL", dice: [2, 2] });
    s = act(s, { type: "BUY" });
    s = act(s, { type: "END" });
    s = act(s, { type: "ROLL", dice: [2, 2] });
    expect(s.players[0].position).toBe(11);
    expect(s.players[0].jail).toBe(0);
    expect(s.doubles).toBe(0);
  });
  it("does not award a bonus roll on doubles used to escape audit", () => {
    let s = createGame(2, "classic");
    s.players[0].position = 11;
    s.players[0].jail = 1;
    s = act(s, { type: "ROLL", dice: [3, 3] });
    expect(s.players[0].jail).toBe(-1);
    expect(s.doubles).toBe(0);
    s = act(s, { type: "BUY" });
    expect(act(s, { type: "END" }).current).toBe(1);
  });
  it("charges the mandatory fine on the third failed audit roll", () => {
    let s = createGame(2, "classic");
    s.players[0].position = 11;
    s.players[0].jail = 2;
    s = act(s, { type: "ROLL", dice: [2, 4] });
    expect(s.players[0].jail).toBe(-1);
    expect(s.players[0].cash).toBe(1450);
  });
  it("collects Launch salary after wraparound", () => {
    const s = createGame(2, "classic");
    s.players[0].position = 30;
    const n = act(s, { type: "ROLL", dice: [1, 2] });
    expect(n.players[0].position).toBe(1);
    expect(n.players[0].cash).toBe(1700);
  });
  it("resolves movement cards and pays Launch salary exactly once", () => {
    const s = createGame(2, "classic");
    s.players[0].position = 4;
    s.decks.community = [
      "c05",
      ...s.decks.community.filter((c) => c !== "c05"),
    ];
    const n = act(s, { type: "ROLL", dice: [1, 2] });
    expect(n.players[0].position).toBe(0);
    expect(n.players[0].cash).toBe(1775);
    expect(n.decks.community[n.decks.community.length - 1]).toBe("c05");
  });
  it("transfers cash and deeds atomically only after trade acceptance", () => {
    let s = createGame(2, "classic");
    s.players[0].assets[1] = 0;
    s.players[1].assets[3] = 0;
    const t = { partner: 1, give: [1], take: [3], cashGive: 50, cashTake: 0 };
    s = act(s, { type: "TRADE", trade: t });
    expect(s.players[0].assets[1]).toBe(0);
    expect(act(s, { type: "ROLL", dice: [1, 2] })).toBe(s);
    s = act(s, { type: "ACCEPT" });
    expect(s.players[0].assets).toEqual({ 3: 0 });
    expect(s.players[1].assets).toEqual({ 1: 0 });
    expect(s.players[0].cash).toBe(1450);
    expect(s.players[1].cash).toBe(1550);
  });
  it("rejects invalid trade ownership, negative money and mortgaged deeds", () => {
    const s = createGame(2, "classic");
    s.players[0].assets[1] = 0;
    s.players[0].mortgages = [1];
    const t = { partner: 1, give: [1], take: [], cashGive: 0, cashTake: 0 };
    expect(act(s, { type: "TRADE", trade: t })).toBe(s);
    expect(
      act(s, { type: "TRADE", trade: { ...t, give: [], cashGive: -1 } }),
    ).toBe(s);
  });
  it("does not mutate previous state and restores a saved state deterministically", () => {
    const s = landed(1),
      snapshot = JSON.stringify(s);
    act(s, { type: "BUY" });
    expect(JSON.stringify(s)).toBe(snapshot);
    expect(act(JSON.parse(snapshot), { type: "BUY" })).toEqual(
      act(s, { type: "BUY" }),
    );
  });
  it("only expires Sprint during active play and picks the richest survivor", () => {
    let s = createGame(2, "sprint");
    s.remaining = 1;
    s.players[1].cash = 1800;
    s = act(s, { type: "TICK" });
    expect(s.phase).toBe("over");
    expect(s.winner).toBe(1);
    const pending = landed(1);
    pending.mode = "sprint";
    pending.remaining = 1;
    expect(act(pending, { type: "TICK" }).remaining).toBe(1);
    expect(act(createGame(2, "classic"), { type: "TICK" }).remaining).toBe(
      3600,
    );
  });
  it("values mortgaged properties at half and buildings at cost", () => {
    const s = createGame(2, "classic");
    s.players[0].assets[1] = 0;
    s.players[0].mortgages = [1];
    expect(netWorth(s.players[0])).toBe(1560);
  });
});
