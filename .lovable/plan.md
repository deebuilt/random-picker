

## Random Picker — Implementation Plan

### Page Structure
Single-page app with three stacked sections (mobile-first, 375px baseline):

1. **Input Area** (top, collapsible) — textarea for items, entry count badge, Clear List button, Try Demo button
2. **Controls** (middle) — large "Pick Random" button, No Repeats toggle, Reset Picks button
3. **Result Display** (center stage) — spotlight card with animated result, last 5 picks history below

### Preset System
- Save/Load presets via a dropdown + save dialog (localStorage, max 10)
- Small UI tucked near the input area

### Animation
- On pick: rapid cycling through items (~800ms) with decreasing speed, landing on final result
- Result card gets a subtle glow/scale-in effect

### Design
- Dark theme (custom CSS variables) — near-black background, accent color for the result spotlight
- Result card: large bold text, subtle box-shadow glow, centered
- Input area visually secondary (muted, smaller)
- All tap targets ≥ 44px, mobile-first spacing

### Routing
- `HashRouter` per the GitHub Pages requirement

### PWA
- Add `vite-plugin-pwa` with service worker disabled in dev mode
- Guard against iframe/preview registration
- Manifest with theme color, standalone display, icons
- Offline support only works in production/published builds (not in editor preview)

### Data
- All state persisted to localStorage (items, presets, history, no-repeats state)
- No prefilled data; "Try Demo" button loads sample names

### Key Files
- `src/pages/Index.tsx` — main page layout
- `src/components/ItemInput.tsx` — textarea + count + clear/demo
- `src/components/PickerControls.tsx` — pick button, toggle, reset
- `src/components/ResultCard.tsx` — animated spotlight result
- `src/components/PickHistory.tsx` — last 5 picks
- `src/components/PresetManager.tsx` — save/load presets
- `src/hooks/usePicker.ts` — core picker logic, no-repeats, localStorage sync
- `src/hooks/usePresets.ts` — preset CRUD with localStorage

