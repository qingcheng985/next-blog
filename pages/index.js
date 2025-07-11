import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getAllPostIds } from '../lib/posts'
export async function getStaticProps() {
    const allPostsData = getAllPostIds()
    return {
        props: {
            allPostsData
        }
    }
}
export default function Home({allPostsData }) {
  return (
      <Layout home>
        <Head>
          <title>{siteTitle}</title>
        </Head>
        <section className={utilStyles.headingMd}>
          <p>[Your Self Introduction]</p>
          <p>
            (This is a sample website - you’ll be building a site like this on{' '}
            <a href="https://www.nextjs.cn/learn">our Next.js tutorial</a>.)
          </p>
        </section>
          <section className={utilStyles.headingMd}>…</section>
          <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
              <h2 className={utilStyles.headingLg}>Blog</h2>
              <ul className={utilStyles.list}>
                  {allPostsData.map(({ id, date, title }) => (
                      <li className={utilStyles.listItem} key={id}>
                          {title}
                          <br />
                          {id}
                          <br />
                          {date}
                      </li>
                  ))}
              </ul>
          </section>
      </Layout>
  )
}
