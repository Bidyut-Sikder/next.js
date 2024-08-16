import Head from "next/head";
import { Fragment } from "react";
import Hero from "../components/home-page/hero";
import { getFeaturedPostes } from "../lib/posts-util";
import FeturedPosts from "../components/home-page/fetured-posts";

function HomePage(props) {


  return (
    <Fragment>
      <Head>
        <title>Bidyut's Blog</title>
        <meta name="description" content="I post about programming and web development." />
      </Head>
      <Hero />
      <FeturedPosts posts={props.posts} />
    </Fragment>
  );
}

export default HomePage;

export function getStaticProps() {
  const feturedPosts = getFeaturedPostes();

  return {
    props: { posts: feturedPosts },
  };
}
