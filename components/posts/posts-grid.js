import React from "react";
import PostItem from "./post-item";
import classes from "./posts-grid.module.css";

export default function PostsGrid(props) {
  const { posts } = props;

  return (
    <ul className={classes.grid}>
      {posts.map((item, i) => {
        return <PostItem item={item} key={item.slug} />;
      })}
    </ul>
  );
}
