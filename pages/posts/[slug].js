import React, { Fragment } from "react";
import PostContent from "../../components/posts/post-detail/post-content";
import { getPostData, getPostsFiles } from "../../lib/posts-util";
import Head from "next/head";

export default function SinglePostDetails(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.post.title}</title>
        <meta name="description" content={props.post.excerpt} />
      </Head>
      <PostContent post={props.post} />
    </Fragment>
  );
}

export function getStaticPaths() {
  const postFilesNames = getPostsFiles();
  const slugs = postFilesNames.map((file) => file.replace(/\.md$/, ""));

  const slugArr = slugs.map((slug) => ({ params: { slug: slug } }));

  return {
    paths: slugArr,
    fallback: false, // false or "blocking"
  };
}
export function getStaticProps(context) {
  const { params } = context;
  const { slug } = params;

  const postData = getPostData(slug);
 

  return {
    props: { post: postData },
     revalidate: 600,
  };
}
