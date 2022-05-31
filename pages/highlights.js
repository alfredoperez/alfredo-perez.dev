import { getAllFilesFrontMatter } from '@/mdx/mdx'
import siteMetadata from '@/data/siteMetadata'
import HighlightsLayout from '@/layouts/HighlightsLayout'
import { PageSEO } from '@/components/SEO'

export const POSTS_PER_PAGE = 100

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('highlights')
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE)
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return { props: { initialDisplayPosts, posts, pagination } }
}

export default function Highlights({ posts, initialDisplayPosts, pagination }) {
  return (
    <>
      <PageSEO
        title={`Highlights - ${siteMetadata.author}`}
        description={siteMetadata.description}
      />
      <HighlightsLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title="All Highlights"
      />
    </>
  )
}
