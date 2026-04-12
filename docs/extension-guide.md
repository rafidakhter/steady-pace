# Extension Guide

This guide explains how to extend Steady Pace without breaking the current architecture.

## Add a new sport

1. Add the sport key in [src/core/constants/sports.ts](/mnt/c/Users/rafid/dev/steady%20pace/src/core/constants/sports.ts).
2. Add the sport definition in [src/data/seed/sports.ts](/mnt/c/Users/rafid/dev/steady%20pace/src/data/seed/sports.ts).

Each sport should define:

- `id`
- `key`
- `name`
- `unitPreference`
- `colorToken`
- `icon`

Important:

- do not hardcode the sport into screen JSX
- reuse existing workout and challenge data structures

## Add a new challenge

1. Add the challenge entry to [src/data/seed/challenges.ts](/mnt/c/Users/rafid/dev/steady%20pace/src/data/seed/challenges.ts).
2. Give it a unique `id` and `planId`.
3. Add or connect a matching training plan in the seed layer.
4. Update [src/domain/services/challengeSelectionService.ts](/mnt/c/Users/rafid/dev/steady%20pace/src/domain/services/challengeSelectionService.ts) so the challenge can resolve to its default plan.

Each challenge should define:

- `id`
- `name`
- `category`
- `level`
- `estimatedDurationLabel`
- `description`
- `planId`

## Add a new training plan

1. Create a new seed file in `src/data/seed`, following the current plan shape.
2. Return the new plan from [src/data/repositories/trainingPlanRepository.ts](/mnt/c/Users/rafid/dev/steady%20pace/src/data/repositories/trainingPlanRepository.ts).
3. Ensure the challenge points to that `planId`.

A training plan should contain:

- `id`
- `challengeId`
- `name`
- `phase`
- `weeks`

Each week should contain:

- `weekNumber`
- optional `goal`
- optional `milestone`
- `workouts`

Each workout should contain:

- `id`
- `weekNumber`
- `dayKey`
- `orderIndex`
- `sportId`
- `type`
- `title`
- `description`
- optional distance/time/zone/notes

## Add a new workout type

1. Add the type to [src/core/constants/workoutTypes.ts](/mnt/c/Users/rafid/dev/steady%20pace/src/core/constants/workoutTypes.ts).
2. Use it in plan seed data.
3. Only update presentation components if the new type truly needs a distinct visual treatment.

Keep the rule:

- do not put workout-type business rules directly into route files or screen JSX

## Persistence strategy

Today the app persists locally through:

- `authStore`
- `appStore`
- `workoutStore`

All of them persist through the storage adapter in [src/data/adapters/localStorageAdapter.ts](/mnt/c/Users/rafid/dev/steady%20pace/src/data/adapters/localStorageAdapter.ts).

If persistence changes later:

1. keep the store API stable if possible
2. update the adapter or repository layer first
3. avoid changing screen components unless UX changes are required

## Backend integration points

If you later adopt Supabase or another backend:

### Auth

- replace local auth behavior in [src/store/authStore.ts](/mnt/c/Users/rafid/dev/steady%20pace/src/store/authStore.ts)
- preserve the store shape if possible so route guards keep working

### Plans and challenges

- move seed-backed repository lookups into remote-backed repository implementations
- keep domain entities and services unchanged where possible

### Workout logs

- sync `workoutStore` writes to the backend
- optionally keep local-first optimistic state for responsiveness

### Suggested migration path

1. keep seeds for local fallback and development
2. add remote repository implementations beside current ones
3. switch repositories through composition, not screen rewrites
4. only remove local seed usage after backend parity is proven

## Practical rule of thumb

When adding something new, prefer:

- updating seed data
- updating repository selection
- updating domain services if logic changes

Avoid:

- adding conditional one-off logic inside screens
- hardcoding specific sports into component trees
- coupling UI directly to a future backend SDK
