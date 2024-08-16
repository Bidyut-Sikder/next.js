import React, { Fragment } from "react";
import AllPosts from "../../components/posts/all-posts";
import { getAllPosts } from "../../lib/posts-util";
import Head from "next/head";

export default function AllPostsPage({ posts }) {
  return (
    <Fragment>
      <Head>
        <title>All Posts</title>
        <meta name="description" content="A list of all blog posts" />
      </Head>
      <AllPosts posts={posts} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const allPosts = getAllPosts();

  return { props: { posts: allPosts } };
}
