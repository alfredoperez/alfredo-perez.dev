---
title: Testing Web Apps with Cypress
authors: ["Steve Kinney"]
status: seed
tags: ["cypress", "testing"]
type: workshop
created: 3/18/22
updated:
---

Repository : https://github.com/stevekinney/cypress
Course: https://frontendmasters.com/courses/cypress

- Integration test should be more holistic since it takes time to load the page, so it is better to test a bunch of things or a user flow in a single test, instead of having multiple tests.
- You can use `it.only` to run a single test and `it.skip` to...skip
- Can use `expect` for things that are testing with the jQuery selectors. .e.g.
```ts
cy.get('[data-test="items"] li') .eac/i(($item) => {
    expect($item. text()).to.include^ 'Tooth*);
});
```

## Aliases
 Aliases can easily reference objects like DOM nodes, fixture data, or network requests in tests. The "as" method is used to create an alias. When aliases are used in a selector, they are prefixed with the `@`   symbol.
```TS
cy.get('[data-test="items-unpacked"]').as('unpackedItems');

cy.get('@unpackedItems').find('label').first().as('firstItem');
cy.get('@firstItem').find('input[type="checkbox"]').click();
```

## Form Validation
You can get the `props` of the HTML Element to test some of the validation
```ts
cy.get( '@email ’ )
 .invoke('prop', 'validationMessage')
 .should('contain', "Please include an '5)' in the email address.");
```

## Commands
- This is a parent command 
`Cypress.Commands.add('login', (email, password) => { ... })`
- This is a child command
`Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })`
- This is a dual command
`Cypress.Commands.add('dismiss', { prevSubject: 'optional '}, (subject, options) => { ... }`
- This will overwrite an existing command
`Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

> [!NOTE]
> Test need to be explicit even if it stops being DRY. You don't need abstractions to troubleshoot or create tests, but if you have a set of  things that the test does over and over you can create a `Cypress.Command`

