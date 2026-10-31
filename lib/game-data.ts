import {
  Building2,
  Clapperboard,
  Coins,
  Crown,
  FerrisWheel,
  Film,
  Globe2,
  Landmark,
  LucideIcon,
  MapPin,
  Plane,
  Radio,
  ShieldAlert,
  Sparkles,
  TrainFront,
  Users,
  Waves,
  Zap,
} from "lucide-react";

export type SpaceKind =
  | "asset"
  | "pulse"
  | "community"
  | "transit"
  | "utility"
  | "tax"
  | "corner";

export type AssetGroup =
  | "american-dream"
  | "africa-rising"
  | "culture-capital"
  | "gulf-future"
  | "royal-mile"
  | "next-frontier";

export interface BoardSpace {
  id: number;
  name: string;
  shortName: string;
  kind: SpaceKind;
  group?: AssetGroup;
  region?: string;
  cost?: number;
  rent?: [number, number, number, number];
  amount?: number;
  icon: LucideIcon;
}

export interface MarketModifier {
  type: "rent" | "utility" | "tax" | "income";
  multiplier: number;
  rounds: number;
  region?: string;
  anchor?: number;
  radius?: number;
}

export interface EventCard {
  id: string;
  deck: "pulse" | "community";
  tone: "boost" | "shock" | "wild";
  kicker: string;
  title: string;
  body: string;
  amount?: number;
  eachAmount?: number;
  freezeTurns?: number;
  moveTo?: number;
  modifier?: MarketModifier;
}

export const GROUPS: Record<
  AssetGroup,
  { label: string; color: string; glow: string }
> = {
  "american-dream": {
    label: "American Dream",
    color: "#ff6b5f",
    glow: "rgba(255,107,95,.34)",
  },
  "africa-rising": {
    label: "Africa Rising",
    color: "#f6bd43",
    glow: "rgba(246,189,67,.34)",
  },
  "culture-capital": {
    label: "Culture Capital",
    color: "#c887ff",
    glow: "rgba(200,135,255,.34)",
  },
  "gulf-future": {
    label: "Gulf Future",
    color: "#23c9b8",
    glow: "rgba(35,201,184,.34)",
  },
  "royal-mile": {
    label: "Royal Mile",
    color: "#4b8dff",
    glow: "rgba(75,141,255,.34)",
  },
  "next-frontier": {
    label: "Next Frontier",
    color: "#ff72b6",
    glow: "rgba(255,114,182,.34)",
  },
};

