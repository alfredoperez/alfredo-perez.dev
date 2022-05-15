import { bundleMDX } from 'mdx-bundler'
import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import readingTime from 'reading-time'
import { visit } from 'unist-util-visit'
import getAllFilesRecursively from './utils/files'
import siteMetadata from '@/data/siteMetadata'
// Remark packages
import remarkGfm from 'remark-gfm'
import remarkFootnotes from 'remark-footnotes'
import remarkMath from 'remark-math'
import remarkExtractFrontmatter from './remark/remark-extract-frontmatter'
import remarkCodeTitles from './remark/remark-code-title'
import remarkObsidian from './remark/remark-obsidian'
import remarkTocHeadings from './remark/remark-toc-headings'
import remarkImgToJsx from './remark/remark-img-to-jsx'
// Rehype packages
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeKatex from 'rehype-katex'
import rehypeCitation from 'rehype-citation'
import rehypePrismPlus from 'rehype-prism-plus'
import rehypePresetMinify from 'rehype-preset-minify'

const root = process.cwd()

function getPath(type) {
  return type === 'notes'
    ? siteMetadata.notesPath
    : type === 'highlights'
    ? siteMetadata.highlightsPath
    : type === 'authors'
    ? siteMetadata.authorsPath
    : ''
}
export function getFiles(type) {
  const prefixPaths = path.join(root, getPath(type), type === 'authors' ? type : '')

  const files = getAllFilesRecursively(prefixPaths)
  // Only want to return blog/path and ignore root, replace is needed to work on Windows
  return files.map((file) => file.slice(prefixPaths.length + 1).replace(/\\/g, '/'))
}

export function formatSlug(slug) {
  return slug.replace(/\.(mdx|md)/, '')
}

export function dateSortDesc(a, b) {
  if (a > b) return -1
  if (a < b) return 1
  return 0
}

export async function getFileBySlug(type, slug) {
  const mdxPath = path.join(root, getPath(type), `${slug}.mdx`)
  const mdPath = path.join(root, getPath(type), `${slug}.md`)

  const mdxExists = fs.existsSync(mdxPath)
  const mdExists = fs.existsSync(mdPath)
  if (!mdxExists && !mdExists) {
    return
  }

  const source = fs.existsSync(mdxPath)
    ? fs.readFileSync(mdxPath, 'utf8')
    : fs.readFileSync(mdPath, 'utf8')

  // https://github.com/kentcdodds/mdx-bundler#nextjs-esbuild-enoent
  if (process.platform === 'win32') {
    process.env.ESBUILD_BINARY_PATH = path.join(root, 'node_modules', 'esbuild', 'esbuild.exe')
  } else {
    process.env.ESBUILD_BINARY_PATH = path.join(root, 'node_modules', 'esbuild', 'bin', 'esbuild')
  }

  let toc = []

  const { code, frontmatter } = await bundleMDX({
    source,
    // mdx imports can be automatically source from the components directory
    cwd: path.join(root, 'components'),
    xdmOptions(options, frontmatter) {
      // this is the recommended way to add custom remark/rehype plugins:
      // The syntax might look weird, but it protects you in case we add/remove
      // plugins in the future.
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        remarkExtractFrontmatter,
        // [remarkTocHeadings, { exportRef: toc }],
        remarkGfm,
        remarkCodeTitles,
        [remarkObsidian, { urlPrefix: 'notes/', markdownFolder: siteMetadata.notesPath }],
        [remarkFootnotes, { inlineNotes: true }],
        remarkMath,
        remarkImgToJsx,
      ]
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypeSlug,
        rehypeAutolinkHeadings,
        rehypeKatex,
        [rehypeCitation, { path: path.join(root, siteMetadata.notesPath) }],
        [rehypePrismPlus, { ignoreMissing: true }],
        rehypePresetMinify,
      ]
      return options
    },
    esbuildOptions: (options) => {
      options.loader = {
        ...options.loader,
        '.js': 'jsx',
      }
      return options
    },
  })
  const fileName = fs.existsSync(mdxPath) ? `${slug}.mdx` : `${slug}.md`
  const filePath = fs.existsSync(mdxPath)
    ? mdxPath.slice(mdxPath.indexOf('data'), mdxPath.length)
    : mdPath.slice(mdPath.indexOf('data'), mdPath.length)

  return {
    mdxSource: code,
    toc,
    frontMatter: {
      readingTime: readingTime(code),
      slug: slug || null,
      fileName,
      filePath,
      ...frontmatter,
      created: frontmatter.created ? new Date(frontmatter.created).toISOString() : null,
      updated: frontmatter.updated ? new Date(frontmatter.updated).toISOString() : null,
    },
  }
}

export async function getAllFilesFrontMatter(type) {
  const prefixPaths = path.join(root, getPath(type))

  const files = getAllFilesRecursively(prefixPaths)

  const allFrontMatter = []

  files.forEach((file) => {
    // Replace is needed to work on Windows
    const fileName = file.slice(prefixPaths.length + 1).replace(/\\/g, '/')
    // Remove Unexpected File
    if (path.extname(fileName) !== '.md' && path.extname(fileName) !== '.mdx') {
      return
    }
    const source = fs.readFileSync(file, 'utf8')
    const { data: frontmatter } = matter(source)
    if (frontmatter.draft !== true) {
      allFrontMatter.push({
        ...frontmatter,
        slug: formatSlug(fileName),
        created: frontmatter.created ? new Date(frontmatter.created).toISOString() : null,
      })
    }
  })

  return allFrontMatter.sort((a, b) => dateSortDesc(a.created, b.created))
}
