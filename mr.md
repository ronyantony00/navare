# MR Description

## 1. Title & Reference

- **MR Title:** [FEATURE] Build Home feed rails + pinned filter chrome and add page-level Home implementation docs
- **Ticket / Issue:** N/A — internal implementation alignment task
- **Branch:** `feat/home`
- **Target Branch:** `main`

## 2. Change Type

Pick one (delete the rest):

- [ ] Bug Fix
- [x] New Feature
- [ ] Refactor (no behavior change)
- [ ] DocType / Schema Change
- [ ] Migration / Patch
- [ ] Hotfix (production)

## 3. Summary — What & Why

**What:**
Implemented the Home tab feed with pinned filter tabs, hero carousel, reusable horizontal section rails, and JSON-driven media card mapping. Added page-level documentation for Home and updated the docs workflow rule so every new full page/screen gets its own implementation markdown.

**Why:**
This aligns the app with the latest Figma Home behavior while improving reuse through shared components (`CardSwiper`, `HomeFeedSection`). Dedicated page docs make Home layout behavior (pinned vs scrollable regions, section mapping, data source) discoverable and reduce onboarding/debugging ambiguity for future page work.

## 4. Files Modified

| File Path | What Changed |
|---|---|
| `.cursor/rules/docs-workflow.mdc` | Added explicit page-level implementation doc convention and checklist updates for new screens/pages |
| `docs/implementation/design-system.md` | Added Home page guide references and linked Home layout docs from component catalog sections |
| `docs/implementation/home-page.md` | Added dedicated Home page behavior doc (header, pinned filter row, scrollable rails, data mapping, constraints) |
| `docs/infrastructure/app-architecture.md` | Added page-guide pointer for Home under architecture docs |
| `mock/media/media-cards.json` | Expanded mock feed dataset used by Home rails and filter tabs |
| `package.json` | Added/updated dependencies required by Home implementation changes |
| `package-lock.json` | Lockfile updates from dependency changes |
| `src/components/atoms/button/Button.tsx` | Added Home filter tab button variants (`filterActive`, `filterInactive`) and filter size support |
| `src/components/molecules/card-swiper/CardSwiper.tsx` | Added reusable horizontal swiper with snap, optional auto-scroll, and optional circular mode |
| `src/components/molecules/home-feed-section/HomeFeedSection.tsx` | Added reusable Home section shell with title and See all action |
| `src/components/molecules/index.ts` | Exported new molecules (`CardSwiper`, `HomeFeedSection`) |
| `src/components/molecules/media-card/MediaCard.tsx` | Added/adjusted `new-release` card variant and Home-related variant behavior |
| `src/constants/app.ts` | Added Home/feed/swiper constants (`HOME_HEADER`, `FILTER_TAB`, `HOME_FEED`, `CARD_SWIPER`) |
| `src/constants/design-tokens.ts` | Updated token surface used by Home/filter/feed styling |
| `src/constants/mock-media.ts` | Added typed Home section metadata and item selectors/filter helpers |
| `src/screens/HomeScreen.tsx` | Implemented pinned filter row + scrollable hero/sections composition and section-card mapping |
| `src/utils/map-mock-media-card.ts` | Added mapper from JSON mock records to `MediaCard` props |

## 5. DocType Changes

- **New DocTypes:** N/A — React Native Expo app, no Frappe DocTypes
- **Modified DocTypes:** N/A
- **Custom Fields added via fixtures:** N/A
- **Property Setters:** N/A

## 6. Database / Schema Impact

- **New tables / columns:** No
- **Patches required:** N/A
- **Data migration needed:** No (mock JSON only)
- **Reversible?** Yes — revert commit(s)

## 7. Hooks & Background Jobs

- **hooks.py changes:** N/A — no Python/Frappe hooks in this repo
- **Scheduled jobs added / modified:** N/A
- **Background job functions touched:** N/A

## 8. API Endpoints

- **Whitelisted methods added:** N/A — no backend endpoint changes
- **Whitelisted methods modified:** N/A
- **Breaking API changes:** No

