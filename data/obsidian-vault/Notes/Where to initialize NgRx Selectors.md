---
title: Where to initialize NgRx Selectors
description: null
tags:
  - angular
  - ngrx
type: note
status: evergreen
created: 3/09/21
updated: 6/26/22
---

When using the selector in the component, it is recommended  to initialize them in the declaration or  in the constructor p.

```ts
export class FindBookPageComponent {
  searchQuery$: Observable<string>;
 
  books$: Observable<Book[]>  = store.pipe(select(fromBooks.selectSearchResults));
  loading$: Observable<boolean>;
  error$: Observable<string>;

  constructor(private store: Store<fromBooks.State>) {
    this.searchQuery$ = store.pipe(
      select(fromBooks.selectSearchQuery),
      take(1)
    );

    this.loading$ = store.pipe(select(fromBooks.selectSearchLoading));
    this.error$ = store.pipe(select(fromBooks.selectSearchError));
  }

  search(query: string) {
    this.store.dispatch(FindBookPageActions.searchBooks({ query }));
  }
}
```

## Angular Type Safety

Initializing in the constructor helps because when using the **strict mode in TypeScript**, the compiler will not be able to know that the selectors were initialized on `ngOnInit`

The strictPropertyInitialization was added by default in the `--strict` mode in Angular 9.

The following checks where also added:

```json
{
  "//": "tsconfig.json",
  "compilerOptions": {
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noImplicitThis": true,
    "noFallthroughCasesInSwitch": true,
    "strictNullChecks": true
  }
}
```

> The strict-mode allows us to write much safe and robust application. Honestly, I think all Angular application should be written in strict-mode, but it is a little hard to understand every error messages caused by the compiler.

---

## References

- Angular 9 Strict Mode [here](https://indepth.dev/a-look-at-major-features-in-the-angular-ivy-version-9-release/#strict-mode)
- Angular Type safety [here] (<https://medium.com/lacolaco-blog/guide-for-type-safe-angular-6e9562499d93>)
- Strict Property Initialization in TypeScript [here](https://mariusschulz.com/articles/strict-property-initialization-in-typescript)
