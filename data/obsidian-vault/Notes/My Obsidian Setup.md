---
title: My Obsidian Setup
description: null
tags:
  - setup
  - obsidian
type: note
status: seed
created: 1/22/22
updated: 5/13/22
---

## Theme

I am using the "California Coast Theme" an https://github.com/mgmeyers/obsidian-california-coast-theme

Using the following fonts:

- UI: [Lato](https://fonts.google.com/specimen/Lato)
- Body: [Open Sans](https://fonts.google.com/specimen/Open+Sans)
- Code: [Fira Code](https://fonts.google.com/specimen/Fira+Code)

## Alfred Workflow
I am using this workflow https://github.com/chrisgrieser/shimmering-obsidian and in order to make it work you will need to install  and enable  the following Obsidian plugins [Advanced URI](https://obsidian.md/plugins?id=obsidian-advanced-uri) & [Metadata Extractor](https://obsidian.md/plugins?id=metadata-extractor)

## Tag Wrangler

To ease  tag management use [Tag Wrangler](obsidian://show-plugin?id=tag-wrangler) 

## Folder Icons
Thanks to adding icons your folders will look shiny and you will be able to find them quickly.
For this to work you need to add a [CSS Snippet](https://help.obsidian.md/How+to/Add+custom+styles#Use+Themes+and+or+CSS+snippets) where you will add the icon for each folder.

https://forum.obsidian.md/t/meta-post-common-css-hacks/1978/370


```css
 /* Replace "Timestamped" with the folder name*/ 
.nav-folder.mod-root>.nav-folder-children>.nav-folder>.nav-folder-title[data-path^="Timestamped👈"] .nav-folder-title-content::before {
  content: ' ';
  background-image:               /* Copy the code from https://remixicon.com/ */
  background-size: 14px 14px;     /* adapt this to your file tree font height */
  transform: translate(0px, 4px); /* to position the icon */
  background-repeat: no-repeat;
  display: inline-block;
  height: 16px;
  width: 16px;
  margin: -4px 2px 0 0;
}```