## 9. Permission & Role Changes

- **Role permissions modified:** N/A
- **User permission rules affected:** No
- **Any use of `ignore_permissions`:** N/A

## 10. Test Cases — Positive Scenarios

1. Home tab renders with `NavigationHeader` home variant (wordmark + notification icon) while keeping onboarding header behavior unchanged.
2. Filter row (`All`, `Movie`, `Series`) remains pinned below header and updates feed results by media type.
3. Hero rail displays main cards with center snap, circular loop behavior, and auto-scroll resume after drag.
4. Section rails (`In Theaters Now`, `New Releases`, `Coming Soon`, `Halloween Picks`, `Top Tendencias`) render from shared `HomeFeedSection` + `CardSwiper`.
5. `Top Tendencias` list-card ranking UI renders with expected left-side rank spacing.
6. TypeScript validation passes (`npx tsc --noEmit`) after implementing Home and docs updates.
7. Home implementation doc exists and is linked from docs catalog/rules.

## 11. Edge Cases Tested

1. Empty section result for selected filter tab does not render that section block.
2. Hero rail pause/resume behavior after manual swipe does not permanently disable auto-scroll.
3. Header-offset spacing uses `useHeaderHeight()` and avoids overlap from static inset math.
4. Bottom tab area does not show extra black gap after removing duplicate bottom safe-area handling in Home screen.
5. Section “See all” alignment remains right-aligned regardless of title width.

## 12. Negative Scenarios Tested

1. Invalid/missing media fields in mapper path are guarded by typed mapping layer (no direct raw JSON rendering in cards).
2. Home filter state change does not mutate source mock dataset.
3. Home-specific header variant does not leak to non-Home tabs/screens.

## 13. Known Limitations / Out of Scope

- Feed is still mock-driven (no Zustand store/API integration yet).
- Notification action is UI-only; no notification backend flow in this MR.
- Some poster URLs currently reference local Figma dev-server paths and are not production-ready bundled assets.
- “See all” actions are placeholders (`noop`) in current Home sections.

## 14. Breaking Changes

- [ ] Yes — details below
- [x] No

## 15. Rollback Plan

- **Revertible by git revert?** Yes
- **Requires data rollback?** No
- **Requires patch reversal?** No

## 16. Screenshots / Demo

UI changes — add before/after screenshots for:
- Home header variant
- Pinned filter row + scrollable feed
- Hero carousel and section rails
- Bottom navbar gap fix

## 17. Reviewer Checklist (for developer to pre-confirm before submitting)

- [ ] Code follows project React Native + Expo + TypeScript standards
- [ ] All test cases above actually executed
- [ ] No hardcoded visual magic values outside constants/tokens
- [ ] No direct API calls from Home screen/components
- [ ] No debug-only props/logs left in UI components
- [ ] Documentation links are valid and discoverable from design-system/rules
- [ ] No commented-out code blocks left behind

---

**Developer:** <!-- your name -->
**Date submitted:** 2026-06-15


[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]

# MR Description — Advanced Filters & Search

> **For developers:** Copy everything below into the Gitea MR description before requesting review. Fill every section. If a section does not apply, write `N/A` and a one-line reason — do not delete the section. Incomplete MR descriptions will be sent back without review.

---

## 1. Title & Reference

- **MR Title:** [FEAT] Advanced Filters screen and end-to-end Search filtering
- **Ticket / Issue:** N/A — feature branch `feat/filter`
- **Branch:** `feat/filter`
- **Target Branch:** `develop`

## 2. Change Type

Pick one (delete the rest):

- [ ] Bug Fix
- [x] New Feature
- [ ] Refactor (no behavior change)
- [ ] DocType / Schema Change
- [ ] Migration / Patch
- [ ] Hotfix (production)

## 3. Summary — What & Why

**What:**

Adds a reusable Advanced Filters screen (Figma `30910:2429`) reachable from Search, wires the Search tab through a dedicated `SearchStack`, and merges quick filter pills, debounced text search, and advanced filter state into a single client-side filtering pipeline on mock media data. Includes filter handoff via serializable navigation params (no callback props), a Search Results section above Recent Search when the user types a query, and a back arrow on Search that matches the New Releases (`SectionListingScreen`) inline SVG pattern.

