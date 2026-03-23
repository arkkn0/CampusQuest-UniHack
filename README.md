# 🗺️ CampusQuest

A gamified campus exploration app where users complete quests by visiting real university locations and scanning QR codes. Each completed quest rewards XP and unlocks a piece of a campus puzzle, turning campus discovery into an interactive game.

Built for a 48-hour hackathon demo.

## Live Demo

👉 [https://2026-unihack.vercel.app](https://2026-unihack.vercel.app)

## Quick Start

```bash
npm install
npm run dev
```

Requires Node.js 18+.

## Demo Instructions

1. Open app → see Home page with XP, level, quest list
2. Tap a quest card → Quest Detail page
3. Tap **"Scan to Unlock"** → QR scanner opens
4. For demo: tap **"Enter code manually"** → click a code chip or type one
5. Watch the animated Reward Popup appear!
6. Puzzle pieces fill in on the home screen

## QR Code Values

| Location         | QR Value          |
| ---------------- | ----------------- |
| Baillieu Library | `quest_baillieu`  |
| Arts West        | `quest_artswest`  |
| Old Quadrangle   | `quest_oldquad`   |
| Student Pavilion | `quest_pavilion`  |
| South Lawn       | `quest_southlawn` |
| MSD Building     | `quest_msd`       |

Generate printable QR codes at https://qrcode-monkey.com

## Tech Stack

- React 19 + Vite
- html5-qrcode
- localStorage
- Custom CSS animations
