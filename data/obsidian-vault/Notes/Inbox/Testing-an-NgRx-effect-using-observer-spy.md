---
title: Testing an NgRx effect using observer-spy
description:
tags: ["angular","testing","ngrx"]
type: note
status: evergreen
created: 3/09/21
updated: 3/9/21
---

Have you try the[observer-spy](https://github.com/hirezio/observer-spy) library by [Shai Reznik](https://twitter.com/shai_reznik)?

It particularly makes testing ngrx effects an easy task and keeps them readable. 

To demonstrate this, I refactored the tests from `book.effects.spec.ts` from the ngrx example application, and here are the differences... 

## Testing the success path

Using marbles:

```typescript
 it('should return a book.SearchComplete, with the books, on success, after the de-bounce', () => {
    const book1 = { id: '111', volumeInfo: {} } as Book;
    const book2 = { id: '222', volumeInfo: {} } as Book;
    const books = [book1, book2];
    const action = FindBookPageActions.searchBooks({ query: 'query' });
    const completion = BooksApiActions.searchSuccess({ books });

    actions$ = hot('-a---', { a: action });
    const response = cold('-a|', { a: books });
    const expected = cold('-----b', { b: completion });
    googleBooksService.searchBooks = jest.fn(() => response);

    expect(
      effects.search$({
        debounce: 30,
        scheduler: getTestScheduler(),
      })
    ).toBeObservable(expected);
  });
```

Using observer-spy:
```typescript
 it('should return a book.SearchComplete, with the books, on success, after the de-bounce', fakeTime((flush) => {
        const book1 = { id: '111', volumeInfo: {} } as Book;
        const book2 = { id: '222', volumeInfo: {} } as Book;
        const books = [book1, book2];

        actions$ = of(FindBookPageActions.searchBooks({ query: 'query' }));
        googleBooksService.searchBooks = jest.fn(() => of(books));

        const effectSpy = subscribeSpyTo(effects.search$());

        flush();
        expect(effectSpy.getLastValue()).toEqual(
          BooksApiActions.searchSuccess({ books })
        );
      })
    );
```
## Testing the error path

Using marbles:

```typescript
  it('should return a book.SearchError if the books service throws', () => {
      const action = FindBookPageActions.searchBooks({ query: 'query' });
      const completion = BooksApiActions.searchFailure({
        errorMsg: 'Unexpected Error. Try again later.',
      });
      const error = { message: 'Unexpected Error. Try again later.' };

      actions$ = hot('-a---', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('-----b', { b: completion });
      googleBooksService.searchBooks = jest.fn(() => response);

      expect(
        effects.search$({
          debounce: 30,
          scheduler: getTestScheduler(),
        })
      ).toBeObservable(expected);
    });
```

Using observer-spy:
```typescript
 it('should return a book.SearchError if the books service throws', fakeTime((flush) => {
        const error = { message: 'Unexpected Error. Try again later.' };
        actions$ = of(FindBookPageActions.searchBooks({ query: 'query' }));
        googleBooksService.searchBooks = jest.fn(() => throwError(error));

        const effectSpy = subscribeSpyTo(effects.search$());

        flush();
        expect(effectSpy.getLastValue()).toEqual(
          BooksApiActions.searchFailure({
            errorMsg: error.message,
          })
        );
      })
    );
```
## Testing when the effect does not do anything

Using marbles:

```typescript
   it(`should not do anything if the query is an empty string`, () => {
      const action = FindBookPageActions.searchBooks({ query: '' });

      actions$ = hot('-a---', { a: action });
      const expected = cold('---');

      expect(
        effects.search$({
          debounce: 30,
          scheduler: getTestScheduler(),
        })
      ).toBeObservable(expected);
    });
```

Using observer-spy:
```typescript
 it(`should not do anything if the query is an empty string`, fakeTime((flush) => {
        actions$ = of(FindBookPageActions.searchBooks({ query: '' }));

        const effectSpy = subscribeSpyTo(effects.search$());

        flush();
        expect(effectSpy.getLastValue()).toBeUndefined();
      })
```
You can find the working test here: 

https://github.com/alfredoperez/ngrx-observer-spy/blob/master/projects/example-app/src/app/books/effects/book.effects.spec.ts

What do you think? Which one do you prefer?
