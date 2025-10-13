# 🚀 CAPITAL WARS 2050

**The Modern Economic Strategy Game for the Digital Age**

> Build your corporate empire in a world of AI, space exploration, and dynamic markets. Learn real finance while dominating the global economy.

[![License: Proprietary](https://img.shields.io/badge/License-Proprietary-red.svg)](LICENSE.md)
[![Version](https://img.shields.io/badge/version-0.1.0--alpha-blue.svg)](package.json)
[![Status](https://img.shields.io/badge/status-prototype-yellow.svg)]()

---

## 📋 TABLE OF CONTENTS

- [About](#about)
- [Quick Start](#quick-start)
- [Features](#features)
- [Screenshots](#screenshots)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Development](#development)
- [Roadmap](#roadmap)
- [Business Model](#business-model)
- [Contributing](#contributing)
- [License & IP](#license--ip)
- [Contact](#contact)

---

## 🎯 ABOUT

**Capital Wars 2050** is a next-generation economic strategy game that combines classic property trading mechanics with modern financial systems including:

- 🏢 **Global Corporate Districts** - From Silicon Valley to Mars Colony
- 📈 **Real-Time Stock Market** - 4 volatile sectors with dynamic pricing
- 🌍 **Economic Events** - AI booms, market crashes, space races
- 💰 **Inflation Simulation** - Learn how purchasing power changes over time
- 🎓 **Educational Focus** - Built for business schools and finance enthusiasts
- 🤝 **Multiplayer Ready** - Compete with friends in real-time

**Target Audience:**
- Finance students & educators
- Strategy game enthusiasts
- Corporate training programs
- Economics classrooms

**Legally Distinct:** This is an original work inspired by classic property trading games, not affiliated with any existing IP.

---

## ⚡ QUICK START

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Run the Prototype (5 seconds)

```bash
# Clone or download the repository
cd capital-wars-2050

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:3000
```

**That's it!** You're now playing Capital Wars 2050.

---

## ✨ FEATURES

### Current Version (v0.1.0 - Alpha)

✅ **Core Gameplay**
- 2-4 player local multiplayer
- 40 unique global districts (tech hubs, space stations, emerging markets)
- Dynamic dice rolling and movement system
- Property acquisition and rent collection
- Inflation-adjusted pricing over time

✅ **Stock Market System**
- 4 tradeable stocks: TECH, ENERGY, CRYPTO, SPACE
- Real-time price fluctuations based on dice rolls
- Volatility simulation (high-risk crypto vs stable energy)
- Portfolio tracking for each player

✅ **Economic Events**
- 8 global events (AI Boom, Market Crash, Space Race, etc.)
- Events trigger every 5 turns
- Dynamic impact on markets and properties
- Visual notifications with effects

✅ **Modern UI/UX**
- Glassmorphic design with gradients
- Responsive layout (desktop, tablet, mobile)
- Animated components
- Real-time activity log
- Player stats dashboard

### Coming Soon (v0.2.0 - Beta)

🔄 **Multiplayer Online**
- Real-time WebSocket gameplay
- Private room codes
- Spectator mode
- Global leaderboards

🔄 **Advanced Features**
- AI opponent (3 difficulty levels)
- Contract system (loans, revenue sharing)
- Court/lawsuit mechanics
- Building upgrades (offices, data centers)
- Save/resume games

🔄 **Educational Mode**
- Tutorial with finance lessons
- Scenario-based challenges
- Analytics dashboard for teachers
- Customizable rule sets

---

## 📸 SCREENSHOTS

*(Add screenshots here once you have them)*

```
[Game Start Screen] | [Main Board] | [Stock Market Panel]
```

---

## 🛠️ TECHNOLOGY STACK

### Current (Prototype)
- **Framework:** React 18 + Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **State:** React Hooks (useState)

### Planned (Production)
- **Backend:** NestJS + Node.js
- **Database:** PostgreSQL + Prisma ORM
- **Real-time:** Socket.io / Supabase
- **Auth:** NextAuth.js
- **Payments:** Stripe
- **Hosting:** Vercel (frontend) + Railway (backend)
- **Analytics:** PostHog
- **Monitoring:** Sentry

---

## 💻 INSTALLATION

### Option 1: Quick Start (Single File)

1. **Download the game file**
2. **Create a Next.js app:**

```bash
npx create-next-app@latest capital-wars --typescript --tailwind --app
cd capital-wars
npm install lucide-react
```

3. **Replace `app/page.tsx` with the game code**
4. **Run:** `npm run dev`

### Option 2: Full Repository Setup

```bash
# Clone repository
git clone https://github.com/yourusername/capital-wars-2050.git
cd capital-wars-2050

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Environment Variables

Create `.env.local`:

```env
# Optional for analytics
NEXT_PUBLIC_POSTHOG_KEY=your_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 🔧 DEVELOPMENT

### Project Structure

```
capital-wars-2050/
├── app/
│   ├── page.tsx              # Main game component
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── game/
│   │   ├── Board.tsx         # Game board component
│   │   ├── PlayerPanel.tsx   # Player stats
│   │   └── StockMarket.tsx   # Market component
│   └── ui/                   # Reusable UI components
├── lib/
│   ├── game-engine.ts        # Core game logic
│   ├── constants.ts          # Game constants
│   └── utils.ts              # Helper functions
├── public/                   # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── README.md
```

### Key Commands

```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript validation
```

### Code Style

- **TypeScript strict mode** enabled
- **ESLint** for linting
- **Prettier** for formatting (coming soon)
- **Conventional Commits** for git messages

---

## 🗺️ ROADMAP

### Phase 1: Prototype (Current) ✅
- [x] Core gameplay mechanics
- [x] Basic UI/UX
- [x] Stock market system
- [x] Economic events
- [x] 2-4 player support

### Phase 2: Beta (Months 1-3) 🔄
- [ ] Online multiplayer
- [ ] User authentication
- [ ] AI opponent
- [ ] Save/load system
- [ ] Tutorial mode
- [ ] Mobile optimization

### Phase 3: Educational (Months 4-6) 📚
- [ ] Teacher dashboard
- [ ] Custom scenarios
- [ ] Analytics & reporting
- [ ] LMS integration
- [ ] Educational content library
- [ ] Classroom mode

### Phase 4: Full Launch (Months 6-12) 🚀
- [ ] Tournament system
- [ ] Ranked matches
- [ ] Custom boards (user-created)
- [ ] Achievements & badges
- [ ] Spectator mode
- [ ] Mobile apps (iOS/Android)
- [ ] API for third-party integrations

### Phase 5: Expansion (Year 2+) 🌟
- [ ] DLC: Space Expansion Pack
- [ ] DLC: Cryptocurrency Wars
- [ ] Corporate training modules
- [ ] VR/AR version
- [ ] Esports integration

---

## 💰 BUSINESS MODEL

### Revenue Streams

#### 1. Educational SaaS (Primary)
**B2B Licensing for Schools & Universities**

| Tier | Price | Students | Features |
|------|-------|----------|----------|
| Starter | $2,000/year | 50 | Basic mode, teacher dashboard |
| Professional | $5,000/year | 200 | All modes, analytics, LMS integration |
| Enterprise | $15,000/year | Unlimited | White-label, API, custom development |

**Target:** 100 schools by Year 2 = $300K-500K ARR

#### 2. Consumer Freemium
**B2C SaaS for Individual Players**

- **Free:** Classic mode, 3 games/day, ads
- **Premium:** $9.99/month - Unlimited play, all modes, no ads, tournaments
- **Lifetime:** $79.99 - One-time purchase

**Target:** 5,000 premium users by Year 2 = $500K ARR

#### 3. Corporate Training
**Custom versions for companies**

- Financial literacy training modules
- Team-building exercises
- Leadership simulations
- **Price:** $10,000-50,000 per deployment

#### 4. Partnerships & Licensing
- Educational platform integrations (Coursera, Udemy)
- Fintech company partnerships
- Content licensing
- White-label opportunities

### Monetization Ethics

✅ **No pay-to-win mechanics**  
✅ **No loot boxes or gambling**  
✅ **No aggressive dark patterns**  
✅ **Transparent pricing**  
✅ **Educational value first**

---

## 🤝 CONTRIBUTING

**⚠️ IMPORTANT: This is proprietary software in active development.**

### Current Status
We are **NOT accepting public contributions** during the alpha/beta phases to protect IP and maintain quality control.

### Future Plans
- Open source **game engine library** (MIT License)
- Community-created **custom boards** (revenue share)
- **Plugin marketplace** for extensions
- **Content creator program** with compensation

### Interested in Contributing?
Email: dev@capitalwars.com with:
- Your background
- What you'd like to contribute
- Portfolio/GitHub profile

---

## 📜 LICENSE & INTELLECTUAL PROPERTY

### Copyright

```
Copyright © 2025 [Your Name/Company Name]. All Rights Reserved.

Capital Wars 2050™ and all associated trademarks, logos, and game 
assets are the exclusive property of [Your Company Name].
```

### Proprietary Software License

**This software is proprietary and confidential.**

#### ✅ YOU MAY:
- Play the game for personal use
- Use in educational settings (with purchased license)
- Provide feedback and bug reports
- Share screenshots and gameplay videos

#### ❌ YOU MAY NOT:
- Copy, modify, or distribute the source code
- Create derivative works or clones
- Use for commercial purposes without license
- Reverse engineer the game mechanics
- Remove copyright notices
- Sublicense or resell

### Open Source Components
This project uses the following open source libraries:
- React (MIT)
- Next.js (MIT)
- Tailwind CSS (MIT)
- Lucide React (ISC)

See `package.json` for full list.

### Commercial Licensing
For commercial use, white-label, or custom development:
- Email: licensing@capitalwars.com
- Include: Company name, use case, expected users

### Revenue Protection Clause

**If this game achieves commercial success:**

1. **Creator Rights:** Original creator(s) retain 100% ownership
2. **Contributor Compensation:** Contributors who sign agreements receive:
   - Equity or profit-sharing based on contribution
   - Documented in separate contributor agreements
3. **Acquisition Protection:** In case of sale/acquisition:
   - Founder(s) control all negotiation terms
   - Contributors receive their agreed percentage
   - No third party can claim ownership without written agreement

**All contributors must sign a Contributor License Agreement (CLA) before their code is accepted.**

---

## 📞 CONTACT

### Creator
- **Name:** [Your Name]
- **Email:** contact@capitalwars.com
- **Twitter/X:** @capitalwars2050
- **LinkedIn:** [Your LinkedIn]

### Business Inquiries
- **Schools/Universities:** education@capitalwars.com
- **Corporate Training:** enterprise@capitalwars.com
- **Press/Media:** press@capitalwars.com
- **Partnerships:** partners@capitalwars.com

### Community
- **Discord:** [Coming Soon]
- **Reddit:** r/CapitalWars2050 [Coming Soon]
- **Newsletter:** [Signup Link]

---

## 🙏 ACKNOWLEDGMENTS

- Inspired by classic property trading board games
- Built with modern web technologies
- Designed for the next generation of strategy gamers
- Created to teach real finance through engaging gameplay

---

## 📊 PROJECT STATUS

| Metric | Status |
|--------|--------|
| Version | 0.1.0-alpha |
| Development Stage | Prototype |
| Last Updated | January 2025 |
| Lines of Code | ~1,200 |
| Test Coverage | 0% (coming soon) |
| Documentation | 85% |

---

## ⭐ STAR THIS REPO (When Public)

If you find this project interesting, please star it! It helps us know there's interest in making this a full product.

---

**Built with ❤️ for finance learners, strategy enthusiasts, and future moguls.**

*"Master the market. Dominate the future."*

---

## 🔐 SECURITY

Found a security vulnerability? **DO NOT** open a public issue.

Email: security@capitalwars.com with:
- Description of the vulnerability
- Steps to reproduce
- Your contact information

We'll respond within 48 hours and credit you if desired.

---

**Last Updated:** January 11, 2025  
**License:** Proprietary - All Rights Reserved  
**Status:** Active Development