**Why:**

Search previously had no advanced filtering UI or state management. Users need genre, platform, release year, and rating controls beyond the All/Movie/Series pills, with results updating consistently across Search sections. A stack-based navigation pattern keeps filter configuration generic and reusable from other stacks (e.g. Home) without breaking React Navigation serialization rules.

## 4. Files Modified

List every file changed. One line per file explaining what changed in that file.

| File Path | What Changed |
|---|---|
| `src/screens/advanced-filters/AdvancedFiltersScreen.tsx` | New full-screen Advanced Filters UI: content type, genre multi-select with tick icons, platform grid, release year slider, minimum rating, Reset/Apply bar; returns filter values via `CommonActions.setParams` on go-back |
| `src/screens/tabs/SearchScreen.tsx` | Search page with debounced query, quick filter tabs, advanced filter state, Search Results / Recent Search / Collections sections, filter icon navigation, inline `BackIcon` matching Section Listing |
| `src/navigation/tabs/SearchStack.tsx` | New stack navigator: `SearchHome` + `AdvancedFilters` |
| `src/navigation/tabs/RootTabs.tsx` | Search tab now mounts `SearchStack` instead of `SearchScreen` directly; header hidden for Search stack |
| `src/navigation/tabs/HomeStack.tsx` | Registers `AdvancedFilters` route for reuse from Home stack |
| `src/types/advanced-filters.ts` | Shared types for filter values, config, route params, and serializable return payload |
| `src/utils/search-filters.ts` | Pure filter logic: defaults, toggle selection, `matchesAdvancedFilters`, count dataset builder |
| `src/utils/debounce.ts` | Reusable debounce helper with `cancel()` for search input |
| `src/utils/index.ts` | Re-exports debounce and search-filter utilities |
| `src/constants/mock-media.ts` | Adds `platformFilterId` on mapped list-card items for platform filtering |
| `src/components/molecules/search-filter-input/SearchFilterInput.tsx` | Refactored to inline SVG icons for search and filter actions; exposes `onPressFilter` |

## 5. DocType Changes

N/A — React Native / Expo mobile app; no Frappe DocTypes.

- **New DocTypes:** N/A
- **Modified DocTypes:** N/A
- **Custom Fields added via fixtures:** N/A
- **Property Setters:** N/A

## 6. Database / Schema Impact

N/A — client-side mock data only; no backend schema changes.

- **New tables / columns:** No
- **Patches required:** No
- **Data migration needed:** No
- **Reversible?** Yes — UI-only; revert git commit

## 7. Hooks & Background Jobs

N/A — no Frappe hooks or server-side background jobs.

- **hooks.py changes:** N/A
- **Scheduled jobs added / modified:** N/A
- **Background job functions touched:** N/A

**Client-side hooks / utilities added:**

- `debounce()` in `src/utils/debounce.ts` — search input debouncing
- Filter state managed locally in `SearchScreen` via `useState` / `useEffect` / `useMemo` / `useCallback`

## 8. API Endpoints

N/A — filtering runs against local mock media (`mock/media/media-cards.json` via `getHomeFeedItemsBySection`). No new NestJS endpoints in this MR.

- **Whitelisted methods added:** N/A
- **Whitelisted methods modified:** N/A
- **Breaking API changes:** No

## 9. Permission & Role Changes

N/A — no auth or role changes in this MR.

- **Role permissions modified:** N/A
- **User permission rules affected:** No
- **Any use of `ignore_permissions`:** N/A

## 10. Test Cases — Positive Scenarios

