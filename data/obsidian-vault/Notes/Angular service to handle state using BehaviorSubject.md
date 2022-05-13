---
title: Angular service to handle state using BehaviorSubject
description:
tags: 
- angular
- rxjs
- state-managment
type: note
status: evergreen
created: 5/25/20
updated:
---

Created an abstract service to keep state and handle communication between components and services.

The service uses the `BehaviorSubject` from RxJS, and have some nice features like auto-completion and being able to get either a snapshot or an observable with the value.

## How to use it?

Create a new service extending the `PlainStoreService` and passing the model of the state.  

```ts
// Service
@Injectable({providedIn: 'root'})
export class UserEditStore extends PlainStoreService<UserEditState> {

   constructor() {
      super();
      const initialState: UserEditState = {
         user:null,
         isLoading: false,
         isDirty: false,
         isSaving: false
      };
      this.state = new BehaviorSubject<UserEditState>(initialState);
   }
}
```

Now, you will be able to inject the service wherever is needed and use it.

The service has the following methods:

-   _select_ - Returns an observable for a property on the store.
-   _selectSnapshot_ - Gets the current state of a property
-   _set_ - Set a new value for a single property
-   _setState_ - Sets values for multiple properties on the store

Here is the service:  

```ts
import { BehaviorSubject, Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

/**
 * Plain Store Service.
 * This is intended to be used to enable communication between components
 * and it should be just in cases where there are not too many states shared between them.
 */
export class PlainStoreService<T> {

    protected state: BehaviorSubject<T>;

    constructor() {
    }

    /**
     * Returns an observable for a property on the store.
     * This is used when the consumer needs the stream of changes
     * for the property observed.
     *
     * @param key - the key of the property to be retrieved
     */
    public select<K extends keyof T>(key: K): Observable<T[K]> {
        return this.state.asObservable().pipe(pluck(key));
    }

    /**
     * Gets the current state of a property.
     * This is used when the consumer needs just the current state
     *
     * @param key - the key of the property to be retrieved
     */
    public selectSnapshot<K extends keyof T>(key: K): T[K] {
        return this.state.getValue()[key];
    }

    /**
     * This is used to set a new value for a property
     *
     * @param key - the key of the property to be retrieved
     * @param data - the new data to be saved
     */
    public set<K extends keyof T>(key: K, data: T[K]) {
        this.state.next({ ...this.state.value, [key]: data });
    }

    /**
     * Sets values for multiple properties on the store
     * This is used when there is a need to update multiple properties in the store
     *
     * @param partialState - the partial state that includes the new values to be saved
     */
    public setState(partialState: Partial<T>): void {

        const currentState = this.state.getValue();
        const nextState = Object.assign({}, currentState, partialState);

        this.state.next(nextState);
    }

}

```

Here is the testing file for the service:  

```ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PlainStoreService } from './plain-store.service';

class MockedStore {
  name: string;
  isEnabled: boolean;
}

@Injectable({providedIn: 'root'})
class MockedStoreService extends PlainStoreService<MockedStore> {

  constructor() {
    super();
    this.state = new BehaviorSubject<MockedStore>(
      {
        name: 'test',
        isEnabled: false
      });
  }
}

describe('PlainStoreService', () => {

  const service = new MockedStoreService();

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('select', () => {

    it('should return an observable with the value of the provided key', (done) => {
      service.select('name').subscribe((name) => {
        expect(name).toEqual('test');
        done();
      });
    });

  });

  describe('selectSnapshot', () => {

    it('should return the value of the provided key', () => {
      const name = service.selectSnapshot('name');
      expect(name).toEqual('test');
    });

  });

  describe('set', () => {
    it('should set a new value for a key', () => {
      const newName = 'newValue';

      service.set('name', newName);

      const name = service.selectSnapshot('name');
      expect(name).toEqual(newName);
    });
  });

  describe('setState', () => {
    it('should set a new value for the whole state', () => {
      const newName = 'newValue';
      const newIsEnabled = true;

      service.setState(
        {
          name: newName,
          isEnabled: newIsEnabled
        });

      const name = service.selectSnapshot('name');
      const isEnabled = service.selectSnapshot('isEnabled');

      expect(name).toEqual(newName);
      expect(isEnabled).toBeTruthy();
    });
  });
});
```
