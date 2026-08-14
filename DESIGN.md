# Design System: Aleph Hackathon Salta

Tokens extraídos de [alephhackathon.crecimiento.build](https://alephhackathon.crecimiento.build/) (`tokens.css` + `style.css`, Crecimiento & Aleph by 22 Studio). Esta web es una guía de chapter, no un clone de la landing de sponsors.

## 1. Visual Theme & Atmosphere

Navy drench (`#2E3852`) with acid green (`#56F163`) and near-white ink (`#fafafa`). Hairline borders, almost-square corners (2px), massive Geist display. Utility page: less photography, more scan-able structure. Same buttons and type as the official site.

Physical scene: Saturday morning at Vapadu HQ, people on phones, window glare, looking up agenda and links.

## 2. Color Palette & Roles

| Token | Hex | Role |
|---|---|---|
| Navy / page | `#2E3852` | Body background (official `--color-primary` / `--color-F2F3E1`) |
| Ink | `#fafafa` | Body text, icons |
| Green | `#56F163` | Primary actions, time stamps, focus, emphasis |
| Green mid | `#2b8f38` | Green text on navy when `#56F163` is too loud |
| Green dim | `#195422` | Callout fills |
| Dark | `#161616` | Text on green buttons / hover fills |
| Charcoal | `#252525` | Unused except if a darker band is needed |
| Grey 400 | `#6e6e6e` | Borders, ghost button stroke |
| Grey 300 | `#a5a5a5` | Secondary labels (only if contrast holds) |
| Black | `#000000` | Rare; countdown-style bands if needed |

Do not invent a parallel palette. Do not use cream/sand/purple gradients.

## 3. Typography

- Family: **Geist** (official `--font-primary`). Self-hosted variable font.
- Display: weight 800, `letter-spacing: -0.04em`, `line-height: 0.88–1.1`, `text-wrap: balance`.
- Body: weight 400, `line-height: 1.6–1.7`, max ~70ch.
- Buttons / kickers: weight 600, uppercase, `letter-spacing: 0.1em`, ~0.75rem.
- Helvetica Neue is the official secondary face. We do not ship it (licensed). Geist covers both roles.

## 4. Components

- **Buttons:** 2px radius, 13px 28px padding, 1px grey-400 border, uppercase. Primary = white fill / navy text. Green = green fill / navy text. Ghost = transparent / white text. Hover: green (or white) wipe from the left.
- **Callouts:** full box, 1px border, optional green-dim fill. Never a thick left stripe.
- **Timeline:** stacked rows, time in green, no cards-in-cards.
- **FAQ:** native `<details>`, hairline dividers, + / − affordance.
- **Nav:** 56px, fixed, navy, 1px bottom border. Logo is the Aleph sun.

## 5. Layout

- Mobile-first. Content padding 20px / 48px.
- Section separators: 1px `grey-400`.
- Section padding ~64–80px.
- Sticky nav; jump links. No card grids as the default layout.
- Motion: 200–350ms ease, wipe on buttons, underline on nav. Honor `prefers-reduced-motion`.
