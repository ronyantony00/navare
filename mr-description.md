# MR Description

## 1. Title & Reference

- **MR Title:** [BUGFIX] UI Fixes — Rive animation update, form placeholder color, responsive layout, and image quality improvements
- **Ticket / Issue:** N/A
- **Branch:** `staged-changes`
- **Target Branch:** `main`

## 2. Change Type

- [x] Bug Fix
- [ ] New Feature
- [ ] Refactor (no behavior change)
- [ ] DocType / Schema Change
- [ ] Migration / Patch
- [ ] Hotfix (production)

## 3. Summary — What & Why

**What:**
Multiple UI fixes across the codebase: replaced the Rive animation source on the landing page service section with an updated `.riv` file; fixed form validation error state showing placeholder/label text in red; made the Integrations page responsive by adjusting page size (6 items on mobile, 10 on desktop) with re-fetch on screen resize; improved image quality on multiple components; fixed responsive spacing and layout issues on WhoWeAre, UsecaseSolution, and Careers sections; and updated IntegrationCard layout to stack logo and title vertically.

**Why:**
- The Rive animation was pointing to an outdated `.riv` file (`Rive-Updated.riv`) which needed to be updated to `Rive-26.riv`.
- MUI's `error` prop was overriding the label color to red on validation errors, making placeholder text unreadable — fixed by adding a `Mui-error` CSS override.
- The Integrations page was fetching 10 items on all screen sizes, causing layout issues on mobile; now adapts page size to screen width.
- Image quality was degraded on SwiperCard and LandingPageFooter due to missing `quality` and `sizes` props.
- WhoWeAre section had overflow and spacing issues on smaller breakpoints.
- IntegrationCard logo and title layout was changed from horizontal to vertical for better visual hierarchy.

## 4. Files Modified

| File Path | What Changed |
|---|---|
| `public/assets/animation/rive/Rive-26.riv` | Added updated Rive animation binary file |
| `src/components/atoms/SwiperCard/SwipperCard.tsx` | Added `quality={100}`, `sizes="100vw"`, removed `object-cover` for better image rendering |
| `src/components/atoms/TextField/TextField.tsx` | Added `MuiInputLabel-root.Mui-error` override to keep placeholder text color unchanged during validation errors |
| `src/components/molecules/LandingPageFooter/LandingPageFooter.tsx` | Added `quality={100}` and `sizes="100vw"` to footer image for improved quality |
| `src/components/molecules/LandingPageServiceSection/LandingPageServiceSection.tsx` | Changed Rive animation source from `Rive-Updated.riv` to `Rive-26.riv` |
| `src/components/molecules/UsecaseSolutionSection/UsecaseSolutionSection.tsx` | Removed excessive responsive margin classes (`md:mt-space-30 xl:mt-space-77 2md:ml-space-14`), adjusted sub-description top margin |
| `src/components/molecules/WhoWeAreSection/WhoWeAreSection.tsx` | Added responsive max-width constraint on description (`2md:max-w-pct-080 lg:max-w-full`), adjusted image container width for medium screens, added width constraint on floating text overlay |
| `src/components/organisms/CareersSection/CareersSection.tsx` | Removed `base:min-h-max-height` class from container to fix layout |
| `src/components/organisms/IntegrationCard/IntegrationCard.tsx` | Changed card header layout from horizontal (`items-center`) to vertical (`flex-col`), increased logo size (45→65px), adjusted padding and border radius |
| `src/components/organisms/IntegrationCardSection/IntegrationCardSection.tsx` | Added responsive page size (6 on mobile, 10 on desktop), added `useEffect` to re-fetch data on screen resize, updated all pagination calls to use dynamic `pageSize` |
| `src/constants/dataConstants/NavareConstants.ts` | Updated service section description texts |

## 5. DocType Changes

- **New DocTypes:** N/A — Next.js frontend, no Frappe DocTypes
- **Modified DocTypes:** N/A
- **Custom Fields added via fixtures:** N/A
- **Property Setters:** N/A

