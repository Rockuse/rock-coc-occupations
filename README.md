# CoC7 Universal Occupations v0.7.0

**206 occupations** (165 Classic, 41 Modern) and additional skills.

## Fix
Removed `i.skill.credit-rating` from native occupation skill references in 77 occupations. This reference was demonstrated to trigger a Foundry v14 / CoC7 v8.16 `_id` update error on Clerk. `system.creditRating.min` and `.max` are unchanged. All other occupation skills, characteristic formulas, notes, custom skill documents and CoC IDs are preserved. See `data/credit-rating-fix-audit-v07.json`.

## Installation
1. Back up the world. Replace the existing `Data/modules/coc7-universal-occupations` folder with the folder from this ZIP.
2. Reload the world and run as GM in F12 console:

```js
await game.modules.get("coc7-universal-occupations").api.install()
```

3. Test a **new** investigator by adding Clerk. Check that Occupation displays Clerk and the six ordinary occupation skills have green checkmarks. Credit Rating remains available and its minimum/maximum range is retained.
4. Test optional-skill and modern-skill occupations separately.

**Important:** CoC7 has a world-level era setting. Existing embedded occupation items on actors are not automatically repaired. No live Foundry runtime test has been performed for the entire library. Removing the conflicting Credit Rating reference was confirmed to work for Clerk, but not individually validated for all 206 occupations.
