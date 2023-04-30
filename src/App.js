import React, { useState, useEffect } from "react";
import "./App.css";
import { getPosts } from "./posts";
import { BrowserRouter, Link, Outlet, Route, Routes } from "react-router-dom";
import PostDisplay from "./PostDisplay";

function Post({ title, date, contentHtml, slug, excerpt }) {
  return (
    <article>
      <h2>{title}</h2>
      <p className="post-date">{date.toLocaleDateString()}</p>
      <p>{excerpt}</p>
      <Link to={slug}>Read more</Link>
      <div
        dangerouslySetInnerHTML={{ __html: contentHtml }}
        style={{ display: "none" }}
      />
    </article>
  );
}

function Content() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const postsData = await getPosts();
      console.log("postsData:", postsData);
      setPosts(postsData);
    }
    fetchPosts();
  }, []);

  console.log("posts:", posts);

  return (
    <main className="content">
      <h1>Blog Posts</h1>
      {posts.map((post) => (
        <Post key={post.permalink} {...post} />
      ))}
    </main>
  );
}

function Header() {
  return (
    <header className="header">
      <h1>Web-dev Blog</h1>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p>&copy; 2023 Ashton Sprunger. All rights reserved.</p>
    </footer>
  );
}

function Wrapper() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Wrapper />}>
            <Route index element={<Content />} />
            <Route path=":postSlug" element={<PostDisplay />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
