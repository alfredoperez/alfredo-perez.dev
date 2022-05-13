---
title: Enhancing NgRx Entity with Atomic State
description: null
tags:
  - angular
  - ngrx
type: note
status: evergreen
created: 2/23/21
updated: 5/13/22
---

Going from the concept that we have a `CallState`

```typescript
export enum LoadingState {
  INIT = 'INIT',
  LOADING = 'LOADING',
  LOADED = 'LOADED',
}

export interface ErrorState {
  errorMsg: string
}

export type CallState = LoadingState | ErrorState

export interface EntityState<T> {
  entity: T
  callState: CallState
}
```

---

1. Move this interface to a shared place and add more states

```typescript
export const enum RequestState {
  INIT = 'INIT',
  REQUESTING = 'REQUESTING',
  REQUESTING_MORE = 'REQUESTING_MORE',
  PROCESSING = 'PROCESSING',
  RESOLVED = 'RESOLVED',
  FAILED = 'FAILED',
  REJECTED = 'REJECTED',
  STOPPING = 'STOPPING',
  STOPPED = 'STOPPED',
}

export interface AtomicEntityState<T> extends EntityState<T> {
  // The total number of entities
  total: number
  // The search query executed
  searchQuery: SearchQuery
  // The current state of the request
  atomicState: AtomicState
}
```

---

2. Add common selectors

```typescript
export interface AtomicStateEntitySelectors<T, V> extends EntitySelectors<T, V> {
  selectIsLoading: (state: V) => boolean
  selectIsLoadingMore: (state: V) => boolean
  selectHasNoResults: (state: V) => boolean
  selectHasError: (state: V) => boolean
  selectErrorMessage: (state: V) => string
  selectAllResultsTotal: (state: V) => number
  selectTotalPages: (state: V) => number
  selectIsFirstRequest: (state: V) => boolean
  selectHasError: (state: V) => boolean
  selectErrorMessage: (state: V) => string
}
```

---
