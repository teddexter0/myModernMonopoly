# Capital Wars — The Orbital Economy

An original property strategy game set around a circular particle accelerator. Buy skylines, assemble colour sets, develop houses and hotels, negotiate trades and survive economic shocks.

**Play:** https://modern-monopoly.vercel.app

## Play locally

```powershell
npm install
npm run dev
```

Open http://localhost:3000. Requires Node.js 18.17+ (production uses Node.js 22).

## The orbital edition

- 32 clickable radial sectors, animated accelerator beams, travelling player tokens, ownership and building indicators.
- Original animated architectural SVG scenery responds to the active destination. No external media requests or stock-media licences.
- 2–4 local players with custom names. Classic plays to the last solvent player; Sprint scores surviving net worth after 60 active minutes.
- Automatic rent, required purchase-or-auction decisions, open ascending auctions, complete colour sets, even building, four houses and hotels, finite building stock.
- Mortgage and redeem deeds, sell buildings individually or liquidate an entire colour set, propose cash-and-property trades for the other player to accept or reject.
- Doubles, three-doubles detention, audit fines/release, cyclic event decks, temporary economic effects and full destination resolution after movement cards.
- Explicit debts, asset recovery, bankruptcy, creditor transfers, bank-estate auctions and victory detection.
- Versioned device-local saves retain unfinished turns, auctions, decks and debts. A paused/closed session does not consume Sprint time.
- Keyboard-accessible sectors and dialogs, focus management, responsive layouts, a motion toggle and reduced-motion support.

This is an original 32-space adaptation, **not an official or exact Monopoly edition**. Online rooms, AI opponents, building-shortage auctions, mortgaged voluntary trades and transferable jail-free cards are not implemented. See [edition notes and precedents](docs/ORBITAL_EDITION.md).

## Validate

```powershell
npm run test:ci
npm run type-check
npm run build
```

The pure transaction engine is `lib/orbit-engine.ts`. Board locations and economic decks are in `lib/game-data.ts`; the active UI is `app/page.tsx`. Older standalone components/docs are retained as development history and are not the active rules engine.

The browser-local game needs no accounts, credentials or database. Its save belongs to the browser/device used to play; starting a new session replaces that save.

Copyright Ted Dexter. Proprietary; see [LICENSE.md](LICENSE.md).
