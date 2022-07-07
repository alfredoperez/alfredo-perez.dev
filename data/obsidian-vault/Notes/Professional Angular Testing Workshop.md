---
title: Professional Angular Testing Workshop
status: seed
tags:
  - angular
  - testing
  - storybook
  - cypress
  - jest
type: workshop
created: 4/26/22
updated: 5/13/22
---

> Ensure the Quality of Your Mission-Critical Angular Solutions with Jest, Cypress, and Storybook!

[Workshop Website](https://www.angulararchitects.io/en/dates/professional-angular-testing-100-online-interaktive-english/)  |  [Repo](https://github.com/rainerhahnekamp/2022-04-27-testing-public)

## Things I learned
### Prefer testing services without the 'TestBed'

### Jest CLI option for better messages

The option `detect-open-handles` in Jest to get better messages, but only use it dev because it slows build pipelines.

```shell
"test:watch": "nx test --watch --detect-open-handles",
```

### Tests with Parameters

Jest has an `it.each` to test with parameters

```TS
 it.each([
    { sentence: 'Veni vidi vici', words: 3 },
    { sentence: 'Veni  vici', words: },
    
  ])('"$sentencer" should have $words words ', ({ sentence, words }) => {

     expect (sentence.split(' '). filter ((word)   => word)). toHaveLength (words);
 }
```

### Assertions per test

As you progress in the testing pyramid it is better to include multiple assertions in a single test because it reduces the execution time.

Multiple assertions are okay as long as they are all testing one feature/behavior

Production code should be DRY, testing code can be DAMP

Rules

- Repeat yourself if necessary to make it easier to read
- Minimize logic out of tests (what will test the tests?) NEVER use a branch statement or a loop in a test

### Prefer to always use `waitForAsync` and `fakeAsync` over `done` and `await/async`

`fakeAsync` is more powerful than `waitForAsync` since you control the async tasks and runs faster.

### Types of Mocks (Test Doubles)

1. **Stub**: Replaces a dependency and it should be used when we are only interested in the output
     - When dependency returns a value
     - e.g. HTTP Request
     - Is enough in most cases
     - Test doesn't verify the stub is called      

2. **Mock**: Verifies a call to a dependency  
   - A "side-effect only" dependency
   - Usage has to be verified
   - e.g. SnackBar, Router navigation
   - Test verifies the mock is called         

3. **Spy** This should be used only when the original service or class is used and it is not getting overwritten

![https://res.cloudinary.com/dagkspppt/image/upload/v1651067999/Testing%20Workshop%202022/2022-04-27_08-59-35_dsgu96.png](https://res.cloudinary.com/dagkspppt/image/upload/v1651067999/Testing%20Workshop%202022/2022-04-27_08-59-35_dsgu96.png)

### Prefer the use of `unknown` over  `any`

Using `any` remove type safety. The `unknown` helps us when you don't know the type, but you need to verify the type before using any props in the object

```ts
 function(name:unknown){
    (name as string).trim()
 }
```

### Unit test is a good documentation tool

E.g.The angular router had good unit tests that the documentation was not needed

### Always start tests in a fail state

It is also important that not only fails, and verify that you get the correct error message because sometimes the error message is not related to what we are making it fail and helps us avoid false positives.

### Prefer to cover selector tests in integration tests

It is better to test how the selectors work when they are used in components since just testing the selectors doesn't give the bigger picture and even if they select  correctly that doesn't mean it is the data you need.

### `ComponentFixtureAutoDetect`  can be use to detect changes in a component test

```ts
TestBed.configureTestingModule({  
  declarations: [NewsletterComponent],  
  imports: [ReactiveFormsModule],  
  //                             👇
  providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }]  
});
```

You should prefer to manually detect changes. It should be used when you need to do a lot of `detectChanges`.

### Is better to declare component and manually add dependencies

It is better to declare the component in the test bed to keep the test lean and ensure that you have only the required dependencies.

```ts
TestBed.configureTestingModule({  
  //                    👇
  declarations: [NewsletterComponent],  
  imports: [ReactiveFormsModule],  

```

### You can create testing contexts with `describe`

You can create different `describe` sections with their own `TestBed`. This can be used when testing different states.
The following code shows how you can configure some of the test modules for each test:

```TS
const setup = (config: TestModuleMetadata = {}) => {  
    TestBed.configureTestingModule({  
      ...{  
        declarations: [NewsletterComponent],  
        imports: [ReactiveFormsModule],  
        providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }]  
      },  
      ...config  
    });  
    fixture = TestBed.createComponent(NewsletterComponent);  
    component = fixture.componentInstance;  
    return { component, fixture };  
  };  
});
```

### Prefer to not use `NO_ERROR_SCHEMA`

This should not be used because it ignores errors. You should either mock dependencies or inject them. You can also Mock Components.

```TS
it('should stub the components', () => {  
//                 👇
@Component({ selector: 'mat-form-field', template: '' }) class MatFormField {}

const fixture = TestBed.configureTestingModule({
    //                                     👇
	declarations: [RequestInfoComponent, MatFormField],
	imports: [ReactiveFormsModule]

  }).createComponent(RequestInfoComponent);

  fixture.detectChanges();

  expect(true).toBe(true);
});
```

### The `compileComponent` is not needed

This is added by the schematics but is not needed. Angular added for projects that dont use the ng cli for their build process.

### `it.each` can be used to test different results in a single test

```typescript
it.each([  
  //                                     👇
  { input: 'Domgasse 5', message: 'Brochure sent' },  
  //                                     👇
  { input: 'Domgasse 15', message: 'Address not found' }  
])('should show $message for $input', ({ input, message }) =>  
  fakeAsync(() => {  
    const { spectator, lookuperMock } = setup();  
  
    lookuperMock.lookup.mockImplementation((query) =>  
      scheduled([query === 'Domgasse 5'], asyncScheduler)  
    );  
  
    spectator.typeInElement(input, inputSelector);  
    spectator.click(buttonSelector);  
    spectator.tick();  
    const messageBox = spectator.query(lookupSelector);  
    
    //                              👇
    expect(messageBox).toHaveText(message);  
  })()  
);  
```

### Harnesses

Harness are like page object modules but for angular components and they can be applied to any component. If you have harnesses for ac component you dont have to worry about asynchronous.

The only drawback is that you have to develop them for a component
e.g. Creating a harness:

```TS
import { ComponentHarness } from '@angular/cdk/testing';  
import { MatButtonHarness } from '@angular/material/button/testing';  
import { MatInputHarness } from '@angular/material/input/testing';  
  
export class RequestInfoComponentHarness extends ComponentHarness {  
  static hostSelector = 'app-request-info';  
  // NOTE: This is when not  using material harnesses  
  // protected getInput = this.locatorFor('[data-testid=address]');  protected getInput = this.locatorFor(MatInputHarness);  
  // NOTE: This is when not  using material harnesses  
  // protected getButton = this.locatorFor('[data-testid=btn-search]');  // protected getButton = this.locatorFor(MatButtonHarness);  protected getButton = this.locatorFor(  
    MatButtonHarness.with({ selector: '[data-testid=btn-search]' })  
  );  
  
  protected getLookupResult = this.locatorFor('[data-testid=lookup-result]');  
  
  async search(): Promise<void> {  
    const button = await this.getButton();  
    return button.click();  
  }  
  
  async writeAddress(address: string): Promise<void> {  
    const input = await this.getInput();  
  
    // NOTE: This is when not  using material harnesses  
    // await input.clear();    // return input.sendKeys(address);  
    return input.setValue(address);  
  }  
  
  async getResult(): Promise<string> {  
    const p = await this.getLookupResult();  
    return p.text();  
  }  
}
```

Using it in a test:

```TS
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';  
import { TestBed } from '@angular/core/testing';  
import { NoopAnimationsModule } from '@angular/platform-browser/animations';  
import { asyncScheduler, scheduled } from 'rxjs';  
import { AddressLookuper } from '../../shared/address-lookuper.service';  
import { RequestInfoComponent } from './request-info.component';  
import { RequestInfoComponentHarness } from './request-info.component.harness';  
import { RequestInfoComponentModule } from './request-info.component.module';  
  
describe('Request Info Component', () => {  
  it('should find an address', async () => {  
    const lookuper = {  
      lookup: (query: string) => scheduled([query === 'Domgasse 5'], asyncScheduler)  
    };  
  
    const fixture = TestBed.configureTestingModule({  
      imports: [NoopAnimationsModule, RequestInfoComponentModule],  
      providers: [{ provide: AddressLookuper, useValue: lookuper }]  
    }).createComponent(RequestInfoComponent);  
  
    const harness = await TestbedHarnessEnvironment.harnessForFixture(  
      fixture,  
      RequestInfoComponentHarness  
    );  
  
    // use harness here to set the queries and submit  
    await harness.writeAddress('Domgasse 5');  
    await harness.search();  
    expect(await harness.getResult()).toBe('Brochure sent');  
  });  
});
```

You can also access component harness in components without a harness. This can be useful if you create harnesses  for a component library but not for the pages.

### Unit Test vs Integration Tests

![https://res.cloudinary.com/dagkspppt/image/upload/v1651160025/Testing%20Workshop%202022/2022-04-28_10-32-45_y8hyvc.png](https://res.cloudinary.com/dagkspppt/image/upload/v1651160025/Testing%20Workshop%202022/2022-04-28_10-32-45_y8hyvc.png)

#### Unit test Disadvantages

- Refactoring is expensive because when you have to refactor it doesn't give you a safety net since it might be a completely new implementation and the original test is gone.
- Unit test requires a lot of mocking.

#### Integration Test disadvantages

- They require a lot of setup

> It is not Unit vs Integration. It is about the right balance

### Criteria for choosing a test strategy

Speed, (Execution, writing & maintaining, CI & local setup), timing, industry, effectiveness and application type

[(2) Kent C. Dodds 💿 on Twitter: ""The Testing Trophy" 🏆  ](https://twitter.com/kentcdodds/status/960723172591992832)

> "The Testing Trophy"
> A general guide for the **return on investment** of theds to testing JavaScript applications.
> End to end w/ Cypress [@Cypress_io](https://twitter.com/Cypress_io
> Integration & Unit w/[@fbjest](https://twitter.com/fbjest)
> Static w/[@flowtype](https://twitter.com/flowtype) and [@geteslint](https://twitter.com/geteslint)

### Trust your instincts

- "It doesn't feel right"

- "What are we actually testing here? If a function is called? Really?!"

Code coverage is not a code quality it is a code quantity...you can use Striker to test quality.
e.g. testing a dispatch of an action is not worth it since that can be covered in an integration test

- "I don't see any value in testing."

- "I never discovered a bug with my tests."

-  "I am wasting my time with writing tests instead of producing "real" code."

### Integration test should be added as you go and leave E2E to the end

### Cypress Goodies

- lodash: `Cypress._`
- jQuery: `Cypress.$`
- Uses Mocha and Chai
  - Not Jest
  - Very similar commands

### Page object model Vs commands

The problem with commands is that you can overload the `cy` a lot. to avoid this you can create cypress commands only for the commands used in your command library and Page Object Model for pages.

how much logic should the Page Object Model have?
You can also use the harnesses from angular!

e.g of Page Object Model

```TS
class Sidemenu {
  click(name: "Customers" | "Holidays"): Chainable {

    cy.get("mat-drawer a").contains(name).click();
  }

}
export const sidemenu = new Sidemenu();
```

## Recommended Libraries

### Jest Auto Spies

[jest-auto-spies - npm](https://www.npmjs.com/package/jest-auto-spies/v/1.2.1)

Easy and type safe way to write spies for jest tests, for both sync and async (promises, Observables) returning methods.

```TS
import { MyService } from './my-service';
import { Spy, createSpyFromClass } from 'jest-auto-spies';

let serviceUnderTest: MyService;

//                 👇
let apiServiceSpy: Spy<ApiService>;

beforeEach(() => {
  TestBed.configureTestingModule({
    providers: [
      MyService,
      //                                       👇
      { provide: ApiService, useValue: createSpyFromClass(ApiService) },
    ],
  });

  serviceUnderTest = TestBed.inject(MyService);

  //                             👇
  apiServiceSpy = TestBed.inject<any>(ApiService);
});
```

### Observer Spy

[@hirez_io/observer-spy - npm](https://www.npmjs.com/package/@hirez_io/observer-spy)

This library makes RxJS Observables testing easy!
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
 it('should return a book.SearchComplete, with the books, on success, after the de-bounce', 
	//  👇
	fakeTime((flush) => {
	
        const book1 = { id: '111', volumeInfo: {} } as Book;
        const book2 = { id: '222', volumeInfo: {} } as Book;
        const books = [book1, book2];

        actions$ = of(FindBookPageActions.searchBooks({ query: 'query' }));
        googleBooksService.searchBooks = jest.fn(() => of(books));

        //                    👇
        const effectSpy = subscribeSpyTo(effects.search$());

        flush();
        
        expect(effectSpy.getLastValue()).toEqual(
          BooksApiActions.searchSuccess({ books })
        );
      })
    );
```

### ng-mocks

```TS
it('should stub the components', () => {
  const fixture = TestBed.configureTestingModule({
     //                                       👇
	declarations: [RequestInfoComponent, MockComponent(MatFormField)],
    imports: [ReactiveFormsModule]
  }).createComponent(RequestInfoComponent);

  fixture.detectChanges();

  expect(true).toBe(true);
});
```

### Playwright

Use Playwright with Cypress to take screenshots
[Screenshots | Playwright](https://playwright.dev/docs/screenshots)

```TS
// playwright.config.ts  
import { PlaywrightTestConfig, devices } from '@playwright/test';  
  
const config: PlaywrightTestConfig = {  
  projects: [  
    {      name: 'Chrome Stable',  
      use: {  
        browserName: 'chromium',  
        channel: 'chrome'  
      }  
    },  
    {  
      name: 'Desktop Safari',  
      use: {  
        browserName: 'webkit',  
        viewport: { width: 1200, height: 750 }  
      }    },  
    {  
      name: 'Mobile Chrome',  
      use: devices['Pixel 5']  
    },  
    {  
      name: 'Desktop Firefox',  
      use: {  
        browserName: 'firefox',  
        viewport: { width: 800, height: 600 }  
      }    }  ]};  
export default config;
```

## Helper Functions and Libraries

### `assertType`

```TS
/**  
 * Helper method to return an object as a type and avoid using the `as T` 
 * 
 * @param object - the object to be asserted   
 */  
export function assertType<T>(object: unknown = undefined): T {  
  return object as T;  
}
```

This can be used as follows:

```ts
const httpClient = { get: jest.fn() };  
httpClient.get.mockReturnValue(of([]));  
  
const lookuper = new AddressLookuper(assertType<HttpClient>(httpClient));

```

### Spectator

Spectator helps you get rid of all the boilerplate grunt work, leaving you with readable, sleek and streamlined unit tests.
[@ngneat/spectator - npm](https://www.npmjs.com/package/@ngneat/spectator)

Spectator is good for mocking

```ts
it('should emit the $event on click', () => {
  let output;
  spectator.output('click').subscribe(result => (output = result));

  spectator.component.onClick({ type: 'click' });
  expect(output).toEqual({ type: 'click' });
});
```

### Testing Library

Simple and complete testing utilities that encourage good testing practices. Built-in selectors find elements the way users do to help you write inclusive code
[Testing Library](https://testing-library.com/)

```TS
import {render, screen, fireEvent} from '@testing-library/angular'
import {CounterComponent} from './counter.component.ts'

describe('Counter', () => {
  test('should render counter', async () => {
    await render(CounterComponent, {
      componentProperties: {counter: 5},
    })

    expect(screen.getByText('Current Count: 5')).toBeInTheDocument()
  })

  test('should increment the counter on click', async () => {
    await render(CounterComponent, {
      componentProperties: {counter: 5},
    })

    fireEvent.click(screen.getByText('+'))

    expect(screen.getByText('Current Count: 6')).toBeInTheDocument()
  })
})
```

![https://res.cloudinary.com/dagkspppt/image/upload/v1651154436/Testing%20Workshop%202022/2022-04-28_09-00-15_phfhkj.png](https://res.cloudinary.com/dagkspppt/image/upload/v1651154436/Testing%20Workshop%202022/2022-04-28_09-00-15_phfhkj.png)

### Stryker

Mutation testing can be used to test code quality.
[Stryker Mutator · Test your tests with mutation testing.](https://stryker-mutator.io/)

## Resources
- [Video about when to use TestBed  from Joe Eames](https://www.youtube.com/watch?v=7JucMlrs3dQ)
- [Testable Architecture in Angular | Rainer Hahnekamp | Reliable Web Summit 2021 - YouTube](https://www.youtube.com/watch?v=pAmdyvJ5VNY)
- [Getting Started with Cypress Component Testing (React)](https://www.cypress.io/blog/2021/04/06/cypress-component-testing-react/)
- [ui-testing-best-practices/cypress-and-storybook.md at master · NoriSte/ui-testing-best-practices](https://github.com/NoriSte/ui-testing-best-practices/blob/master/sections/tools/cypress-and-storybook.md)
- [Cypress + Storybook 2.0](https://www.cypress.io/blog/2021/05/19/cypress-x-storybook-2-0/)
- [Professional Testing Workshop - 2022-04-27 - YouTube](https://www.youtube.com/playlist?list=PLu062eICIOdE7z1LGDFzvJ9HBDf-AeFEJ)


