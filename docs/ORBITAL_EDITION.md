# Orbital edition — 30 October 2026

The active game uses `lib/orbit-engine.ts`, `lib/game-data.ts`, `components/game/OrbitBoard.tsx`, `components/game/LocationScene.tsx`, and `app/page.tsx`.

## Precedents and scope

- Hasbro's classic rules: https://www.hasbro.com/common/instruct/monins.pdf
- Hasbro's building, auctions and jail reference: https://www.hasbro.com/common/documents/dad288661c4311ddbd0b0800200c9a66/B341FDEC5056900B1096BAB11C79CE18.pdf
- Ubisoft's animated location-driven world: https://www.ubisoft.com/en-us/games/new-monopoly

This is an original 32-destination adaptation, not a licensed or exact 40-space Monopoly implementation. It preserves six Capital Wars colour groups, three transit links, two utilities and two satirical event decks.

## Implemented mechanics

2–4 local players, custom names, 1,500 opening cash, 200 Launch salary, mandatory purchase-or-auction resolution, cash-backed ascending auction bids, automatic rent, complete-set base rent doubling, even development through four houses and a hotel, bank building inventory, half-price building sales, mortgage/redemption interest, cash-and-deed trade proposals requiring acceptance, consecutive doubles, audit detention and release, shuffled cyclic decks, movement-card landing resolution, temporary market effects, explicit debt recovery, creditor/bank bankruptcy resolution and last-solvent-player victory.

Classic has no round/time limit. Sprint uses 60 minutes of active play and net-worth scoring. Decisions and pause stop the timer. Versioned local storage retains sessions, decks, auctions and unsettled obligations. Closing a browser does not run down the Sprint clock.

## Intentional differences

- 32 original locations instead of 40 classic spaces; six property sets instead of eight.
- Three transit links instead of four railways.
- Building shortages wait for supply rather than starting building auctions.
- Voluntary trades accept only unimproved, unmortgaged deeds. Mortgage transfers on bankruptcy are automatic and charge immediate interest.
- Satirical event cards replace Chance/Community Chest; no transferable get-out-of-jail cards.
- Local pass-and-play only. No online accounts, remote rooms, bots or cloud save.
- The same device's save slot is replaced by starting another session.

## Visual system

Actual radial SVG sectors, concentric accelerator rails, travelling tokens, orbiting beam accents, ownership bars and development indicators. Location-specific architectural vector backgrounds are original artwork generated in code; no external stock media or licensing dependencies. Motion includes subtle traffic, water, stars and scanning light. A motion toggle and reduced-motion media query disable animation.

## Validation

30 rules and simulation tests pass, with strict TypeScript checking. Vercel also completed production compilation; the deployment uses the standard Next.js output directory.

`npm run test:ci` exercises transactions, building constraints, finite stock, auctions, rent, mortgages, debt/bankruptcy, doubles, audit, movement cards, trade acceptance, persistence and Sprint completion. `npm run type-check` checks the strict TypeScript application. `npm run build` provides production compilation and framework validation.


Older standalone components and documentation predate this edition. They are not the active game engine.
