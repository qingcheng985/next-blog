import * as fs from "node:fs";
import * as path from "node:path";
import matter from "gray-matter";
import {remark} from 'remark'
import html from 'remark-html'
export function getAllPostIds() {
    const postsDirectory="D:\\webstorm\\projects\\nextjs\\nextjs-blog\\posts"
    const fileNames = fs.readdirSync(postsDirectory)

    // Returns an array that looks like this:
    // [
    //   {
    //     params: {
    //       id: 'ssg-ssr'
    //     }
    //   },
    //   {
    //     params: {
    //       id: 'pre-rendering'
    //     }
    //   }
    // ]
    return fileNames.map(fileName => {
        return {
            params: {//必须包含params对象
                id: fileName.replace(/\.md$/, '')
                // id: fileName
            }
        }
    })
}export async function getPostData(id) {
    const postsDirectory="D:\\webstorm\\projects\\nextjs\\nextjs-blog\\posts"

    const fullPath = path.join(postsDirectory, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
        .use(html)
        .process(matterResult.content)
    const contentHtml = processedContent.toString()

    // Combine the data with the id and contentHtml
    return {
        id,
        contentHtml,
        ...matterResult.data
    }
}
