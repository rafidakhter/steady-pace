# Steady Pace

Steady Pace is a React Native training app built with Expo. V1 focuses on a calm beginner flow:

- local sign up and sign in
- challenge selection
- home dashboard
- weekly plan
- workout detail and logging
- progress summary
- local persistence

The current V1 ships with one fully implemented challenge:

- `Sprint Triathlon`

The app architecture is intentionally data-driven so more sports, workout types, challenges, and training plans can be added later without rewriting screen logic.

## Stack

- Expo
- React Native
- TypeScript
- Expo Router
- Zustand
- React Hook Form
- Zod
- AsyncStorage
- NativeWind
- react-native-svg
- victory-native

## Running the app

Install dependencies:

```bash
npm install
```

Start Expo:

```bash
npx expo start --tunnel
```

Helpful scripts:

```bash
npm run start
npm run ios
npm run android
npm run typecheck
```

## Current app flow

1. User signs up or signs in locally.
2. User selects a challenge.
3. The selected challenge activates a seeded training plan.
4. Home shows today's workout based on the persisted plan start date.
5. Plan shows the current week.
6. Workout Detail saves workout logs locally.
7. Progress computes summary data from planned workouts and saved logs.

## Architecture

The project uses a feature-first structure with domain and data layers kept separate from the UI.

### Routing

- `src/app`
  - Expo Router entry points only
  - route files stay thin and render feature screens

### Core

- `src/core/constants`
  - design tokens and app-wide constants
- `src/core/theme`
  - composed theme object
- `src/core/utils`
  - generic helpers for dates, metrics, formatting, and progress

### Domain

- `src/domain/entities`
  - app-wide business entities like `Workout`, `TrainingPlan`, and `Challenge`
- `src/domain/services`
  - reusable training and progress logic
- `src/domain/value-objects`
  - small typed domain values

### Data

- `src/data/seed`
  - seed data for sports, challenges, and plans
- `src/data/repositories`
  - read access to seeded plans and computed summaries
- `src/data/adapters`
  - persistence adapter boundary

### Features

- `src/features/*`
  - screen-specific hooks, validators, and components
  - routing and global storage logic are kept out of presentational components

### Shared components

- `src/components/ui`
  - reusable visual primitives
- `src/components`
  - reusable domain-aware UI blocks
- `src/components/charts`
  - chart wrappers used by progress screens

### State

- `src/store/authStore.ts`
  - local auth session and registered users
- `src/store/appStore.ts`
  - selected challenge, active plan, and plan start date
- `src/store/workoutStore.ts`
  - workout logs and completion state

## Design principles used in code

- no screen-level hardcoding of swim, bike, or run logic
- sports come from seed/config data
- workout types come from constants
- plans are data-driven
- business logic stays in services, stores, and hooks
- persistence is abstracted behind a storage adapter

## Persistence strategy

V1 uses `AsyncStorage` through `LocalStorageAdapter` in [src/data/adapters/localStorageAdapter.ts](src/data/adapters/localStorageAdapter.ts).

Zustand persistence uses that adapter instead of talking directly to AsyncStorage from feature code. This keeps storage concerns isolated and makes later replacement easier.

Persisted data today:

- auth session
- locally registered users
- selected challenge
- active plan id
- plan start date
- workout logs

## Future backend integration points

If you later connect Supabase or another backend, the main seams are already in place:

- replace or extend the storage adapter in `src/data/adapters`
- replace local auth behavior in `src/store/authStore.ts`
- move seeded repository reads into remote-backed repositories in `src/data/repositories`
- keep domain entities and services unchanged where possible
- keep screens reading through hooks and stores so backend changes do not leak into JSX

## Notes on charts

The current progress charts are lightweight wrappers using `react-native-svg`. This keeps the V1 UI stable while leaving room to move to richer `victory-native` usage later if the full Skia-based dependency chain is added.

## Extending the app

See [docs/extension-guide.md](docs/extension-guide.md) for:

- how to add a new sport
- how to add a new challenge
- how to add a new training plan
- what to update when connecting a backend later