// 32 spaces keeps a full lap brisk while leaving room for distinct economies.
export const BOARD: BoardSpace[] = [
  {
    id: 0,
    name: "The Launch",
    shortName: "LAUNCH",
    kind: "corner",
    icon: Sparkles,
  },
  {
    id: 1,
    name: "L.A. Skyline Penthouse",
    shortName: "L.A. PENTHOUSE",
    kind: "asset",
    group: "american-dream",
    region: "USA",
    cost: 120,
    rent: [18, 52, 108, 196],
    icon: Building2,
  },
  {
    id: 2,
    name: "Public Pulse",
    shortName: "PULSE",
    kind: "pulse",
    icon: Radio,
  },
  {
    id: 3,
    name: "Miami Beach House",
    shortName: "MIAMI HOUSE",
    kind: "asset",
    group: "american-dream",
    region: "USA",
    cost: 140,
    rent: [22, 60, 124, 220],
    icon: Waves,
  },
  {
    id: 4,
    name: "Manhattan Glass Condo",
    shortName: "MANHATTAN",
    kind: "asset",
    group: "american-dream",
    region: "USA",
    cost: 160,
    rent: [26, 72, 142, 246],
    icon: Building2,
  },
  {
    id: 5,
    name: "Atlantic Airlink",
    shortName: "AIRLINK",
    kind: "transit",
    cost: 180,
    icon: Plane,
  },
  {
    id: 6,
    name: "Nairobi Creative Quarter",
    shortName: "NAIROBI",
    kind: "asset",
    group: "africa-rising",
    region: "Africa",
    cost: 170,
    rent: [28, 78, 154, 268],
    icon: MapPin,
  },
  {
    id: 7,
    name: "The Group Chat",
    shortName: "GROUP CHAT",
    kind: "community",
    icon: Users,
  },
  {
    id: 8,
    name: "Cairo Media City",
    shortName: "CAIRO",
    kind: "asset",
    group: "africa-rising",
    region: "Africa",
    cost: 180,
    rent: [30, 84, 166, 286],
    icon: Film,
  },
  {
    id: 9,
    name: "Johannesburg Gold Mile",
    shortName: "JOBURG",
    kind: "asset",
    group: "africa-rising",
    region: "Africa",
    cost: 195,
    rent: [34, 92, 180, 308],
    icon: Coins,
  },
  {
    id: 10,
    name: "Lagos Night Market",
    shortName: "LAGOS",
    kind: "asset",
    group: "africa-rising",
    region: "Africa",
    cost: 210,
    rent: [38, 102, 198, 334],
    icon: Globe2,
  },
  {
    id: 11,
    name: "Audit Lounge",
    shortName: "AUDIT",
    kind: "corner",
    icon: ShieldAlert,
  },
  {
    id: 12,
    name: "Hyperreal 7DX Cinema",
    shortName: "7DX CINEMA",
    kind: "asset",
    group: "culture-capital",
    region: "Culture",
    cost: 210,
    rent: [38, 104, 204, 346],
    icon: Clapperboard,
  },
  {
    id: 13,
    name: "Creator Cloud",
    shortName: "CREATOR CLOUD",
    kind: "utility",
    cost: 190,
    icon: Radio,
  },
  {
    id: 14,
    name: "The Louvre After Dark",
    shortName: "LOUVRE",
    kind: "asset",
    group: "culture-capital",
    region: "Culture",
    cost: 225,
    rent: [42, 114, 220, 370],
    icon: Landmark,
  },
  {
    id: 15,
    name: "Wonderworld Resort",
    shortName: "WONDERWORLD",
    kind: "asset",
    group: "culture-capital",
    region: "Culture",
    cost: 240,
    rent: [46, 124, 238, 396],
    icon: FerrisWheel,
  },
  {
    id: 16,
    name: "Public Pulse",
    shortName: "PULSE",
    kind: "pulse",
    icon: Radio,
  },
  {
    id: 17,
    name: "Dubai Cloud Residence",
    shortName: "DUBAI",
    kind: "asset",
    group: "gulf-future",
    region: "Gulf",
    cost: 245,
    rent: [48, 130, 248, 412],
    icon: Building2,
  },
  {
    id: 18,
    name: "Doha Waterfront Vaults",
    shortName: "DOHA",
    kind: "asset",
    group: "gulf-future",
    region: "Gulf",
    cost: 260,
    rent: [52, 140, 266, 438],
    icon: Landmark,
  },
  {
    id: 19,
    name: "Desert Solar Grid",
    shortName: "SOLAR GRID",
    kind: "utility",
    cost: 205,
    icon: Zap,
  },
  {
    id: 20,
    name: "Riyadh Future Forum",
    shortName: "RIYADH",
    kind: "asset",
    group: "gulf-future",
    region: "Gulf",
    cost: 275,
    rent: [56, 150, 284, 464],
    icon: Globe2,
  },
  {
    id: 21,
    name: "Silk Route Express",
    shortName: "SILK ROUTE",
    kind: "transit",
    cost: 180,
    icon: TrainFront,
  },
  {
    id: 22,
    name: "Buckingham House",
    shortName: "BUCKINGHAM",
    kind: "asset",
    group: "royal-mile",
    region: "Britain",
    cost: 280,
    rent: [58, 156, 296, 482],
    icon: Crown,
  },
  {
    id: 23,
    name: "The Group Chat",
    shortName: "GROUP CHAT",
    kind: "community",
    icon: Users,
  },
  {
    id: 24,
    name: "Notting Hill Townhouse",
    shortName: "NOTTING HILL",
    kind: "asset",
    group: "royal-mile",
    region: "Britain",
    cost: 295,
    rent: [62, 166, 314, 508],
    icon: Building2,
  },
  {
    id: 25,
    name: "Edinburgh Castle Club",
    shortName: "CASTLE CLUB",
    kind: "asset",
    group: "royal-mile",
    region: "Britain",
    cost: 310,
    rent: [66, 176, 332, 536],
    icon: Crown,
  },
  {
    id: 26,
    name: "Luxury Levy",
    shortName: "LUXURY LEVY",
    kind: "tax",
    amount: 110,
    icon: Coins,
  },
  {
    id: 27,
    name: "Public Pulse",
    shortName: "PULSE",
    kind: "pulse",
    icon: Radio,
  },
  {
    id: 28,
    name: "Orbital Hotel One",
    shortName: "ORBITAL ONE",
    kind: "asset",
    group: "next-frontier",
    region: "Frontier",
    cost: 330,
    rent: [72, 192, 360, 574],
    icon: Sparkles,
  },
  {
    id: 29,
    name: "Pacific Hyperline",
    shortName: "HYPERLINE",
    kind: "transit",
    cost: 180,
    icon: TrainFront,
  },
  {
    id: 30,
    name: "Lunar Film Colony",
    shortName: "LUNAR FILM",
    kind: "asset",
    group: "next-frontier",
    region: "Frontier",
    cost: 350,
    rent: [80, 210, 392, 620],
    icon: Film,
  },
  {
    id: 31,
    name: "Final Bell Gate",
    shortName: "FINAL BELL",
    kind: "corner",
    icon: Sparkles,
  },
];

