import React from "react";

import classes from "./fetured-posts.module.css";
import PostsGrid from "../posts/posts-grid";

export default function FeturedPosts({posts}) {
  return (
    <section className={classes.latest}>
      <h1>Featured Posts</h1>
      <PostsGrid posts={posts}/>
    </section>
  );
}
