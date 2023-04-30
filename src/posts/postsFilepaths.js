const BASE_URL = process.env.NODE_ENV === "development" ? "" : "/web-dev-blog";

const postsFilepaths = [
  BASE_URL +
    process.env.PUBLIC_URL +
    "/api/posts/keeping-manual-testing-concepts-in-mind.md",
  BASE_URL +
    process.env.PUBLIC_URL +
    "/api/posts/the-value-of-seo-to-front-end-developers.md",
];

export default postsFilepaths;
