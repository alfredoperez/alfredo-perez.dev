---
title: Creating an app with Tailwind, NextJS, and nrwl Nx
tags:
  - nextjs
  - react
type: note
status: evergreen
created: 4/16/22
updated: 5/13/22
---

This is based on the following [article](https://blog.nrwl.io/create-a-next-js-web-app-with-nx-bcf2ab54613). Please check it out if you want to see the full version and with explanations.

The purpose of this note is to just highlight the steps I took because there are some things that were updated and are easier to install.

## Create the project

Install NX globally

```shell
npm install -g nx
```

Create the new project using PNPM

```shell
npx create-nx-workspace alacarta.dev --packageManager=pnpm
```

Then I choose the following options:

```
✔ What to create in the new workspace · next
✔ Application name                    · site
✔ Default stylesheet format           · css
✔ Use Nx Cloud? (It's free and doesn't require registration.) · No
```

I have the  [Nx Console Idea](https://plugins.jetbrains.com/plugin/15101-nx-console-idea) plugin in  WebStorm and thanks to it I can now run the app and all NX tasks from it.

## Creating some pages

The `About` page:

```shell
npx nx generate @nrwl/next:page --name=about --style=css
```

Add the following to the `about/index.ts`:

```ts
import { GetStaticProps } from 'next';  
import './index.module.css';  
  
export interface AboutProps {  
    name: string;  
}  
  
export function About(props: AboutProps) {  
    return (  
        <div>  
            <h1>Welcome, {props.name}!</h1>  
        </div>  
    );  
}  
  
export const getStaticProps: GetStaticProps<AboutProps> = async (context) => {  
    return {  
        props: {  
            name: 'Alfredo',  
        },  
    };  
};  
  
export default About;
```

The `Articles` page:

```shell
nx generate [@nrwl/next](http://twitter.com/nrwl/next):page --name="[slug]" --style=none --directory=articles
```

## Installing Tailwind

Install Tailwind Dependencies

```shell
pnpm install tailwindcss@latest postcss@latest autoprefixer@latest
```

Initialize Tailwind by going to the app folder and then running

```shell
npx tailwindcss init -p
```

Adjust the `postcss.config.js` as follows

```Typescript

const { join } = require('path');

module.exports = {
	plugins: { 
		tailwindcss: { config: join(__dirname, 'tailwind.config.js'), },
		 autoprefixer: {}, 
	 },
};
```

Import Tailwind CSS Styles into the styles.css file

```css
@tailwind components;
@tailwind base;
@tailwind utilities;
```

### Add Typography

Install library

```shell
pnpm add @tailwindcss/typography
```

Create file `tailwind-workspace-preset.js` and add:

```js
module.exports = {  
    theme: {  
        extend: {},  
    },  
    variants: {  
        extend: {},  
    },  
    plugins: [require('@tailwindcss/typography')],  
};
```

Update `tailwind.config.js` to purge css

```js
const { createGlobPatternsForDependencies } = require('@nrwl/next/tailwind');  
const { join } = require('path');  
  
module.exports = {  
  mode:'jit',  
  presets: [require('../../tailwind-workspace-preset.js')],  
  content: [  
    join(__dirname, 'pages/**/*.{js,ts,jsx,tsx}'),  
    ...createGlobPatternsForDependencies(__dirname),  
  ],  darkMode: 'media', // or 'media' or 'class'  
  theme: {  
    extend: {},  
  },  variants: {  
    extend: {},  
  },  plugins: [],  
};
```

### Enabling Tailwind JIT

Modify the `apps/site/tailwind.config.js`  config file

```js
module.exports = {

mode: 'jit',

...

};
```

## Read and render MD files with Next.js and Nx

Install dependencies

```shell
 pnpm add gray-matter next-mdx-remote@3.08
```

Create library to handle markdown

```shell
npx nx generate @nrwl/workspace:lib --name=markdown
```

Adjust the Nx workspace library `libs/markdown/src/tsconfig.lib.json` to add `node` to the `types` array as well as adding `allowSyntheticDefaultImports`

```json
{
	"extends":** "./tsconfig.json", 
	"compilerOptions":{ 
		...  
		"allowSyntheticDefaultImports": true,
		"types":["node"]  
	},  
...  
}
```

Modify the `articles/[slug].tsx` with:

```ts
/* eslint-disable-next-line */  
import { getParsedFileContentBySlug, renderMarkdown } from "@alacarta.dev/markdown";  
import { readdirSync } from "fs";  
import { GetStaticPaths, InferGetStaticPropsType } from "next";  
import { join } from "path";  
import { ParsedUrlQuery } from "querystring";  
import { MDXRemote } from "next-mdx-remote";  
  
interface ArticleProps extends ParsedUrlQuery {  
    slug: string;  
}  
const mdxElements = {  
    // Youtube:dynamic(async () => await import('@apdev/shared/mdx-elements/youtube/youtube')),  
    // a:  CustomLink}  
  
export function Article({frontMatter, html}: InferGetStaticPropsType<typeof getStaticProps>) {  
    return (  
        <div className="m-6">  
            <article className="prose prose-lg">  
                <h1>{frontMatter.title}</h1>  
                <div>by {(frontMatter.author as any).name}</div>  
            </article>  
            <hr/>  
            <MDXRemote {...html}  components={mdxElements}  />  
        </div>  
    );  
}  
  
export const getStaticProps = async ({params,}: {  
    params: ArticleProps;  
}) => {  
  
    /// 1. Parse the content of our markdown separate it into frontmatter and content  
    const {frontMatter,content} = getParsedFileContentBySlug(params.slug, POSTS_PATH);  
  
    // 2. convert markdown content to HTML  
    const renderHTML = await renderMarkdown(content);  
  
    return {  
        props: {  
            frontMatter,  
            html:renderHTML,  
        },  
    };  
};  
  
  
const POSTS_PATH = join(process.cwd(), process.env.POSTS_PATH);  
export const getStaticPaths: GetStaticPaths<ArticleProps> = async () => {  
    const paths = readdirSync(POSTS_PATH)  
        .map(path => path.replace(/\.mdx?$/,''))  
        .map(slug => ({params:{slug}}))  
  
    return {  
        paths,  
        fallback: false,  
    };  
};  
  
  
export default Article;
```

## Component hydration with MDX in Next.js and Nx

Generate a Youtube Component

```shell
npx nx g @nrwl/react:lib mdx-elements --directory=shared --style=css
npx nx g @nrwl/react:component --name**=**Youtube --project=shared-mdx-elements --no-interactive
```

In the youtube component, remove the css file in and  add the following

```ts
  
/* eslint-disable-next-line */  
export interface YoutubeProps {  
    title:string;  
    uid:string;  
}  
  
export function Youtube({uid,title}: YoutubeProps) {  
  return (  
    <div>  
        <iframe src={`https://www.youtube.com/embed/${uid}`}  
               width="100%"  
                height="500px"  
                title={title}>  
  
        </iframe>  
    </div>  
  );  
}  
  
