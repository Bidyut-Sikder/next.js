import Link from "next/link";
import React from "react";
import classes from "./post-item.module.css";
import Image from "next/image";

export default function PostItem({item}) {
  const { title, image, excerpt, date, slug } = item;

  const formatedDate = new Date(date).toLocaleDateString("en-us", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const imagePath = `/images/posts/${image}`;


  return (
    <li className={classes.post}>
      <Link href={`/posts/${slug}`}>
        <div className={classes.image}>
          <Image src={imagePath} layout="responsive" alt={title} width={300} height={200} />
        </div>
        <div className={classes.content}>
          <h3>{title}</h3>
          <time>{formatedDate}</time>
          <p>{excerpt}</p>
        </div>
      </Link>
    </li>
  );
}
