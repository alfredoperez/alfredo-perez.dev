---
title: Enhancing NgRx Entity with Atomic State
description: null
tags:
  - angular
  - ngrx
type: note
status: evergreen
created: 2/23/21
updated: 7/11/22
---

## ngrx/entity

[@ngrx/entity](https://ngrx.io/guide/entity) provides an API to manipulate and query entity collections.
It is a way to reduce boilerplate for creating reducers that manage a collection of models.

Now let's do a quick refresher on how to use it:

First, you create a state that extends the EntityStateModel and us.

```ts
export interface FriendsState extends EntityStateModel<Friend> {
  loading: boolean;
  loaded: boolean;
  errorMessage: string;
}
```

Then, you must make the entity adapter and use it to set the initial state.

```ts
export const adapter: EntityAdapter<Friend> =  createEntityAdapter<Friend>({

   // Configure the adapter
});

  
export const initialState: FriendsState = adapter.getInitialState({

  // Create initial state
});
```

Once you have the adapter, you can use it in the reducer to manipulate collections, like in this example where we use the addOne method

```ts
export const reducer = createReducer(
 initialState,
 on(FriendsApiActions.addFriendSuccess, (state, { friend }) => {
   return adapter.addOne(friend, {

       ...state,
       loaded: true,
       loading: false,
       errorMessage: null

   });
 })
);
```

## State machines

A state machine is a model that describes the behavior that a system that can be in only one state at any given time.

For example, this diagram shows the different states a Fetch request can be, and we can see that it can be only in one state at a time, meaning that it can be either resolved or in an failure state, but not in the two states at the same time.

![https://res.cloudinary.com/dagkspppt/image/upload/v1657562614/state-machine-fetch-request_gz30h3.jpg](https://res.cloudinary.com/dagkspppt/image/upload/v1657562614/state-machine-fetch-request_gz30h3.jpg)

## Atomic State

Applying this concept of atomic states into ngrx/entity means we will have a single prop to save the request state used to get the entities.

In a scenario where you have properties to store loaded, loading, error message, etc gets transformed into the having a single `requestState` prop that holds any state of the request or the error response:

```ts
// FROM
export interface FriendsState extends EntityStateModel<Friend> {
  loading: boolean;
  loaded: boolean;
  errorMessage: string;
}


// TO
  
export enum RequestState {
  INIT = 'INIT’,
  LOADING = 'LOADING’,
  RESOLVED = 'RESOLVED'
}

  
export interface ErrorState {
  errorCode?: number;
  errorMsg?: string;
}

  
export interface FriendsState extends EntityStateModel<Friend>{
  requestState: RequestState | ErrorState;
}
```

Now, if we want to use it in a reducer we only need to use an update a single property

```ts
// FROM
export const reducer = createReducer(
 initialState,
 on(FriendsApiActions.addFriendSuccess, (state, { friend }) => {
   return adapter.addOne(friend, {
       ...state,
       loaded: true,
       loading: false,
       errorMessage: null
   });
 })
);

// TO
export const reducer = createReducer(
  initialState,
  on(FriendsApiActions.addFriendSuccess, (state, { friend }) => {
   return adapter.addOne(friend, {
     ...state,
     requestState: RequestState.RESOLVED
   });
 })
);
```

## The opportunity!

If this is something we will use in all the entities,
**Would not be fantastic to re-use selectors?** I mean selectors for the states like loading, resolved, and error responses.
Aalso, **would not be awesome to use the same atomic state set up in all the entities instead of recreating them in all the places?**

## Making atomic the entity state

### Create the model

Create the model for the atomic state, errors and any other custom data you need and extend the EntityState with this new atomic state including property to hold the state

```ts
export enum RequestState {
  INIT = 'INIT’,
  LOADING = 'LOADING’,
  LOADING_MORE = 'LOADING_MORE’,
  PROCESSING = 'PROCESSING’,
  RESOLVED = 'RESOLVED’,
  FAILED = 'FAILED’,
  REJECTED = 'REJECTED’,
  STOPPING = 'STOPPING’,
  STOPPED = 'STOPPED'
}

  
export interface ErrorState {
  errorCode?: number;
  errorMsg?: string;
}

export interface AtomicState<T> extends EntityState<T> {
  requestState: RequestState | ErrorState;
}
```

### Add selectors

The second step is to define all the re-usable selectors:

```ts
const selectIsInit = (state: AtomicState<T>) =>
state.requestState === RequestState.INIT;

const selectIsLoading = (state: AtomicState<T>) =>
state.requestState === RequestState.LOADING;
  
const selectIsResolved = (state: AtomicState<T>) =>
state.requestState === RequestState.RESOLVED;

const selectErrorMessage = (state: AtomicState<T>) =>
(state.requestState as ErrorState).errorMsg;

const selectErrorCode = (state: AtomicState<T>) =>
(state.requestState as ErrorState).errorCode;

```

### Create new adapter

 The final step is to create a new adapter that extends the one from ngrx/entity and includes the selectors and the new `requestState` property

```ts
  
export function createAtomicStateAdapter<T>(options?: {
     selectId?: IdSelector<T>;
     sortComparer?: false | Comparer<T>;

}): AtomicStateAdapter<T> {

const entityAdapter = createEntityAdapter<T>(options);
const selectorsFactory = createAtomicStateSelectorsFactory<T>();
const stateFactory = createInitialAtomicStateFactory<T>();

  
return {
   ...entityAdapter,
   ...stateFactory,
   ...selectorsFactory
 } as AtomicStateAdapter<T>;
}
```

### Using the new Atomic State int the Reducers

Now, to use it in the reducers, you do it the same way you as with the ngrx/entity by defining the state and creating the adapter, but you might notice that is removing some code already

```ts
// FROM
export interface FriendsState extends EntityStateModel<Friend> {
  loading: boolean;
  loaded: boolean;
  errorMessage: string | null;
}

export const adapter = createEntityAdapter<Friend>({
  loading: false;
  loaded: false;
  errorMessage: null;
});


// TO
export interface FriendsState extends AtomicState<Friend> {
}

export const adapter = createEntityAdapter<Friend>({
});
```

Now when we use it it is easier to handle the state changes:

```TS
// FROM
export const reducer = createReducer(
 initialState,
 on(FriendsApiActions.addFriendSuccess, (state, { friend }) => {
   return adapter.addOne(friend, {
       ...state,
       loaded: true,
       loading: false,
       errorMessage: null
   });
 })
);

// TO
export const reducer = createReducer(
  initialState,
  on(FriendsApiActions.addFriendSuccess, (state, { friend }) => {
   return adapter.addOne(friend, {
     ...state,
     requestState: RequestState.RESOLVED
   });
 })
);
```

### Using the new Atomic State int the Selectors

We reduce a good amount of boilerplate in the selectors since we go  from having to declare all the selectors per entity to define which we require

```ts
// FROM
export const {
  selectAll: selectAllFriends
} = adapter.getSelectors(selectFriendsState as any);

  
export const selectIsLoading = createSelector(
  selectFriendsState,
  (state) => state.requestState === RequestState.LOADING
);

export const selectIsResolved = createSelector(
  selectFriendsState,
  (state) => state.requestState === RequestState.RESOLVED
);

export const selectHasError = createSelector(
  selectFriendsState,
  (state) => !!(
    (state.requestState as ErrorState).errorMsg ||
    (state.requestState as ErrorState).errorCode
  )
);

export const selectErrorMessage = createSelector(
  selectFriendsState,
  (state) => (state.requestState as ErrorState).errorMsg
);


// TO
export const {
  selectAll: selectAllFriends,
  selectIsLoading,
  selectIsResolved,
  selectHasError,
  selectErrorMessage
} = adapter.getSelectors(selectFriendsState as any);
```

## so WHAT?

**Atomic State** allows have a **single prop** for the state
Thanks to extending the **ngrx/entity** with the atomic state, you will have **less boilerplate** and **enforce consistency**

## Links

- [GitHub](https://alfredoperez.github.io/ngrx-example-app/atomic-state)
- [NgRx: How and where to handle loading and error states of AJAX calls? - NgRx inDepth](https://indepth.dev/posts/1033/ngrx-how-and-where-to-handle-loading-and-error-states-of-ajax-calls)
