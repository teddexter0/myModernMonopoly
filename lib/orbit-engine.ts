import {
  BOARD,
  COMMUNITY_CARDS,
  PULSE_CARDS,
  PLAYER_STYLES,
  EventCard,
  MarketModifier,
  shuffled,
  spaceIsWithinRadius,
} from "./game-data";

export interface Trader {
  id: number;
  name: string;
  color: string;
  avatar: string;
  cash: number;
  position: number;
  assets: Record<number, number>;
  mortgages: number[];
  jail: number;
  frozen: number;
  bankrupt: boolean;
}
export interface Trade {
  partner: number;
  give: number[];
  take: number[];
  cashGive: number;
  cashTake: number;
}
export interface OrbitState {
  version: 2;
  players: Trader[];
  current: number;
  turn: number;
  dice: [number, number];
  doubles: number;
  phase: "roll" | "resolve" | "end" | "over";
  pending: number | null;
  auction: {
    space: number;
    bid: number;
    leader: number | null;
    bidder: number;
    passed: number[];
  } | null;
  card: EventCard | null;
  debt: { payer: number; creditor: number | null; amount: number }[];
  modifiers: (MarketModifier & { title: string; until: number })[];
  decks: { pulse: string[]; community: string[] };
  logs: string[];
  winner: number | null;
  mode: "classic" | "sprint";
  remaining: number;
  trade: Trade | null;
  bankQueue: number[];
}
export type Action =
  | { type: "ROLL"; dice: [number, number] }
  | {
      type:
        | "BUY"
        | "AUCTION"
        | "PASS"
        | "END"
        | "DISMISS"
        | "BAIL"
        | "BANKRUPT"
        | "TICK"
        | "ACCEPT"
        | "REJECT";
    }
  | { type: "BID"; amount: number }
  | { type: "BUILD" | "SELL" | "MORTGAGE" | "LIQUIDATE"; space: number }
  | { type: "TRADE"; trade: Trade };
export const LAP = 200;
export const JAIL = 11;
export const buildingCost = (id: number) =>
  Math.ceil((BOARD[id].cost || 0) / 100) * 50;
export const ownerOf = (s: OrbitState, id: number) =>
  s.players.find((p) => !p.bankrupt && id in p.assets);
export const netWorth = (p: Trader) =>
  p.cash +
  Object.entries(p.assets).reduce(
    (sum, [key, level]) =>
      sum +
      (BOARD[+key].cost || 0) * (p.mortgages.includes(+key) ? 0.5 : 1) +
      level * buildingCost(+key),
    0,
  );
const groupIds = (id: number) =>
  BOARD.filter((b) => b.group && b.group === BOARD[id].group).map((b) => b.id);