export default Youtube;
```

Add the Custom Link Component:

```shell
npx nx generate @nrwl/react:component --name=CustomLink --project=shared-mdx-elements --style=css
```

Remove the css file and add the following to the component:

```ts
import Link from 'next/link';  
import './custom-link.module.css';  
  
export interface CustomLinkProps {  
    as: string;  
    href: string;  
}  
  
export function CustomLink({ as, href, ...otherProps }: CustomLinkProps) {  
    return (  
        <Link as={as} href={href}>  
            <a className="bg-yellow-100" {...otherProps} />  
        </Link>  
    );}  
  
export default CustomLink;
```

Create `libs/shared/mdx-elements/src/lib/mdx-elements.ts` to hold all the components to render MDX

```ts
import { MdxRemote } from 'next-mdx-remote/types';  
import dynamic from 'next/dynamic';  
  
import { CustomLink } from './custom-link/custom-link';  
  
export const mdxElements: MdxRemote.Components = {  
    a: CustomLink,  
    Youtube: dynamic(() => import('./youtube/youtube')),  
};
```

Export it from the index file:

```ts
export * from './lib/mdx-elements';
```

Change the import in the articles to:

```ts
import { mdxElements } from "@alacarta.dev/shared/mdx-elements";


<MDXRemote {...html} components={mdxElements} />
```

## Hot Reload MDX changes in Next.js and Nx

Install `next-remote-watch`

```shell
pnpm add next-remote-watch
```

Add the following file `next-watch-server/next-watch-server.ts`

```ts
import { NextServer } from 'next/dist/server/next';  
import { NextServerOptions, ProxyConfig } from '@nrwl/next';  
  