1. Open Search tab — header shows centered "Search" title, back arrow (inline SVG), search input, All/Movie/Series pills, Recent Search and Collections carousels.
2. Type a movie/series name — after debounce, **Search Results** section appears above Recent Search with matching cards.
3. Tap filter icon on search input — navigates to Advanced Filters with current quick-filter content type pre-selected.
4. On Advanced Filters: select genres (pills show tick when selected), toggle platforms, adjust release year slider and minimum rating — tap **Apply Filters** — returns to Search with filters applied across all sections.
5. Tap **Reset** on Advanced Filters — clears genre/platform selections and restores defaults; Apply returns cleared state to Search.
6. Switch All → Movie or Series quick pill on Search — list cards filter by `item.type` immediately.
7. Combine text search + quick pill + advanced filters — only items matching all criteria appear in Search Results, Recent Search, and Collections.
8. Back arrow on Search navigates back when stack history exists; otherwise falls back to Home tab.

## 11. Edge Cases Tested

1. Empty search query — Search Results section hidden; Recent Search and Collections still show (filtered by pills/advanced filters only).
2. Search query with no matches — empty state message shown with appropriate subtitle.
3. Clear search input mid-typing — debounce cancelled immediately; `debouncedSearchValue` reset to `''`.
4. Advanced Filters opened with empty genre/platform selections — default state (no genres/platforms, `onlyMyPlatforms: false`, `minimumRating: 4`, `releaseYearStart: 2010`).
5. Apply filters twice in a row — `advancedFiltersResult` param consumed and cleared after first apply (no duplicate state updates).
6. Content type on Advanced Filters synced from Search quick pill (`initialValues.contentTypes`).
7. `npm run typecheck` passes with zero errors.

## 12. Negative Scenarios Tested

1. Non-serializable callbacks removed from navigation params — navigation does not warn about non-serializable values on Apply/Reset.
2. Invalid / missing `advancedFiltersResult` on route — `useEffect` no-ops safely.
3. Filter with minimum rating higher than all mock item ratings — sections show empty state as expected.
4. Platform filter selected for platform not present in mock data — no false-positive matches (only `netflix` / `disney` mapped in v1 mock).

## 13. Known Limitations / Out of Scope

- Filtering uses mock `list-card` fields as proxies: genres map to `length`/`language`; only `netflix` and `disney` have `platformFilterId` in mock data.
- No live API integration — `countDataset` and results are built from local mock sections (`top-tendencias`, `halloween-picks`).
- Apply button shows **"Apply Filters"** only (no live result count).
- Advanced Filters genre icons are inline SVG in the screen file; not yet extracted to shared atoms.
- `onlyMyPlatforms` toggle is UI-only until user platform preferences exist in store/API.
- No automated unit tests added for `search-filters.ts` in this MR.

## 14. Breaking Changes

- [ ] Yes — details below
- [x] No

Search tab navigation structure changes internally (`SearchStack`), but the tab route name and user entry point remain the same. No public API or store contract changes.

## 15. Rollback Plan

- **Revertible by git revert?** Yes
- **Requires data rollback?** No — client-side state only
- **Requires patch reversal?** No

Revert commits on `feat/filter` or merge revert PR; remove `SearchStack` registration and restore direct `SearchScreen` in `RootTabs` if needed.

## 16. Screenshots / Demo

UI change — attach before/after screenshots in Gitea:

- Search tab: header, search input, filter pills, Search Results section (with query)
- Advanced Filters: full screen with genre pills, platform grid, year slider, rating row, Reset/Apply bar
- Back arrow on Search matching New Releases page style

## 17. Reviewer Checklist (for developer to pre-confirm before submitting)

- [x] Code follows Expo + TypeScript strict + project folder structure rules
- [x] All test cases above actually executed (manual on simulator/device)
- [x] No hardcoded colors/spacing — design tokens via `theme/` and `constants/`
- [x] No component imports from `src/api/` — mock data only
- [x] Navigation params are serializable (no function callbacks)
- [x] `npm run typecheck` passes
- [x] New screen registered in navigator (`SearchStack`, `HomeStack`)
- [x] Loading/error patterns N/A — no async API calls in this MR
- [x] No `console.log` / debug prints left in code
- [x] No commented-out code blocks left behind

---

**Developer:** <!-- your name -->
**Date submitted:** 2026-06-16

