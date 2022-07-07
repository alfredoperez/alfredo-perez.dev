---
title: Creating a NextJS Project using TurboRepo
description: null
tags:
  - turborepo
  - monorepo
  - nextjs
type: note
status: evergreen
created: 7/04/22
updated: 7/04/22
---
## Note
This is not a tutorial! Theses are just the steps I followed while working in a side-project.

---
The first thing is to create the project using TurboRepo. Here is a guide on how to [Get Started with Turborepo](https://turborepo.org/docs/getting-started)

1. Create the project

```shell
npx create-turbo@latest
```

2. Select PNPM as the package manager

```shell
>>> TURBOREPO

>>> Welcome to Turborepo! Let's get you set up with a new codebase.

? Where would you like to create your turborepo? code-machina
? Which package manager do you want to use? pnpm

>>> Creating a new turborepo with the following:

 - apps/web: Next.js with TypeScript
 - apps/docs: Next.js with TypeScript
 - packages/ui: Shared React component library
 - packages/eslint-config-custom: Shared configuration (ESLint)
 - packages/tsconfig: Shared TypeScript `tsconfig.json`
```

3. Remove `apps/docs` and execute `pnpm install` to remove reference to the app in the lock file

4. Go to [vercel](https://vercel.com/) and initialize the repo

5. Configure the deployment using this [guide](https://vercel.com/docs/concepts/monorepos/turborepo)
   - Set the root directory to `apps/web`
   - Set the Build Command to `cd ../.. && npx turbo run build --scope=web --include-dependencies --no-deps`
   -

Here is a link to the commit: <https://github.com/alfredoperez/code-machina/commit/784d8b7239092f98cf133a4fa185762d0ba74dbe>