const express = require('express');  
const path = require('path');  
const chokidar = require('chokidar');  
  
export default async function nextWatchServer(  
    app: NextServer,  
    settings: NextServerOptions & { [prop: string]: any },  
    proxyConfig: ProxyConfig  
) {  
    const handle = app.getRequestHandler();  
    await app.prepare();  
  
    const postsPath = process.env.POSTS_PATH;  
  
    // watch folders if specified  
    if (postsPath) {  
        chokidar  
            .watch(postsPath, {  
                usePolling: false,  
                ignoreInitial: true,  
            })  
            .on('all', async (filePathContext, eventContext = 'change') => {  
                // CAUTION: accessing private APIs  
                app['server']['hotReloader'].send('building');  
                app['server']['hotReloader'].send('reloadPage');  
            });  
    }  
  
    const server = express();  
    server.disable('x-powered-by');  
  
    // Serve shared assets copied to `public` folder  
    server.use(  
        express.static(path.resolve(settings.dir, settings.conf.outdir, 'public'))  
    );  
  
    // Set up the proxy.  
    if (proxyConfig) {  
        // eslint-disable-next-line @typescript-eslint/no-var-requires  
        const proxyMiddleware = require('http-proxy-middleware');  
        Object.keys(proxyConfig).forEach((context) => {  
            server.use(proxyMiddleware(context, proxyConfig[context]));  
        });  
    }  
  
    // Default catch-all handler to allow Next.js to handle all other routes  
    server.all('*', (req, res) => handle(req, res));  
  
    server.listen(settings.port, settings.hostname);  
}

```

Add to `apps/site/project.json` the `customServerPath`

```json
 "serve": {
	  "executor": "@nrwl/next:server",
	  "options": {
		"buildTarget": "site:build",
		"dev": true,
		"customServerPath": "../../tools/next-watch-server/next-watch-server.ts"
	   },
}
```

## Generate a new library to host our page UI components

``` next-remote-watch
npx nx g @nrwl/react:lib ui --directory=shared --style=css
```

Create a `Layout` component

``` next-remote-watch
npx nx g @nrwl/react:component layout --project=shared-ui --style=css

✔ Should this component be exported in the project? (y/N) · true
```

Add StoryBook

``` next-remote-watch
npx nx generate @nrwl/react:storybook-configuration --name=shared-ui --cypressDirectory=storybook-e2e

✔ Configure a cypress e2e app to run against the storybook instance? (Y/n) · true
✔ Automatically generate *.stories.ts files for components declared in this project? (Y/n) · true
✔ Automatically generate *.spec.ts files in the Cypress E2E app generated by the cypress-configure generator? (Y/n) · true
```

Launch StoryBook with

```shell
npx nx storybook shared-ui
```

Setup Storybook to use Tailwind

```shell
cd libs/shared/ui  
npx tailwindcss init -p
```

Adjust the `tailwind.config.js`

```js
// libs/shared/ui/tailwind.config.js

const { createGlobPatternsForDependencies } = require('@nrwl/next/tailwind');
const { join } = require('path');

module.exports = {
  presets: [require('../../../tailwind-workspace-preset.js')],
  purge: [
    join(__dirname, '../src/**/*.{js,ts,jsx,tsx}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
```

Adjust the `postcss.config.js`

```js
// libs/shared/ui/postcss.config.js

const { join } = require('path');

module.exports = {
  plugins: {
    tailwindcss: {
      config: join(__dirname, 'tailwind.config.js'),
    },
    autoprefixer: {},
  },
};
```

Create a new file  `libs/shared/ui/.storybook/tailwind-imports.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Import it into StoryBook

```js
 //preview.js 
import './tailwind-imports.css';
```

Nx automatically generates a Storybook story for your React components when you create the initial Storybook configuration for the library.

You can also re-run it afterwards:

```shell
nx g @nrwl/react:stories shared-ui
```

## Commands CheatSheet

Generate a page

```shell
npx nx generate @nrwl/next:page --name=topics --project=site
```

Generate Stories

```shell
nx g @nrwl/react:stories shared-ui		
```

Generate Component

```shell
npx nx g @nrwl/react:component layout --project=shared-ui --style=css
```