export const PULSE_CARDS: EventCard[] = [
  {
    id: "p01",
    deck: "pulse",
    tone: "boost",
    kicker: "MARKET MIRACLE",
    title: "AI infrastructure boom",
    body: "Your boring data-centre bet became everyone’s obsession. Collect 180.",
    amount: 180,
  },
  {
    id: "p02",
    deck: "pulse",
    tone: "boost",
    kicker: "RIGHT PLACE, RIGHT TIME",
    title: "The chip shortage chose you",
    body: "A warehouse you forgot about is suddenly strategic. Collect 140.",
    amount: 140,
  },
  {
    id: "p03",
    deck: "pulse",
    tone: "boost",
    kicker: "MAIN CHARACTER ENERGY",
    title: "Your life gets a docuseries",
    body: "The reviews call it “financially irresponsible, emotionally essential.” Collect 160.",
    amount: 160,
  },
  {
    id: "p04",
    deck: "pulse",
    tone: "boost",
    kicker: "CAMERA FOUND YOU",
    title: "Stadium reaction goes viral",
    body: "The internet crowdfunds your next questionable purchase. Collect 35 from every rival.",
    eachAmount: 35,
  },
  {
    id: "p05",
    deck: "pulse",
    tone: "boost",
    kicker: "SOFT LAUNCH, HARD PROFIT",
    title: "Your side hustle exits",
    body: "Nobody understood the product, including the buyer. Collect 120.",
    amount: 120,
  },
  {
    id: "p06",
    deck: "pulse",
    tone: "boost",
    kicker: "ALGORITHM BLESSING",
    title: "Creator economy payday",
    body: "For two rounds, Culture assets earn 35% more.",
    modifier: { type: "rent", multiplier: 1.35, rounds: 2, region: "Culture" },
  },
  {
    id: "p07",
    deck: "pulse",
    tone: "shock",
    kicker: "TERMS & CONDITIONS",
    title: "Fintech accounts frozen",
    body: "An autonomous agent “optimised” compliance. Miss your next turn.",
    freezeTurns: 1,
  },
  {
    id: "p08",
    deck: "pulse",
    tone: "shock",
    kicker: "THE RECEIPTS DROPPED",
    title: "Money-laundering-shaped scandal",
    body: "It was technically a spreadsheet error. The fine is still 150.",
    amount: -150,
  },
  {
    id: "p09",
    deck: "pulse",
    tone: "shock",
    kicker: "LAWYER UP",
    title: "Leaked video, expensive morning",
    body: "Pay 115 for crisis counsel and a very calm publicist.",
    amount: -115,
  },
  {
    id: "p10",
    deck: "pulse",
    tone: "shock",
    kicker: "ENERGY PANIC",
    title: "Compute demand hits the grid",
    body: "Utility fees run at 1.75× for three rounds.",
    modifier: { type: "utility", multiplier: 1.75, rounds: 3 },
  },
  {
    id: "p11",
    deck: "pulse",
    tone: "shock",
    kicker: "TRADE WAR",
    title: "The Doha tariff corridor",
    body: "Assets within five spaces of Doha charge 40% more for two rounds. The app does the maths.",
    modifier: {
      type: "rent",
      multiplier: 1.4,
      rounds: 2,
      anchor: 18,
      radius: 5,
    },
  },
  {
    id: "p12",
    deck: "pulse",
    tone: "shock",
    kicker: "VERY OFFICIAL LETTER",
    title: "The state disputes your time machine",
    body: "Pay 130 in expert witnesses who keep asking what year it is.",
    amount: -130,
  },
  {
    id: "p13",
    deck: "pulse",
    tone: "wild",
    kicker: "ABSURDLY LUCKY",
    title: "You actually won the lottery",
    body: "Collect 260. Huge advantage, not game-ending money.",
    amount: 260,
  },
  {
    id: "p14",
    deck: "pulse",
    tone: "wild",
    kicker: "SYSTEMIC EVENT",
    title: "A strange new pandemic",
    body: "Income from every asset cools to 70% for two rounds.",
    modifier: { type: "income", multiplier: 0.7, rounds: 2 },
  },
  {
    id: "p15",
    deck: "pulse",
    tone: "wild",
    kicker: "BUBBLE BEHAVIOUR",
    title: "Everything is “the next big thing”",
    body: "All rents jump 60% for one round. Timing is now a personality test.",
    modifier: { type: "rent", multiplier: 1.6, rounds: 1 },
  },
];

