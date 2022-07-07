---
title: Adding TailwindCSS and DaisyUI to a NextJS Project
description: null
tags:
  - nextjs
  - tailwindcss
  - react
  - daisyui
type: note
status: evergreen
created: 7/04/22
updated: 7/04/22
---
## Note
This is not a tutorial! Theses are just the steps I followed while working in a side-project.

---
## Installing TailwindCSS

Follow the guide from <https://shubhamverma.me/blog/setup-tailwind-css-with-turborepo>

- Install Tailwind

```sh
yarn add -DW tailwindcss postcss autoprefixer
```

- Create `tailwind.config.js` and add the following:

```js
module.exports = {
  content: [
    '../../packages/ui/components/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

- Create `postcss.config.js` and add the following:

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

- Create a Tailwind config file in the web app and ui package and point to the shared config file

```js
// apps/web/tailwind.config.js
// packages/ui/tailwind.config.js

module.exports = require('config/tailwind.config');
```

- Create a PostCSS config file in the web app and ui package and point to the shared config file

```js
// apps/web/postcss.config.js
// packages/ui/postcss.config,js

module.exports = require('config/tailwind.config');
```

- Make sure the following is present in the  `next.config.js`

```js
const withTM = require('next-transpile-modules')(['ui']);
module.exports = withTM({ 
  reactStrictMode: true, 
});`
```

Try it by adding this to the Button component

```TS
import React from 'react';  
  
export const Button: React.FC = () => {  
  return (  
    <button className="w-60 px-3 py-2 rounded drop-shadow-2xl text-white font-bold bg-gradient-to-r from-indigo-400 to-fuchsia-600 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-fuchsia-700 focus:ring-indigo-400 focus:ring-4 focus:ring-offset-2 transition-all duration-200">  
      Let&apos;s get it !  
    </button>  
  );  
};
```

## Adding the automatic class sorting

Following  the guide on  [Automatic Tailwind CSS Class Sorting](https://tailwindcss.com/blog/automatic-class-sorting-with-prettier)

Install the plugin

```shell
yarn add -DW prettier-plugin-tailwindcss  
```

Try it by adding the following code and make sure prettier sorts the classes

```html
- <div class="pt-2 p-4">
+ <div class="p-4 pt-2">
  <!-- ... -->
</div>
```

## Installing DaisyUI and adding a custom theme

Install daisyUI

```shell
yarn add -DW  daisyui
```

Add it to the plugins in the `tailwind.config.js`

```js
plugins: [require("daisyui")],
```

Add the DaisyUI custom  theme into the  `tailwind.config.js`

```js
daisyui: {  
  themes: [  
    {  
      mytheme: {  
        "primary": "#a78bfa",  
        "secondary": "#7dd3fc",  
        "accent": "#f472b6",  
        "neutral": "#d6d3d1",  
        "base-100": "#212121",  
        "info": "#93E6FB",  
        "success": "#4ade80",  
        "warning": "#fde047",  
        "error": "#f87171",  
      },  
    },  ],  
},
```

Try it by modifying the button to

```ts
import React from 'react';  
  
export const Button: React.FC = () => {  
  return <button className="btn btn-primary">Let&apos;s get it !</button>;  
};
```

Here is a link to the commit:
<https://github.com/alfredoperez/code-machina/pull/1>


