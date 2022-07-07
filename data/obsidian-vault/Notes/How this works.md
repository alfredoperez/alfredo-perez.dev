---
title: How this works
description:
tags: []
type: note
status: seed
created:  1/30/21
updated:
---

This website is my digital garden! 

The goal of this PKM/Digital Garden is to have a place for all the interesting things I come across and also a place where I can share what I am learning or exploring.

I wanted to create something that integrates my writing process with my website and without feeling limited of only publishing finished articles.

I write my notes using Obsidian and created a website with GatsbyJS to share them publicly.

## My note-making process

Started by creating a mind map with the structure of my PKM system.  https://whimsical.com/digital-garden-15FWj9nugBrPiv5e53SHp8

<iframe src="https://whimsical.com/digital-garden-15FWj9nugBrPiv5e53SHp8@2Ux7TurymN39FY8A9s57"></iframe>

### Obsidian Vaults 

Since everything is published automatically I use two Obsidian Vaults for notes:
  - **Work** -> Work related  vault that never gets published
  - **Digital Garden** -> Notes for my evergreen PKM/ Digital Garden site
  
![https://res.cloudinary.com/dagkspppt/image/upload/v1615249389/2021-03-08\_18-22-52\_mxnsm9.png](https://res.cloudinary.com/dagkspppt/image/upload/v1615249389/2021-03-08_18-22-52_mxnsm9.png)

###  Folders

I have the following folders for notes in Obsidian:
- **00 - Templates**: This is where I save all my templates. 
- **Inbox**: Here I put all the notes that are in "seed" state or in idea. This helps me to have a place to dump notes and ideas before connecting them to other notes
- **Personal**: Here I put all my personal notes
- **Professional**: Here I put all my notes related to software development
- **Root**: at the root folder we can find the main maps of contents and notes that describe how this system work. Usually this notes might represent a "Page" in the website

### Types and Statuses

![https://res.cloudinary.com/dagkspppt/image/upload/v1615249863/2021-03-08\_18-30-46\_ha0swh.png](https://res.cloudinary.com/dagkspppt/image/upload/v1615249863/2021-03-08_18-30-46_ha0swh.png)

Notes can be either input or output notes. Where the input notes contains notes from another source and the output will be my original (evergreen) notes [[Personal/Linking Your Thinking#Evergreen Notes]]

I use the `type` frontmatter property to identify them and for ease of use I create templates for each type

Here are the different types of notes:

- **Learning Notes**:Notes from workshops, courses, podcasts, videos or articles
	- Workshop:  (`type: workshop`)
	- Podcast:  (`type: podcast`)
	- Course (`type: Course`)
	- Video (`type: video`)
	- Book (`type: book`)
- **Evergreen Notes**:  (`type: note`) Articles, guides, or notes of things I create
- **Inspiration**:  (`type: inspiration`)  this can be screenshots or links to websites can be used as inspiration when creating. This will be like my personal Pinterest
- **MOCs**:  (`type: mocs`) Map of content note will have links to other notes and can be used as Launchpads to learn/read about specific subjects.
- **Links**:  (`type: links`)  This note will contain only links for a related subject.

### Status
- **Seed**: ( `status: seed` )This might include a name or ideas to write. This type of notes are saved on the inbox folder
- **Bud**: ( `status: bud` ) A note or an idea that is growing but not in a mature state
- **Evergreen**:( `status:evergreen` ) a more mature idea that was finished and can keep growing
- **Snag** (`status: snag`) - Notes that are not longer relevant and are archived


###  Rules and Constrains
- Use the status and type property in frontmatter to classify them
- Put them in the Professional or Personal folder

Learning notes:
- Make my own notes from the source instead of just storing the source
- Use headers as a way to separate ideas. This will help to reference specific ideas in other notes

Inspiration Notes:
- Create an inspiration notes for a related subject and add screenshots and links

Links:
- ❓ These notes should contain a set of links

## Tools
I use the following tools:
- Pocket to highlight and read articles
- Kindle for books
- GatsbyJS to create site
- Alfred for automation
- Obsidian for note-making
- Cloudinary to store images

related: [[Website Goals and Setup]]
