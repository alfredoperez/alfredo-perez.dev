---
title: NgRx Workshop at ng-conf 2020
tags:
  - angular
type: workshop
created: 3/09/21
updated: 5/13/22
---

# Things I Learned

## When to use it?

This question was several times and basically you can use the **SHARI** principle to find out if ngrx or redux is needed for your application or even a specific component inside your app.

[(2) Mike Ryan on Twitter: "In it, we introduce the SHARI principle: any state that needs to be Shared, Hydrated, made Available across routes, Retrieved with a side effect, or is Impacted by other components/effects belongs in the Store." / Twitter](https://twitter.com/mikeryandev/status/988074549983023104?lang=en)

From the [docs](https://ngrx.io/docs#when-should-i-use-ngrx-for-state-management) we get the following:

> `@ngrx/store` (or Redux in general) provides us with a lot of great features and can be used in a lot of use cases. But sometimes this pattern can be an overkill. Implementing it means we get the downside of using Redux (a lot of extra code and complexity) without benefiting of the upsides (predictable state container and unidirectional data flow).

> The NgRx core team has come up with a principle called **SHARI**, that can be used as a rule of thumb on data that needs to be added to the store.

> - **Shared**: State that is shared between many components and services
> - **Hydrated**: State that needs to be persisted and hydrated across page reloads
> - **Available**: State that needs to be available when re-entering routes
> - **Retrieved**: State that needs to be retrieved with a side effect, e.g. an HTTP request
> - **Impacted**: State that is impacted by other components

> Try not to over-engineer your state management layer. Data is often fetched via XHR requests or is being sent over a WebSocket, and therefore is handled on the server side. Always ask yourself **when** and **why** to put some data in a client side store and keep alternatives in mind. For example, use routes to reflect applied filters on a list or use a `BehaviorSubject` in a service if you need to store some simple data, such as settings. Mike Ryan gave a very good talk on this topic: [You might not need NgRx](https://youtu.be/omnwu_etHTY)

Also, the following question was asked:

> Once you add ngrx to an application, is it a bad practice to use a service with BehaviorSubject to communicate between components?  Example. Having a modal with a form that uses a stepper. Should the modal use NGRX because the whole app is using ngrx.

The response from Mike was:

> **No, you do not have to use ngrx for all your states.**

> We have this term called SHARI principle and essentially the only state that goes into the ngrx store is a truly global state, state that is shared between your components, state that needs to be rehydrated when the application boots up or is impacted by actions of other features.

> If the state doesn't match that rubric, then **it is totally fine to use a simple state storage mechanism** for it as a service with a Behavior Subject.

Another related comment by Alex:

> One of the things I remember myself when I started using ngrx, I tried to **push anything** ngrx mostly because I wanted the dev tools to the time travel and I think some of the features that are exciting and helpful can misguide you. The moment of realization for me is not to push everything possible into it, at that time we were learning, as the pattern was evolving, now is kind of known what are the best practices.

> Some of the things I **_don't put in the store_** are **Form Controls** (since it is already a reactive state), **the local state within components** (even if it interacts with the network), some of the lifecycle state for a component. Basically, **the first thing I asked myself is how shareable is the state, how much does the application needs to know about this.**

Here is a link to a re-usable service that uses BehaviorSubject and can be used for simpler communication cases

[[Angular service to handle state using BehaviorSubject]]

Here is a library by Dan Wahlin that can help for simple state management:

[DanWahlin/Observable-Store: Observable Store provides a simple way to manage state in Angular, React, Vue.js and other front-end applications.](https://github.com/DanWahlin/Observable-Store)

### Resources

- [Reducing the Boilerplate with NgRx](https://www.youtube.com/watch?v=t3jx0EC-Y3c) by Mike Ryan and Brandon Roberts
- [Do we really need @ngrx/store](https://blog.strongbrew.io/do-we-really-need-redux/) by Brecht Billiet
- [Simple State Management with RxJS’s scan operator](https://juristr.com/blog/2018/10/simple-state-management-with-scan/) by Juri Strumpflohner
- [You might not need NgRx](https://www.youtube.com/watch?v=omnwu_etHTY) by Myke Ryan
- [Mastering the Subject: Communication Options in RxJS](https://www.youtube.com/watch?v=_q-HL9YX_pk) by Dan Wahlin

## Actions

- Unified interface to describe events
- Just data, no functionality
- Has at a minimum a type property
- Strongly typed using classes and enums

### Notes

There are a few rules to[ writing good actions](https://ngrx.io/guide/store/actions#writing-actions) within your application.

- **Upfront** - write actions before developing features to understand and gain a shared knowledge of the feature being implemented.
- **Divide** - categorize actions based on the event source.
- **Many** - actions are inexpensive to write, so the more actions you write, the better you express flows in your application.
- **Event-Driven** - capture _events_ **not** _commands_ as you are separating the description of an event and the handling of that event.
- **Descriptive** - provide context that are targeted to a unique event with more detailed information you can use to aid in debugging with the developer tools.

- Actions can be created with `props` or fat arrows

```typescript
// With props
export const updateBook = createAction(
    '[Books Page] Update a book',
    props<{
        book: BookRequiredProps,
        bookId: string
    }>()
);

// With fat arrow
export const getAuthStatusSuccess = createAction(
    "[Auth/API] Get Auth Status Success",
    (user: UserModel | null) => ({user})
);
```

### Event Storming

You can use sticky notes as a group to identify:

- All of the events in the system
- The commands that cause the event to arise
- The actor in the system that invokes the command
- The data models attached to each event

### Naming Actions

- The **category** of the action is captured within the square brackets `[]`
- It is recommended to use present or past tense to **describe the event occurred** and stick with it.

**_Example_**

- When related to components you can use present tense because they are related to events. It is like in HTML the events do not use past tense. Eg. `OnClick` or `click` is not `OnClicked` or `clicked`

```typescript
export const createBook = createAction(
    '[Books Page] Create a book',
    props<{book: BookRequiredProps}>()
);

export const selectBook = createAction(
    '[Books Page] Select a book',
    props<{bookId: string}>()
);
```

- When the actions are related to API you can use past tense because they are used to describe an action that happened

```typescript
export const bookUpdated = createAction(
    '[Books API] Book Updated Success',
    props<{book: BookModel}>()
);

export const bookDeleted = createAction(
   '[Books API] Book Deleted Success',
   props<{bookId: string}>()
);
```

### Folders and File structure

It is a good practice to have the actions define close to the feature that uses them.

```typescript
├─ books\
│     actions\
│         books-api.actions.ts
│         books-page.actions.ts
│         index.ts      
```

The index file can be used to define the names for the actions exported, but it can be completely avoided

```typescript
import * as BooksPageActions from "./books-page.actions";
import * as BooksApiActions from "./books-api.actions";

export { BooksPageActions, BooksApiActions };
```

## Reducers

- Produce new states
- Receive the last state and next action
- Switch on the action type
- Use pure, immutable operations

### Notes

- Create separate reducer per feature
- Should live outside the feature because the state it is shared in the whole application
- State should save the model as it comes from the API. This can be later transformed into the selectors.
- Combine actions that can use the same reducer

```typescript
  on(BooksPageActions.enter, BooksPageActions.clearSelectedBook, (state, action) => ({
          ...state,
          activeBookId: null
   })),
```

- Only reducers can modify state and it should do it in an immutable way
- Create helper functions to handle the data manipulation of collections.

**_Example_**

```typescript
const createBook = (books: BookModel[], book: BookModel) => [...books, book];
const updateBook = (books: BookModel[], changes: BookModel) =>
    books.map(book => {
        return book.id === changes.id ? Object.assign({}, book, changes) : book;
    });
const deleteBook = (books: BookModel[], bookId: string) =>
    books.filter(book => bookId !== book.id);
    
...

    on(BooksApiActions.bookCreated, (state, action) => {
        return {
            collection: createBook(state.collection, action.book),
            activeBookId: null
        };
    }),
    on(BooksApiActions.bookUpdated, (state, action) => {
        return {
            collection: updateBook(state.collection, action.book),
            activeBookId: null
        };
    }),
    on(BooksApiActions.bookDeleted, (state, action) => {
        return {
            ...state,
            collection: deleteBook(state.collection, action.bookId)
        };
    })
```

### Feature reducer file

- Declares a `State` interface with the state for the feature
- Declares an `initialState` that included the initial state
- Declare a feature reducer that contains the result of using `createReducer`
- Exports a `reducer` function that wraps the reducer created. This is needed for AOT and it is not needed when using Ivy.

**_Example_**

```typescript
export interface State {
    collection: BookModel[];
    activeBookId: string | null;
}

export const initialState: State = {
    collection: [],
    activeBookId: null
};

export const booksReducer = createReducer(
    initialState,
    on(BooksPageActions.enter,
        BooksPageActions.clearSelectedBook, (state, action) => ({
        ...state,
        activeBookId: null
    })),
    on(BooksPageActions.selectBook, (state, action) => ({
        ...state,
        activeBookId: action.bookId
    })),
);

export function reducer(state: State | undefined, action: Action) {
    return booksReducer(state, action);
}

```

- The index file defines the state and assigns each reducer to a property on the state

```typescript
import * as fromBooks from "./books.reducer";

export interface State {
    books: fromBooks.State;
}

export const reducers: ActionReducerMap<State> = {
    books:fromBooks.reducer
};

export const metaReducers: MetaReducer<State>[] = [];
```

## Selectors

- Allow us to query our store for data
- Recompute when their inputs change
- Fully leverage memoization for performance
- Selectors are fully composable

### Notes

- They are in charge of **transforming the data** to how the UI uses it. State in the store should be clean and easy to serialize and since selector is easy to test this is the best place to transform. Is also makes it easier to hydrate
- They can transform to complete "View Models", there is nothing wrong about naming the model specific to the UI that they are using
- "Getter" selectors are simple selector that get data from a property on the state

```typescript
export const selectAll = (state: State) => state.collection;
export const selectActiveBookId = (state: State) => state.activeBookId;
```

- Complex selectors combine selectors and this should be created using `createSelector`. The function only gets called if any of the inputs selectors are modified

```typescript
export const selectActiveBook = createSelector(
    selectAll,
    selectActiveBookId,
    (books, activeBookId) =>
        books.find(book => book.id === activeBookId)
);
```

- Selectors can go next to the component where they are used or in the reducer file located in the `state` folder. Local selectors make it easier to test

- Global selectors are added in the `state/index`.

```typescript
export const selectBooksState = (state:State)=> state.books;
export const selectActiveBook = createSelector(
    selectBooksState,
    fromBooks.selectActiveBook
)
```

- When using the selector in the component is recommended to initialize in the constructor. If using the strict mode in TypeScript, the compiler will not be able to know that the selectors where initialized on `ngOnInit`

## Effects

- Processes that run in the background
- Connect your app to the outside world
- Often used to talk to services
- Written entirely using RxJS streams

### Notes

- Try to keep effect close to the reducer and group them in classes as it seems convenient
- For effects, it's okay to split them into separate effects files, one for each API service. But it's not a mandate
- Is still possible to use guards and resolver, just dispatch an action when it is done
- **It is recommended to not use resolvers** since we can dispatch the actions using effects
- Put the `books-api.effects` file in the same level as books.module.ts, so that the bootstrapping is done at this level and effects are loaded and running if and only if the books page is loaded. If we were to put the effects in the shared global states, the effects would be running and listening at all times, which is not the desired behavior.
- An effect should dispatch a single action, use a reducer to modify state if multiple props of the state need to be modified
- Prefer the use of brackets and `return` statements in arrow function to increase debugability

```typescript
// Prefer this
getAllBooks$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(BooksPageActions.enter),
        mergeMap((action) => {
            return this.booksService
                .all()
                .pipe(
                    map((books: any) => BooksApiActions.booksLoaded({books}))
                )
        })
    );
})

// Instead of 
 getAllBooks$ = createEffect(() =>
    this.actions$.pipe(
       ofType(BooksPageActions.enter),
       mergeMap((action) =>
           this.booksService
               .all()
               .pipe(
                   map((books: any) => BooksApiActions.booksLoaded({books}))
               ))
    ))

```

### What map operator should I use?

`switchMap` is not always the best solution for all the effects and here are other operators we can use.

- `mergeMap` Subscribe immediately, never cancel or discard. It can have race conditions.

This can be used to _**Delete items**_, because it is probably safe to delete the items without caring about the deletion order

```typescript
deleteBook$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BooksPageActions.deleteBook),
            mergeMap(action =>
                this.booksService
                    .delete(action.bookId)
                    .pipe(
                        map(() => BooksApiActions.bookDeleted({bookId: action.bookId}))
                    )
            )
        )
    );
```

- `concatMap` Subscribe after the last one finishes

This can be used for _**updating or creating items**_, because it matters in what order the item is updated or created.

```typescript
createBook$ = createEffect(() =>
    this.actions$.pipe(
        ofType(BooksPageActions.createBook),
        concatMap(action =>
            this.booksService
                .create(action.book)
                .pipe(map(book => BooksApiActions.bookCreated({book})))
        )
    )
);
```

- `exhaustMap` Discard until the last one finishes. Can have race conditions

This can be used for _**non-parameterized queries**_. It does only one request event if it gets called multiple times. Eg. getting all books.

```typescript
getAllBooks$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(BooksPageActions.enter),
        exhaustMap((action) => {
            return this.booksService
                .all()
                .pipe(
                    map((books: any) => BooksApiActions.booksLoaded({books}))
                )
        })
    )
})
```

- `switchMap` Cancel the last one if it has not completed. Can have race conditions

This can be used for _**parameterized queries**_

### Other effects examples

- Effects does not have to start with an action

```typescript
@Effect() tick$ = interval(/* Every minute */ 60 * 1000).pipe(
 map(() => Clock.tickAction(new Date()))
);
```

- Effects can be used to elegantly connect to a WebSocket

```typescript
@Effect()
ws$ = fromWebSocket("/ws").pipe(map(message => {
  switch (message.kind) {
    case “book_created”: {
      return WebSocketActions.bookCreated(message.book);
    }
    case “book_updated”: {
      return WebSocketActions.bookUpdated(message.book);
    }
    case “book_deleted”: {
      return WebSocketActions.bookDeleted(message.book);
     }
}}))
```

- You can use an effect to communicate to any API/Library that returns observables. The following example shows this by communicating with the snack bar notification API.

```typescript
@Effect() promptToRetry$ = this.actions$.pipe(
 ofType(BooksApiActions.createFailure),
 mergeMap(action =>
    this.snackBar
        .open("Failed to save book.","Try Again", {duration: /* 12 seconds */ 12 * 1000 })
        .onAction()
        .pipe(
          map(() => BooksApiActions.retryCreate(action.book))
        )
   )
);
```

- Effects can be used to retry API Calls

```typescript
@Effect()
createBook$ = this.actions$.pipe(
 ofType(
    BooksPageActions.createBook,
    BooksApiActions.retryCreate,
 ),
 mergeMap(action =>
   this.booksService.create(action.book).pipe(
     map(book => BooksApiActions.bookCreated({ book })),
     catchError(error => of(BooksApiActions.createFailure({
       error,
       book: action.book,
     })))
 )));
```

- It is OK to write effects that don't dispatch any action like the following example shows how it is used to open a modal

```typescript
@Effect({ dispatch: false })
openUploadModal$ = this.actions$.pipe(
 ofType(BooksPageActions.openUploadModal),
 tap(() => {
    this.dialog.open(BooksCoverUploadModalComponent);
 })
);
```

- An effect can be used to handle a cancelation like the following example that shows how an upload is cancelled

```typescript
@Effect() uploadCover$ = this.actions$.pipe(
 ofType(BooksPageActions.uploadCover),
 concatMap(action =>
    this.booksService.uploadCover(action.cover).pipe(
      map(result => BooksApiActions.uploadComplete(result)),
      takeUntil(
        this.actions$.pipe(
          ofType(BooksPageActions.cancelUpload)
        )
))));
```

## NgRx Entity

- Working with collections should be fast
- Collections are very common
- `@ngrx/entity` provides a common set of basic operations
- `@ngrx/entity` provides a common set of basic state derivations

## How to add @ngrx/entity

- Start by creating a `state` that extends the `entityState`

```typescript
// From:

// export interface State {
//     collection: BookModel[];
//     activeBookId: string | null;
// }


// To:
export interface State extends EntityState<BookModel> {

    activeBookId: string | null;
}
```

- Create an adapter and define the initial state with it.

**Note** that the `collection` is no longer needed

```typescript
// From:

// export const initialState: State = {
//     collection: [],
//     activeBookId: null
// };

// To:
const adapter = createEntityAdapter<BookModel>();

export const initialState: State = adapter.getInitialState({
    activeBookId: null
});
```

- Out of the box, it uses the 'id' as the id, but we can also specify custom id and comparer.

```typescript
const adapter = createEntityAdapter<BookModel>({
    selectId: (model: BookModel) => model.name,
    sortComparer:(a:BookModel,b:BookModel)=> a.name.localeCompare(b.name)
});
```

- Refactor the reducers to use the entity adapter

```typescript
    // on(BooksApiActions.bookCreated, (state, action) => {
    //     return {
    //         collection: createBook(state.collection, action.book),
    //         activeBookId: null
    //     };
    // }),
    on(BooksApiActions.bookCreated, (state, action) => {
        return adapter.addOne(action.book, {
            ...state,
            activeBookId: null
        })
    }),
    
    // on(BooksApiActions.bookUpdated, (state, action) => {
    //     return {
    //         collection: updateBook(state.collection, action.book),
    //         activeBookId: null
    //     };
    // }),
    on(BooksApiActions.bookUpdated, (state, action) => {
        return adapter.updateOne(
            {id: action.book.id, changes: action.book},
            {
                ...state,
                activeBookId: null
            })
    }),
    
    // on(BooksApiActions.bookDeleted, (state, action) => {
    //     return {
    //         ...state,
    //         collection: deleteBook(state.collection, action.bookId)
    //     };
    // })
    on(BooksApiActions.bookDeleted, (state, action) => {
        return adapter.removeOne(action.bookId, state)
    })
```

- Then create selectors using the entity adapter

```typescript
// From:
// export const selectAll = (state: State) => state.collection;
// export const selectActiveBookId = (state: State) => state.activeBookId;
// export const selectActiveBook = createSelector(
//     selectAll,
//     selectActiveBookId,
//     (books, activeBookId) => books.find(book => book.id === activeBookId) || null
// );

// To:
export const {selectAll, selectEntities} = adapter.getSelectors();
export const selectActiveBookId = (state: State) => state.activeBookId;
```

## [Adapter Collection Methods](https://ngrx.io/guide/entity/adapter#adapter-collection-methods)

The entity adapter also provides methods for operations against an entity. These methods can change one or many records at a time. Each method returns the newly modified state if changes were made and the same state if no changes were made.

- `addOne`: Add one entity to the collection
- `addMany`: Add multiple entities to the collection
- `addAll`: Replace current collection with provided collection
- `setOne`: Add or Replace one entity in the collection
- `removeOne`: Remove one entity from the collection
- `removeMany`: Remove multiple entities from the collection, by id or by predicate
- `removeAll`: Clear entity collection
- `updateOne`: Update one entity in the collection
- `updateMany`: Update multiple entities in the collection
- `upsertOne`: Add or Update one entity in the collection
- `upsertMany`: Add or Update multiple entities in the collection
- `map`: Update multiple entities in the collection by defining a map function, similar to [Array.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

## Meta-Reducers

- Intercept actions before they are reduced
- Intercept state before it  is emitted
- Can change the control flow of the Store

![https://res.cloudinary.com/dagkspppt/image/upload/v1615306691/4ji9re4d6scq342tnql4_x9pxhe.gif](https://res.cloudinary.com/dagkspppt/image/upload/v1615306691/4ji9re4d6scq342tnql4_x9pxhe.gif)

### Most common use cases

- Reset state when a signout action occurs
- for debugging creating logger
- to rehydrate when the application starts up

-It is like a plugin system for the store, they behave similarly to the **interceptors**

### Example

An example of this can be to use it in a logger

```typescript
const logger = (reducer: ActionReducer<any, any>) => (state: any, action: Action) => {
    console.log('Previous State', state);
    console.log('Action', action);

    const nextState = reducer(state, action);

    console.log('Next State', nextState);
    return nextState;
};

export const metaReducers: MetaReducer<State>[] = [logger];
```

## Folder Structure

Following the LIFT principle:

- **L**ocating our code is easy
- **I**dentify code at a glance
- **F**lat file structure for as long as possible
- **T**ry to stay DRY - don’t repeat yourself

---

### Key Takeaways

- Put state in a shared place separate from features
- Effects, components, and actions belong to features
- Some effects can be shared
- Reducers reach into modules’ action barrels

### Folder structure followed in the workshop

```
├─ books\
│     actions\
│         books-api.actions.ts
│         books-page.actions.ts
│         index.ts                  // Includes creating names for the exports
│      books-api.effects.ts
│     
├─ shared\
│       state\
│          {feature}.reducer.ts     // Includes state interface, initial interface, reducers and local selectors
│          index.ts
│ 
```

- The index file in the _actions_ folder was using action barrels like the following:

```typescript
import * as BooksPageActions from "./books-page.actions";
import * as BooksApiActions from "./books-api.actions";

export { BooksPageActions, BooksApiActions };
```

- This made easier and more readable at the time of importing it:

```
import { BooksPageActions } from "app/modules/book-collection/actions";
```

---

---

### Folder structure followed in example app from @ngrx

```
├─ books\
│     actions\
│         books-api.actions.ts
│         books-page.actions.ts
│         index.ts                  // Includes creating names for the exports
│     effects\
|         books.effects.spec.ts 
|         books.effects.ts 
|     models\
|         books.ts 
│     reducers\
|         books.reducer.spec.ts 
|         books.reducer.ts 
|         collection.reducer.ts 
|         index.ts 
│     
├─ reducers\
│        index.ts  /// Defines the root state and reducers
│ 
```

- The index file under the _reducers_ folder is in charge of setting up the reducer and state

```typescript
import * as fromSearch from '@example-app/books/reducers/search.reducer';
import * as fromBooks from '@example-app/books/reducers/books.reducer';
import * as fromCollection from '@example-app/books/reducers/collection.reducer';
import * as fromRoot from '@example-app/reducers';

export const booksFeatureKey = 'books';

export interface BooksState {
  [fromSearch.searchFeatureKey]: fromSearch.State;
  [fromBooks.booksFeatureKey]: fromBooks.State;
  [fromCollection.collectionFeatureKey]: fromCollection.State;
}

export interface State extends fromRoot.State {
  [booksFeatureKey]: BooksState;
}

/** Provide reducer in AoT-compilation happy way */
export function reducers(state: BooksState | undefined, action: Action) {
  return combineReducers({
    [fromSearch.searchFeatureKey]: fromSearch.reducer,
    [fromBooks.booksFeatureKey]: fromBooks.reducer,
    [fromCollection.collectionFeatureKey]: fromCollection.reducer,
  })(state, action);
}
```

- The index file under `app/reducers/index.ts` defines the meta-reducers, root state, and reducers

```typescript
/**
 * Our state is composed of a map of action reducer functions.
 * These reducer functions are called with each dispatched action
 * and the current or initial state and return a new immutable state.
 */
export const ROOT_REDUCERS = new InjectionToken<
  ActionReducerMap<State, Action>
>('Root reducers token', {
  factory: () => ({
    [fromLayout.layoutFeatureKey]: fromLayout.reducer,
    router: fromRouter.routerReducer,
  }),
});
```

Personally, I like how the `example-app` is organized. One of the things that I will add is to have all the folders related to ngrx in a single folder:

```
├─ books\
│     store\
│        actions\
│            books-api.actions.ts
│            books-page.actions.ts
│            index.ts                  // Includes creating names for the exports
│        effects\
|            books.effects.spec.ts 
|            books.effects.ts 
|        models\
|            books.ts 
│        reducers\
|            books.reducer.spec.ts 
|            books.reducer.ts 
|            collection.reducer.ts 
|            index.ts 
│     
├─ reducers\
│        index.ts  /// Defines the root state and reducers
│ 
```

## Other Links

- [Avoiding swithcMap related bugs](https://ncjamieson.com/avoiding-switchmap-related-bugs/)
- [ngrx example application](https://github.com/ngrx/platform/blob/master/projects/example-app/README.md)
- [Redux toolkit](https://redux-toolkit.js.org/)
- [ngrx docs](https://ngrx.io/docs)
- [ngrx/platform: Reactive libraries for Angular](https://github.com/ngrx/platform)
- [NgRx: How and where to handle loading and error states of AJAX calls? | by Alex Okrushko | Angular In Depth | Medium](https://medium.com/angular-in-depth/ngrx-how-and-where-to-handle-loading-and-error-states-of-ajax-calls-6613a14f902d)
- [What GroupsBy in Vegas, Stays in Vegas - Mike Ryan & Sam Julien - YouTube](https://www.youtube.com/watch?v=hsr4ArAsOL4)
- [Brandon Roberts - The Facade of NgRx Facades - Angular Toronto December 2019 - YouTube](https://www.youtube.com/watch?v=OZam9fNNwSE)
