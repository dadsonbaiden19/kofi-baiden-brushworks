# Design System

## Principles

- Calm, gallery-inspired surfaces
- Tinted neutrals instead of pure white/black
- Soft borders and shadows
- Motion is subtle, never flashy

## Color

Colors are driven by CSS variables in `app/globals.css` and used via Tailwind tokens:

- `bone`, `chalk`, `ink`, `umber`, `clay`, `gallery`, `graphite`

## Typography

- Body: Inter (`--font-inter`)
- Headings/titles: Bebas Neue (`--font-bebas`) via `font-heading`

Guidelines:

- Headings: tall/condensed, controlled letter spacing, tight line height
- Use split-span hero treatment sparingly (home hero only)

## Radius

- Soft surfaces: 18px
- Artwork containers: 22px

## Motion

- Global easing: `cubic-bezier(0.16, 1, 0.3, 1)`
- Duration: 400ms
- Respect reduced motion