## 6. Database / Schema Impact

- **New tables / columns:** No
- **Patches required:** N/A
- **Data migration needed:** No
- **Reversible?** Yes — revert commit(s)

## 7. Hooks & Background Jobs

- **hooks.py changes:** N/A
- **Scheduled jobs added / modified:** N/A
- **Background job functions touched:** N/A

## 8. API Endpoints

- **Whitelisted methods added:** N/A
- **Whitelisted methods modified:** N/A
- **Breaking API changes:** No

## 9. Permission & Role Changes

- **Role permissions modified:** N/A
- **User permission rules affected:** No
- **Any use of `ignore_permissions`:** N/A

## 10. Test Cases — Positive Scenarios

1. Landing page service section loads and renders the updated `Rive-26.riv` animation with Strapi content injected via text runs.
2. Schedule Demo form — submitting empty required fields shows red border and red error message, but placeholder/label text remains in its default color.
3. Integrations page — on mobile (< 768px), 6 cards are fetched and displayed per page; on desktop, 10 cards are fetched.
4. Integrations page — resizing the browser window triggers a re-fetch with the correct page size for the new viewport.
5. Integrations page — search, filter, and "Load More" all use the correct responsive page size.
6. Landing page footer image renders at full quality without blurriness.
7. SwiperCard feature tab images render without cropping (`object-cover` removed).
8. WhoWeAre section description text is properly constrained and does not overflow on medium screens.
9. Careers section hero renders without the `min-h-max-height` constraint causing layout issues.

## 11. Edge Cases Tested

1. Resizing from desktop to mobile on Integrations page correctly re-fetches with `pageSize=6` and resets to page 1.
2. Resizing from mobile to desktop correctly re-fetches with `pageSize=10`.
3. Rapid resize events do not cause duplicate API calls (state resets cleanly).
4. Rive animation gracefully shows `MediaContainerSkeleton` until loaded.
5. Form validation error state does not affect non-error fields' label colors.

## 12. Negative Scenarios Tested

1. Empty integrations API response does not crash the page.
2. Rive animation file not loading shows skeleton placeholder, not a blank screen.
3. Screen resize during an active search does not corrupt the search query or filter state.

## 13. Known Limitations / Out of Scope

- `RiveNavigation.tsx` and `RiveComponent.tsx` are currently unused (dead code) — not addressed in this MR.
- `NavareConstants.ts` text changes may need content review with the team.
- The `IntegrationCardSection` resize re-fetch uses `window.innerWidth < 768` as a hardcoded breakpoint — consider aligning with Tailwind's `md` breakpoint (748px) for consistency.

## 14. Breaking Changes

- [ ] Yes — details below
- [x] No

## 15. Rollback Plan

- **Revertible by git revert?** Yes
- **Requires data rollback?** No
- **Requires patch reversal?** No

## 16. Screenshots / Demo

UI changes — attach before/after screenshots for:

- Landing page Rive animation (before: `Rive-Updated.riv`, after: `Rive-26.riv`)
- Schedule Demo form validation — placeholder text color in error state
- Integrations page — mobile (6 cards) vs desktop (10 cards) layout
- WhoWeAre section responsive layout fix
- IntegrationCard vertical layout

## 17. Reviewer Checklist (for developer to pre-confirm before submitting)

- [ ] Code follows project Next.js + TypeScript + Tailwind CSS standards
- [ ] All test cases above actually executed
- [ ] No hardcoded visual magic values outside constants/tokens
- [ ] No debug-only props/logs left in UI components (`console.warn` in RiveAnimation are commented out)
- [ ] No `console.log` / debug prints left in code (only `console.error` for error handling)
- [ ] No commented-out code blocks left behind
- [ ] Rive animation `.riv` file is the correct production version

---

**Developer:** <!-- your name -->
**Date submitted:** 2026-07-28
