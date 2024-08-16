import React from "react";
import classes from "./post-content.module.css";
import PostHeader from "./post-header";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import remarkGfm from "remark-gfm";
import { PrismLight as SyntaxHighLighter } from "react-syntax-highlighter";
import atomDark from "react-syntax-highlighter/dist/cjs/styles/prism/atom-dark";
import js from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import css from "react-syntax-highlighter/dist/cjs/languages/prism/css";

SyntaxHighLighter.registerLanguage("js", js);
SyntaxHighLighter.registerLanguage("css", css);

export default function PostContent({ post }) {
  const { title, content, image } = post;

  const imagePath = `/images/posts/${image}`;

  const renderers = {
    // img: ({ alt, src, ...props }) => {
    //   return (
    //     <Image
    //       alt={alt}
    //       src={`/images/posts/${src}`}
    //       {...props}
    //       width={600}
    //       height={300}
    //     />
    //   );
    // },
    p: (paragaph) => {
      const { node } = paragaph;

      if (node.children[0].tagName === "img") {
        const image = node.children[0].properties;

        return (
          <div className={classes.image}>
            <Image
              alt={image.alt}
              src={`/images/posts/${image.src}`}
              width={600}
              height={300}
            />
          </div>
        );
      }
      return <p>{paragaph.children}</p>;
    },
    code: (code) => {
      const { language, children } = code;

      return (
        <SyntaxHighLighter
          children={children}
          style={atomDark}
          language={language}
        />
      );
    },
  };

  return (
    <article className={classes.content}>
      <PostHeader title={title} image={imagePath} />

      <ReactMarkdown
        components={renderers}
        remarkPlugins={[remarkGfm]}
        allowEscapeHtml
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