export const COMMUNITY_CARDS: EventCard[] = [
  {
    id: "c01",
    deck: "community",
    tone: "boost",
    kicker: "CROWD FAVOURITE",
    title: "Your GoFundMe clears the goal",
    body: "Every rival contributes 30. They will mention this forever.",
    eachAmount: 30,
  },
  {
    id: "c02",
    deck: "community",
    tone: "boost",
    kicker: "INVITATION ONLY",
    title: "A fashion gala wants you there",
    body: "A designer sponsors the look. Collect 90 and pretend this is normal.",
    amount: 90,
  },
  {
    id: "c03",
    deck: "community",
    tone: "boost",
    kicker: "FRIENDS IN HIGH PLACES",
    title: "Your group chat angel-invests",
    body: "Collect 110 from the bank.",
    amount: 110,
  },
  {
    id: "c04",
    deck: "community",
    tone: "boost",
    kicker: "PLOT TWIST",
    title: "The apology tour works",
    body: "Brand deals return. Collect 100.",
    amount: 100,
  },
  {
    id: "c05",
    deck: "community",
    tone: "boost",
    kicker: "COMMUNITY DIVIDEND",
    title: "Your neighbourhood wins a grant",
    body: "Collect 75 and move to The Launch.",
    amount: 75,
    moveTo: 0,
  },
  {
    id: "c06",
    deck: "community",
    tone: "boost",
    kicker: "FOUND MONEY",
    title: "The airline finally finds your luggage",
    body: "They also compensate you. Collect 80.",
    amount: 80,
  },
  {
    id: "c07",
    deck: "community",
    tone: "shock",
    kicker: "BESTIE EMERGENCY",
    title: "Your best friend needs bail",
    body: "Pay 95. They promise this is the final plot twist.",
    amount: -95,
  },
  {
    id: "c08",
    deck: "community",
    tone: "shock",
    kicker: "NEW PHONE WHO DIS",
    title: "Celebrity security upgrade",
    body: "A bomb threat makes privacy expensive. Pay 120 for surveillance.",
    amount: -120,
  },
  {
    id: "c09",
    deck: "community",
    tone: "shock",
    kicker: "GROUP PROJECT",
    title: "Everyone forgot the fundraiser",
    body: "You cover 25 for every rival.",
    eachAmount: -25,
  },
  {
    id: "c10",
    deck: "community",
    tone: "shock",
    kicker: "PUBLIC APOLOGY",
    title: "Your old posts achieve archaeology",
    body: "Pay 85 for reputation repairs.",
    amount: -85,
  },
  {
    id: "c11",
    deck: "community",
    tone: "shock",
    kicker: "FRIENDSHIP TAX",
    title: "Destination wedding season",
    body: "Pay 70 and insist the memories were priceless.",
    amount: -70,
  },
  {
    id: "c12",
    deck: "community",
    tone: "shock",
    kicker: "NO COMMENT",
    title: "A microphone catches everything",
    body: "Miss one turn while your team writes a statement.",
    freezeTurns: 1,
  },
  {
    id: "c13",
    deck: "community",
    tone: "wild",
    kicker: "CHAOTIC GENEROSITY",
    title: "Anonymous benefactor",
    body: "Collect 180, then give 40 to every rival.",
    amount: 180,
    eachAmount: -40,
  },
  {
    id: "c14",
    deck: "community",
    tone: "wild",
    kicker: "FAMILY OFFICE HOURS",
    title: "A cousin has a “sure thing”",
    body: "Pay 140 now. Your dignity remains diversified.",
    amount: -140,
  },
  {
    id: "c15",
    deck: "community",
    tone: "wild",
    kicker: "TELEPORTATION, BASICALLY",
    title: "A private jet has one empty seat",
    body: "Move to the Final Bell Gate.",
    moveTo: 31,
  },
];