export const rents = (id: number): number[] => {
  const r = BOARD[id].rent;
  return r
    ? [r[0], r[1], r[2], r[3], Math.round(r[3] * 1.35), Math.round(r[3] * 1.8)]
    : [];
};
export function inventory(s: OrbitState) {
  let houses = 32,
    hotels = 12;
  s.players.forEach((p) =>
    Object.values(p.assets).forEach((n) => {
      if (n === 5) hotels--;
      else houses -= n;
    }),
  );
  return { houses, hotels };
}
export function buildReason(s: OrbitState, id: number): string | null {
  const p = s.players[s.current],
    group = groupIds(id),
    n = p.assets[id];
  if (BOARD[id].kind !== "asset" || n === undefined)
    return "Own this property first.";
  if (!group.every((i) => i in p.assets && !p.mortgages.includes(i)))
    return "Own the entire unmortgaged colour set.";
  if (n >= 5) return "Hotel complete.";
  if (!group.every((i) => p.assets[i] >= n))
    return "Build evenly across the colour set.";
  if (s.debt.length || p.cash < buildingCost(id))
    return "Not enough available cash.";
  if (n === 4 ? inventory(s).hotels < 1 : inventory(s).houses < 1)
    return "The bank has no buildings available.";
  return null;
}
export function rentFor(
  s: OrbitState,
  id: number,
  total = s.dice[0] + s.dice[1],
) {
  const b = BOARD[id],
    p = ownerOf(s, id);
  if (!p || p.mortgages.includes(id)) return 0;
  let rent = 0;
  if (b.kind === "transit")
    rent =
      25 *
      2 **
        (Object.keys(p.assets).filter((k) => BOARD[+k].kind === "transit")
          .length -
          1);
  if (b.kind === "utility")
    rent =
      total *
      (Object.keys(p.assets).filter((k) => BOARD[+k].kind === "utility")
        .length === 2
        ? 10
        : 4);
  if (b.kind === "asset")
    rent =
      rents(id)[p.assets[id]] *
      (p.assets[id] === 0 && groupIds(id).every((i) => i in p.assets) ? 2 : 1);
  s.modifiers.forEach((m) => {
    if (
      (m.type === "income" ||
        m.type === "rent" ||
        (m.type === "utility" && b.kind === "utility")) &&
      (!m.region || m.region === b.region) &&
      (m.anchor === undefined ||
        spaceIsWithinRadius(id, m.anchor, m.radius || 0))
    )
      rent *= m.multiplier;
  });
  return Math.round(rent);
}
export function createGame(
  count: number,
  mode: "classic" | "sprint",
  names: string[] = [],
): OrbitState {
  return {
    version: 2,
    players: PLAYER_STYLES.slice(0, count).map((p, id) => ({
      ...p,
      id,
      name: names[id]?.trim().slice(0, 24) || p.name,
      cash: 1500,
      position: 0,
      assets: {},
      mortgages: [],
      jail: -1,
      frozen: 0,
      bankrupt: false,
    })),
    current: 0,
    turn: 0,
    dice: [1, 1],
    doubles: 0,
    phase: "roll",
    pending: null,
    auction: null,
    card: null,
    debt: [],
    modifiers: [],
    decks: {
      pulse: shuffled(PULSE_CARDS).map((c) => c.id),
      community: shuffled(COMMUNITY_CARDS).map((c) => c.id),
    },
    logs: ["The accelerator is online. Every empire starts at Launch."],
    winner: null,
    mode,
    remaining: 3600,
    trade: null,
    bankQueue: [],
  };
}
function log(s: OrbitState, text: string) {
  s.logs = [...s.logs.slice(-29), text];
}
function charge(
  s: OrbitState,
  payer: number,
  amount: number,
  creditor: number | null = null,
) {
  if (amount > 0 && !s.players[payer].bankrupt)
    s.debt.push({ payer, amount, creditor });
}
function settle(s: OrbitState) {
  while (s.debt.length) {
    const d = s.debt[0],
      p = s.players[d.payer];
    if (p.cash < d.amount) break;
    p.cash -= d.amount;
    if (d.creditor !== null) s.players[d.creditor].cash += d.amount;
    s.debt.shift();
    log(
      s,
      `${p.name} paid ${d.amount}${d.creditor === null ? " to the bank" : ` to ${s.players[d.creditor].name}`}.`,
    );
  }
}
function jail(s: OrbitState) {
  const p = s.players[s.current];
  p.position = JAIL;
  p.jail = 0;
  s.doubles = 0;
  s.phase = "end";
  log(s, `${p.name} is under audit. No Launch salary on this move.`);
}
function move(s: OrbitState, destination: number, salary = true) {
  const p = s.players[s.current];
  if (salary && destination < p.position) {
    p.cash += LAP;
    log(s, `${p.name} crossed Launch: +${LAP}.`);
  }
  p.position = destination;
  landing(s);
}
function landing(s: OrbitState) {
  const p = s.players[s.current],
    b = BOARD[p.position];
  log(s, `${p.name} landed at ${b.name}.`);
  if (b.id === 31) {
    jail(s);
    return;
  }
  if (b.kind === "pulse" || b.kind === "community") {
    const key = b.kind,
      cards = key === "pulse" ? PULSE_CARDS : COMMUNITY_CARDS,
      id = s.decks[key].shift()!;
    s.decks[key].push(id);
    const c = cards.find((c) => c.id === id)!;
    s.card = c;
    if (c.amount) {
      if (c.amount > 0) p.cash += c.amount;
      else charge(s, p.id, -c.amount);
    }
    if (c.eachAmount)
      s.players
        .filter((q) => q.id !== p.id && !q.bankrupt)
        .forEach((q) => {
          if (c.eachAmount! > 0) charge(s, q.id, c.eachAmount!, p.id);
          else charge(s, p.id, -c.eachAmount!, q.id);
        });
    if (c.freezeTurns) p.frozen += c.freezeTurns;
    if (c.modifier)
      s.modifiers.push({
        ...c.modifier,
        title: c.title,
        until:
          s.turn +
          c.modifier.rounds * s.players.filter((q) => !q.bankrupt).length,
      });
    if (c.moveTo !== undefined) move(s, c.moveTo);
    log(s, c.title);
    return;
  }
  if (b.kind === "tax") {
    let amount = b.amount || 0;
    s.modifiers
      .filter((m) => m.type === "tax")
      .forEach((m) => (amount *= m.multiplier));
    charge(s, p.id, Math.round(amount));
  }
  if (b.cost) {
    const owner = ownerOf(s, b.id);
    if (!owner) {
      s.pending = b.id;
      s.phase = "resolve";
    } else if (owner.id !== p.id) charge(s, p.id, rentFor(s, b.id), owner.id);
  }
}
function beginAuction(s: OrbitState, id: number) {
  s.pending = null;
  s.auction = {
    space: id,
    bid: 0,
    leader: null,
    bidder: s.players.find((p) => !p.bankrupt)!.id,
    passed: [],
  };
}
function advanceAuction(s: OrbitState) {
  const a = s.auction!;
  const eligible = s.players.filter(
    (p) => !p.bankrupt && !a.passed.includes(p.id) && p.id !== a.leader,
  );
  if (!eligible.length) {
    if (a.leader !== null) {
      const p = s.players[a.leader];
      p.cash -= a.bid;
      p.assets[a.space] = 0;
      log(s, `${p.name} won ${BOARD[a.space].name} for ${a.bid}.`);
    } else log(s, `${BOARD[a.space].name} remains with the bank.`);
    s.auction = null;
    s.phase = "end";
    if (s.bankQueue.length) beginAuction(s, s.bankQueue.shift()!);
    return;
  }
  for (let i = 1; i <= s.players.length; i++) {
    const id = (a.bidder + i) % s.players.length;
    if (eligible.some((p) => p.id === id)) {
      a.bidder = id;
      break;
    }
  }
}
function liquidateValue(p: Trader) {
  return (
    p.cash +
    Object.entries(p.assets).reduce(
      (sum, [id, level]) =>
        sum +
        (level * buildingCost(+id)) / 2 +
        (p.mortgages.includes(+id)
          ? 0
          : Math.floor((BOARD[+id].cost || 0) / 2)),
      0,
    )
  );
}
export function orbitReducer(state: OrbitState, action: Action): OrbitState {
  if (state.phase === "over") return state;
  if (
    action.type === "TICK" &&
    (state.mode === "classic" ||
      state.card ||
      state.auction ||
      state.trade ||
      state.debt.length ||
      state.pending !== null)
  )
    return state;
  const s: OrbitState = JSON.parse(JSON.stringify(state));
  let p = s.players[s.current];
  const blocked = s.card || s.auction || s.trade || s.debt.length;
  if (action.type === "TICK") {
    if (s.mode === "sprint" && !blocked && s.pending === null) {
      s.remaining = Math.max(0, s.remaining - 1);
      if (!s.remaining) {
        s.phase = "over";
        s.winner = [...s.players]
          .filter((p) => !p.bankrupt)
          .sort((a, b) => netWorth(b) - netWorth(a))[0].id;
      }
    }
    return s;
  }
  if (action.type === "DISMISS") {
    s.card = null;
    return s;
  }
  if (s.card) return state;
  if (action.type === "ROLL" && s.phase === "roll" && !blocked) {
    if (!action.dice.every((n) => Number.isInteger(n) && n >= 1 && n <= 6))
      return state;
    s.dice = action.dice;
    s.phase = "end";
    const double = action.dice[0] === action.dice[1];
    if (p.frozen) {
      p.frozen--;
      s.doubles = 0;
      log(s, `${p.name} served a frozen turn.`);
      return s;
    }
    if (p.jail >= 0) {
      if (!double && p.jail < 2) {
        p.jail++;
        log(s, "Audit continues. Try doubles next turn or pay 50.");
        return s;
      }
      if (!double) charge(s, p.id, 50);
      p.jail = -1;
      s.doubles = 0;
    } else {
      s.doubles = double ? s.doubles + 1 : 0;
      if (s.doubles === 3) {
        jail(s);
        return s;
      }
    }
    move(s, (p.position + action.dice[0] + action.dice[1]) % BOARD.length);
    settle(s);
    return s;
  }
  if (
    action.type === "BAIL" &&
    s.phase === "roll" &&
    !blocked &&
    p.jail >= 0 &&
    p.cash >= 50
  ) {
    p.cash -= 50;
    p.jail = -1;
    log(s, `${p.name} paid 50 to leave audit.`);
    return s;
  }
  if (action.type === "BUY" && s.pending !== null && !blocked) {
    const id = s.pending,
      cost = BOARD[id].cost!;
    if (p.cash < cost) return state;
    p.cash -= cost;
    p.assets[id] = 0;
    s.pending = null;
    s.phase = "end";
    log(s, `${p.name} bought ${BOARD[id].name} for ${cost}.`);
    return s;
  }
  if (action.type === "AUCTION" && s.pending !== null && !blocked) {
    beginAuction(s, s.pending);
    return s;
  }
  if (s.auction) {
    const a = s.auction,
      bidder = s.players[a.bidder];
    if (
      action.type === "BID" &&
      Number.isInteger(action.amount) &&
      action.amount > a.bid &&
      action.amount <= bidder.cash
    ) {
      a.bid = action.amount;
      a.leader = bidder.id;
      advanceAuction(s);
    } else if (action.type === "PASS") {
      a.passed.push(bidder.id);
      advanceAuction(s);
    }
    return s;
  }
  if (s.trade) {
    if (action.type === "REJECT") s.trade = null;
    else if (action.type === "ACCEPT") {
      const t = s.trade,
        q = s.players[t.partner];
      p.cash += t.cashTake - t.cashGive;
      q.cash += t.cashGive - t.cashTake;
      t.give.forEach((id) => {
        q.assets[id] = p.assets[id];
        delete p.assets[id];
      });
      t.take.forEach((id) => {
        p.assets[id] = q.assets[id];
        delete q.assets[id];
      });
      s.trade = null;
      log(s, `${p.name} and ${q.name} completed a trade.`);
    } else return state;
    return s;
  }
  if (
    action.type === "BUILD" ||
    action.type === "SELL" ||
    action.type === "LIQUIDATE" ||
    action.type === "MORTGAGE"
  ) {
    if (s.debt.length) p = s.players[s.debt[0].payer];
    const id = action.space;
    if (!BOARD[id] || !(id in p.assets)) return state;
    const n = p.assets[id],
      group = groupIds(id);
    if (action.type === "BUILD") {
      if (p.id !== s.current || buildReason(s, id)) return state;
      p.cash -= buildingCost(id);
      p.assets[id]++;
    }
    if (action.type === "SELL") {
      if (
        !n ||
        !group.every((i) => (p.assets[i] || 0) <= n) ||
        (n === 5 && inventory(s).houses < 4)
      )
        return state;
      p.assets[id]--;
      p.cash += buildingCost(id) / 2;
    }
    if (action.type === "LIQUIDATE") {
      if (!group.length) return state;
      group.forEach((i) => {
        if (i in p.assets) {
          p.cash += (p.assets[i] * buildingCost(i)) / 2;
          p.assets[i] = 0;
        }
      });
    }
    if (action.type === "MORTGAGE") {
      const value = Math.floor(BOARD[id].cost! / 2);
      if (p.mortgages.includes(id)) {
        const cost = Math.ceil(value * 1.1);
        if (s.debt.length || p.cash < cost) return state;
        p.cash -= cost;
        p.mortgages = p.mortgages.filter((i) => i !== id);
      } else {
        if (group.some((i) => p.assets[i] > 0)) return state;
        p.mortgages.push(id);
        p.cash += value;
      }
    }
    log(s, `${p.name}: ${action.type.toLowerCase()} at ${BOARD[id].name}.`);
    settle(s);
    return s;
  }
  if (action.type === "TRADE" && !blocked && s.pending === null) {
    const t = action.trade,
      q = s.players[t.partner];
    if (
      !q ||
      q.id === p.id ||
      q.bankrupt ||
      ![t.cashGive, t.cashTake].every((n) => Number.isInteger(n) && n >= 0) ||
      p.cash < t.cashGive ||
      q.cash < t.cashTake ||
      new Set([...t.give, ...t.take]).size !== t.give.length + t.take.length
    )
      return state;
    const tradable = (owner: Trader, id: number) =>
      BOARD[id] &&
      id in owner.assets &&
      !owner.mortgages.includes(id) &&
      !groupIds(id).some((i) => owner.assets[i] > 0);
    if (
      !t.give.every((id) => tradable(p, id)) ||
      !t.take.every((id) => tradable(q, id))
    )
      return state;
    s.trade = t;
    return s;
  }
  if (action.type === "BANKRUPT" && s.debt.length) {
    const d = s.debt[0],
      debtor = s.players[d.payer];
    if (liquidateValue(debtor) >= d.amount) return state;
    const proceeds =
      debtor.cash +
      Object.entries(debtor.assets).reduce(
        (sum, [id, n]) => sum + (n * buildingCost(+id)) / 2,
        0,
      );
    if (d.creditor !== null) {
      const q = s.players[d.creditor];
      q.cash += proceeds;
      Object.keys(debtor.assets).forEach((id) => (q.assets[+id] = 0));
      q.mortgages.push(...debtor.mortgages);
      const interest = debtor.mortgages.reduce(
        (sum, id) => sum + Math.ceil(Math.floor(BOARD[id].cost! / 2) * 0.1),
        0,
      );
      charge(s, q.id, interest);
    } else s.bankQueue.push(...Object.keys(debtor.assets).map(Number));
    debtor.assets = {};
    debtor.mortgages = [];
    debtor.cash = 0;
    debtor.bankrupt = true;
    s.debt = s.debt.filter((x) => x.payer !== debtor.id);
    log(s, `${debtor.name} is bankrupt.`);
    const alive = s.players.filter((p) => !p.bankrupt);
    if (alive.length === 1) {
      s.winner = alive[0].id;
      s.phase = "over";
    } else if (!s.debt.length && s.bankQueue.length)
      beginAuction(s, s.bankQueue.shift()!);
    settle(s);
    return s;
  }
  if (
    action.type === "END" &&
    s.phase === "end" &&
    !blocked &&
    s.pending === null
  ) {
    if (s.doubles && !p.bankrupt && p.jail < 0) {
      s.phase = "roll";
      log(s, `${p.name} rolled doubles. Roll again.`);
      return s;
    }
    do {
      s.current = (s.current + 1) % s.players.length;
    } while (s.players[s.current].bankrupt);
    s.turn++;
    s.doubles = 0;
    s.phase = "roll";
    s.modifiers = s.modifiers.filter((m) => m.until > s.turn);
    return s;
  }
  return state;
}
