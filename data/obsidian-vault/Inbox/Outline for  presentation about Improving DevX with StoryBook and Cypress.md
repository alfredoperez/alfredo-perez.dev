---
title: Outline for presentation about Improving DevX with StoryBook and Cypress
description: null
tags:
  - cypress
  - angular
  - devx
type: note
status: seed
created: 6/27/22
updated: 6/28/22
---

## Submitted CFP

After this talk, the public will walk out knowing:

- How/Why to use StoryBook for code and UX reviews
- How to use documentation in StoryBook, so it is helpful for all stakeholders and not only developers
- The creation of Angular Modules and components to enhance StoryBook
- How/why to use StoryBook in integration tests
- How and where to mock APIs for Cypress integration tests.

The use of StoryBook and Cypress improves DevX because:

- Well documented components and libraries
- Better code and UX/UI reviews
- Easier Integration tests

## Outline

- Intro
- Problem
	- We had an environment with close to > 90% test coverage and with lots of selenium tests
	- The big problem is that:
		- Hard to setup
		- Flaky tests ... solved by a bunch of waits
		- Hard to debug
- Solution
	- Use StoryBook + Cypress to replace E2E for Integration Tests
- StoryBook
	- How we use it
		- Develop 
		- Document 
		- Demonstrate 
	-  TIPS
		- How we document?
			- Create MDX file for documentation
			- Create Story files to represent states
		- Create WebComponents for MDX files
		- Create a `StoryBookSharedModule`
		- Create custom component for demos
		- Go from simple to complex
			- default/basic -> Demo wrappers
		- Create an API Interceptor (Another Article)
- Cypress
	- How we go about Integration tests
		- Use the component states as starting point
	- TIPS
		- Create Cypress Commands to use StoryBook (Another Article)
		- Screenshots
			- Create Angular Module to standardize scrollbars and fonts for screenshot tests
			- Create utility function to execute tests in all stories
		- Mocks
			- Use stories without intercepting any request
			- Disable StoryBook Interceptor
- Conclusion
	- Happier Developers
	- Tests are easier to setup and troubleshoot
