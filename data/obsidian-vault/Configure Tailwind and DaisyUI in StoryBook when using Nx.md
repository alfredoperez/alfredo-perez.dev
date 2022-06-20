---
title: Configure Tailwind and DaisyUI in StoryBook when using Nx
description:
tags: ['storybook']
type: til
status: evergreen
created: 6/20/22
updated: 6/20/22
---

As the title says, this is just a quick setup I had to do in order to enable the styling from Tailwind and daisyUI for StoryBook in an Angular monorepo using Nx.

## Configuring Tailwind
In project.json (inside your library), add 'styles' array to 'build-storybook' target:

```json
"build-storybook": {
  "executor": "@nrwl/storybook:build",
  "outputs": ["{options.outputPath}"],
  "options": {
    "uiFramework": "@storybook/angular",
    "outputPath": "dist/storybook/angular",
    "styles": ["libs/<library_name>/src/styles.scss"], // 👈
    "config": {
      "configFolder": "libs/<library_name>/.storybook"
    },
    "projectBuildConfig": "angular:build-storybook"
  },
  "configurations": {
    "ci": {
      "quiet": true
    }
  }
}
```

And inside styles.scss:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Found this in answer in StackOverflow https://stackoverflow.com/a/71388010 

## Configuring Daisy UI
In the tailwind.config.js add any custom themes you have and the daisyUI plugin

``` JS
const { createGlobPatternsForDependencies } = require('@nrwl/angular/tailwind');
const { join } = require('path');

module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  daisyui: {     👈
    themes: [
      {
        mytheme: {
          primary: '#a78bfa',
          secondary: '#7dd3fc',
          accent: '#f472b6',
          neutral: '#d6d3d1',
          'base-100': '#212121',
          info: '#93E6FB',
          success: '#4ade80',
          warning: '#fde047',
          error: '#f87171',
        },
      },
    ],
  },
  plugins: [
     require('daisyui'),  👈
     '@nrwl/angular/plugins/storybook' 
    ],
};
```