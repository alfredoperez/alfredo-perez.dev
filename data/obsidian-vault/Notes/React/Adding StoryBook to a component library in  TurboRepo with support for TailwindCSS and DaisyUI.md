---
title: >-
  Adding StoryBook to a component library in  TurboRepo with support for
  TailwindCSS and DaisyUI
description: null
tags:
  - turborepo
  - react
  - nextjs
  - daisyui
  - tailwindcss
  - storybook
type: note
status: evergreen
created: 7/04/22
updated: 7/04/22
---
## Note
This is not a tutorial! Theses are just the steps I followed while working in a side-project.

---

You can check this [starter ](https://github.com/thmsmtylr/turborepo-starter/blob/main/packages/ui/.storybook/main.js) that has already StoryBook setup

...but lets start

Install StoryBook in the UI package folder

```shell
cd /packages/ui
npx storybook init

✔ Do you want to manually choose a Storybook project type to install? … yes
✔ Please choose a project type from the following list: › react
✔ Adding Storybook support to your "React" app
```

Add StoryBook to the turbo pipeline in the `turbo.json`:

```json
{  
  "pipeline": {  
    
    ...
    
    "storybook": {  
      "cache": false  
    },  
    "build:storybook": {  
      "outputs": ["storybook-static/**"]  
    }  
  }  
}
```

Add the scripts to the `package.json`:

```json
"scripts": {  

  ...
  
  "storybook": "turbo run storybook",  
  "build:storybook": "turbo run build:storybook"  
},
```

Try it by running

```shell
yarn run storybook
```

**Now** lets make it work with a stories for the component library.

The first thing to do is to change the folder of the stories in the `.storybook\main.js` to point to the components folder:

```js
module.exports = {  
  stories: [  
    '../components/**/*.stories.mdx',  
    '../components/**/*.stories.@(js|jsx|ts|tsx)',  
  ],  
  addons: [  
    '@storybook/addon-links',  
    '@storybook/addon-essentials',  
    '@storybook/addon-interactions',  
  ],  
  framework: '@storybook/react',  
  core: {  
    builder: '@storybook/builder-webpack5',  
  },  
};
```

Remove the `stories` folder and add a story to the the button component `Button.story.tsx`

```ts
import { ComponentMeta, ComponentStory } from '@storybook/react';  
import React from 'react';  
  
import { Button } from './Button';  
  
export default {  
  title: 'Components/Button',  
  component: Button,  
  argTypes: {  
    backgroundColor: { control: 'color' },  
  },  
} as ComponentMeta<typeof Button>;  
  
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;  
  
export const Basic = Template.bind({});
```

Now lets customize StoryBook to support TailwindCSS and other important plugins like `a11y`.

Install the following libraries in `packages\ui`:

```sh
➜ cd /packages/ui
➜ yarn add -DW @storybook/addon-a11y @storybook/addon-postcss postcss postcss-loader
```

Modify the `.storybook\main.js` to include the PostCSS loader

```js
 const path = require('path');  
  
module.exports = {  
  stories: [  
    '../components/**/*.stories.mdx',  
    '../components/**/*.stories.@(js|jsx|ts|tsx)',  
  ],  
  staticDirs: ['../styles'],  
  webpackFinal: async (config) => {  
    config.module.rules.push({  👈
      test: /\.css$/,  
      use: [  
        {  
          loader: 'postcss-loader',  👈
          options: {  
            postcssOptions: {  
              plugins: [require('tailwindcss'), require('autoprefixer')],  
            },  
          },  
        },  
      ],  
      include: path.resolve(__dirname, '../'),  
    });  
    return config;  
  },  
  addons: [  
    '@storybook/addon-links',  
    '@storybook/addon-essentials',  
    '@storybook/addon-a11y',  
    {  
      name: '@storybook/addon-postcss',  👈
      options: {  
        postcssLoaderOptions: {  
          implementation: require('postcss'),  
        },  
      },  
	},  
  ],  
  framework: '@storybook/react',  
  core: {  
    builder: '@storybook/builder-webpack5',  
  },  
  typescript: { reactDocgen: false },  
};
```

Finally, to center the components use the `layout: 'centered'` in the `.storybook\preview.js` :

```js
import '../styles/tailwind.css';  
  
export const parameters = {  
  actions: { argTypesRegex: '^on[A-Z].*' },  
  layout: 'centered',  
};
```
