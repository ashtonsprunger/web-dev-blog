import parseFrontMatter from "front-matter";
import { remark } from "remark";
import html from "remark-html";
import postsFilepaths from "./postsFilepaths";

async function loadPostContent(filepath) {
  const response = await fetch(filepath);
  const fileContent = await response.text();
  return fileContent;
}

export const getPostBySlug = async (slug) => {
  const posts = await getPosts();

  return posts.find((post) => post.slug === slug);
};

function generateSlug(title = "") {
  if (typeof title !== "string" || title.trim() === "") {
    console.warn("Invalid title provided:", title);
    return "";
  }

  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function generateExcerpt(content, maxLength = 250) {
  const plainText = content.replace(/<(?:.|\n)*?>/gm, "");
  return plainText.length > maxLength
    ? plainText.substr(0, maxLength) + "..."
    : plainText;
}

export async function getPosts() {
  const allPostsData = await Promise.all(
    postsFilepaths.map(async (filepath, fileIndex) => {
      const fileContents = await loadPostContent(filepath);
      console.log(`File content for file index ${fileIndex}:`, fileContents);
      const parsedFrontMatter = parseFrontMatter(fileContents);
      const { attributes: data, body: content } = parsedFrontMatter;

      console.log(`Parsed front matter for file index:`, data);

      const processedContent = await remark().use(html).process(content);
      const contentHtml = processedContent.toString();

      const slug = generateSlug(data.title);
      const excerpt = generateExcerpt(contentHtml);

      return {
        ...data,
        contentHtml,
        slug,
        excerpt,
      };
    })
  );

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}
