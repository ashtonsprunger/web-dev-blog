import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostBySlug } from "./posts";
import "./PostDisplay.css";

const PostDisplay = () => {
  const { postSlug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    async function fetchPost() {
      const postData = await getPostBySlug(postSlug);
      setPost(postData);
    }

    fetchPost();
  }, [postSlug]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="post-container">
      <h2 className="post-title">{post.title}</h2>
      <div className="post-date">{post.date.toLocaleDateString()}</div>
      <div
        className="post-content"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </div>
  );
};

export default PostDisplay;
