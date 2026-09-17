# Portfolio Website — Design Brief

**For:** Mujahid (Emjay) — Flutter/mobile developer
**Vibe:** Terminal / hacker-minimal. Dark, quiet, confident. Not "AI-generated dark mode."

---

## 1. Concept in one line

A developer's terminal, not a sci-fi movie prop. Think **command line, not Matrix rain**. The feeling should be "this person is precise and knows exactly what they're doing," not "this person watched Mr. Robot once."

Avoid: neon glow everywhere, falling green code, glitch effects on every element, generic gradient blobs, glassmorphism cards, stock "AI" iconography.
Aim for: restraint, sharp contrast, generous negative space, a couple of intentional details instead of many decorative ones.

---

## 2. Color palette

Primary base:
- **Background:** near-black, not pure `#000000` — something like `#0A0A0B` or `#0D0E11` (pure black feels harsh/cheap on screens)
- **Surface/cards:** one step up, `#151619` or `#1A1B1F`
- **Primary text:** off-white `#E8E8E6` (pure white `#FFFFFF` is too stark against near-black)
- **Secondary/muted text:** mid-gray `#8A8D93`
- **Borders/dividers:** subtle, `#2A2B30` — barely visible, used to separate not decorate

One accent color only, used sparingly (links, cursor blink, hover states, a small terminal prompt symbol):
- A muted terminal green (`#4ADE80`-ish but desaturated) or amber (`#D4A72C`) reads as "hacker terminal" without being a cliché neon green. Amber is the less-used, more distinctive choice.
- Use the accent in maybe 5% of the UI. If it's everywhere, it stops meaning anything.

No gradients. Flat color, sharp edges.

---

## 3. Typography

This is where the "hacker" feeling should actually live — not in decoration.

- **Headings / accents:** a monospace font. Good options: `JetBrains Mono`, `IBM Plex Mono`, `Berkeley Mono`, `Space Mono`. JetBrains Mono is the safest and most legible; Berkeley Mono is more distinctive if licensing isn't an issue.
- **Body text:** does NOT need to be monospace — a monospace-only site gets hard to read fast. Pair the mono heading font with a clean, humanist sans for paragraphs: `Inter`, `Neue Montreal`, or similar.
- Terminal-style touches: a blinking text cursor `_` after the name/title in the hero, command-prompt symbols (`$`, `>`, `~/`) used as small section labels instead of generic headers (e.g. `~/projects` instead of "Projects").

---

## 4. Layout & structure

Keep it a single, confident scroll — not a dashboard, not overloaded with widgets.

1. **Hero** — name, one-line role ("Flutter developer"), terminal-prompt-style intro (`$ whoami` → short bio), blinking cursor. Minimal.
2. **About** — short, in your own voice. Software Engineering grad, Bayero University Kano, Flutter dev, based in Kaduna, currently on FindHomes.
3. **Projects** — 2-4 real ones, not a grid of six half-finished side projects. Lead with FindHomes (Flutter + FastAPI + PostgreSQL real estate app), then the real-time chat app (Flutter + Node.js/Socket.IO + Prisma). Each project: what it does, the stack, one interesting technical decision (e.g. the Cloudinary signed-upload architecture), link/screenshots.
4. **Skills/stack** — plain text list or a simple monospace table, not icon soup. Flutter/Dart, FastAPI, Node/TypeScript, PostgreSQL, Prisma, Firebase.
5. **Contact** — email, GitHub, LinkedIn. A `$ contact --email` style line works, but don't overdo the gimmick here — this section should be the easiest to scan.

---

## 5. Motion & interaction (use sparingly)

- Cursor blink on the hero text: yes, this one's worth it.
- Text that "types out" on load: fine once, in the hero only — not on every section.
- Hover states: subtle border/color shift, not scale/glow/shadow explosions.
- No parallax, no scroll-jacking, no particle backgrounds.

The goal: it should feel handcrafted and specific, like a real terminal someone actually uses — not a template with a dark theme swapped on.

---

## 6. References to point Ghostich at

- Terminal/CLI-inspired portfolios (search "developer portfolio terminal theme" for current examples)
- Actual terminal emulators (iTerm2, Warp, Alacritty) for authentic color/spacing cues — the real thing looks better than most "hacker aesthetic" UI kits
- Swiss/editorial minimalist sites for the restraint and grid discipline, even though the palette is different

---

## 7. What to explicitly tell the designer NOT to do

- No neon green Matrix rain
- No glitch/VHS filters on every element
- No glassmorphism or gradient-mesh backgrounds
- No stock "circuit board" or "binary code" background textures
- No more than one accent color