export const PLAYER_STYLES = [
  { name: "Velvet Rocket", color: "#ff5f8f", avatar: "VR" },
  { name: "Neon Ledger", color: "#50d8d0", avatar: "NL" },
  { name: "Gold Standard", color: "#ffc857", avatar: "GS" },
  { name: "Blue Orbit", color: "#6f8cff", avatar: "BO" },
];

export const BASELINE_COMPARISON = [
  {
    role: "Buyable locations",
    classic: "22 streets",
    ours: "18 iconic assets",
    why: "Fewer, more memorable; faster ownership tension.",
  },
  {
    role: "Networks",
    classic: "4 railroads",
    ours: "3 mobility links",
    why: "Useful sets without four repetitive stops.",
  },
  {
    role: "Utilities",
    classic: "2 utilities",
    ours: "2 infrastructure platforms",
    why: "Global events can automatically change their yield.",
  },
  {
    role: "Random cards",
    classic: "3 + 3 card spaces",
    ours: "3 Pulse + 2 Group Chat",
    why: "Two balanced decks, shuffled without replacement.",
  },
  {
    role: "Taxes",
    classic: "2 tax spaces",
    ours: "1 direct levy",
    why: "Most costs now arrive through visible economic shocks.",
  },
  {
    role: "Corners / systems",
    classic: "4 fixed corners",
    ours: "3 turning points",
    why: "Launch, Audit, and Final Bell each change tempo.",
  },
  {
    role: "Total",
    classic: "40 spaces",
    ours: "32 spaces",
    why: "Roughly 20% shorter laps for a sub-60-minute session.",
  },
];

export function shuffled<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function spaceIsWithinRadius(
  spaceId: number,
  anchor: number,
  radius: number,
): boolean {
  const direct = Math.abs(spaceId - anchor);
  const wrapped = BOARD.length - direct;
  return Math.min(direct, wrapped) <= radius;
}
