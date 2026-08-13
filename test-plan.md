# Test Plan — Scrollytelling site (PR #1)

App: http://localhost:5173 (Vite dev server running). Record browser run, maximized window.

## T1: It should load with correct fonts/design and no console errors
- Open page; assert hero shows "How X decides / what you see." on dark background with bordered grid; nav "✦ THE ALGORITHM" + 5 links.
- Check browser console: no errors.
- Verify fonts loaded via document.fonts.check for Archivo, IBM Plex Mono, Inter (evidence in console, done once, briefly).

## T2: It should reveal each section on scroll
- Scroll gradually through the entire page. Assert each appears with animation: hero, fresh stats (3 cells: ~2,200 / 19+ / 1), Sources (Thunder/Phoenix cells), Signals list (7 rows), Prediction bars (6 bars grow to widths, e.g. "watch the video" 42.0%), Score Lab, Adjustments, Filters (strike-through rows), Visibility (Allow/Interstitial/Drop), Takeaways (6 cells), footer.
- Fail if a section is blank/invisible after scrolling past it.

## T3: Score Lab interactivity
- Precondition: default pills Like + Reply on, score shows "+5.5", solid black bar, caption "competes for a spot in your feed".
- Click "Report" pill: score becomes "−228.5", caption "buried — you will likely never see posts like this", bar becomes hatched (diagonal stripes) and near-full width.
- Click "Report" again: back to +5.5 solid.

## T4: Nav smooth-scroll + sticky
- From footer/deep scroll, nav bar still visible at top (sticky).
- Click "Scoring" nav link → page scrolls to Score Lab section (Step 4 heading visible under nav). Click "Sources" → Step 1 dark section visible. Verify URL hash updates.

## T5: Footer links
- Footer shows "Source code ↗" → https://github.com/dabit3/x-algorithm and "DeepWiki ↗" → https://deepwiki.com/xai-org/x-algorithm/ (verify hrefs; hover/zoom, no need to navigate away).

## T6: Responsive ~400px
- Resize viewport to ~400px wide (device toolbar or window resize). Assert stats/takeaways grids collapse to single column, Score Lab pills wrap, no horizontal scrollbar/overflow.
