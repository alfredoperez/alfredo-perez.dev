---
title: Testing if NextJS can be used for my blog
description: null
tags:
  - nextjs
type: note
status: seed
created: 4/20/22
updated: 5/13/22
---

# Phases

## PoC

### Test MDX in Obsidian

Obsidian works the same way with MDX but it is a hassle to be changing extension names. I will keep using Markdown files

### Verify it can parse WikiLinks

I was able to make it work by using https://github.com/life-itself/remark-wiki-link-plus and with the following

```ts
[remarkWikiLinkPlus, { hrefTemplate: (permalink) => `/blog/${encodeURI(permalink)}` }],
```

### Customize date fields

Currently I use in Obsidian the format of `M/DD/YY` that translates to `4/20/22` and the current setup parses correctly
In my obsidian vault, I have two dates in the frontmatter the `created` and `updated`

### Change href  from `\blog` to `\notes`

### Take Markdown files instead of MDX

At this moment it can take both types of files.

### Add  fast refresh to the app

Nothing need to be added... just use `nex dev`
