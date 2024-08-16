import React from "react";
import classes from "./hero.module.css";
import Image from "next/image";

export default function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
         <Image
          src={"/images/site/bidyut.png"}
          width={300}
          height={300}
          alt="An image showing bidyut"
        /> 
      </div>
      <h1>Hi,I'm Bidyut </h1>
      <p>
        I blog about web development -esecially forntend frameworks like Angular
        or React.
      </p>
    </section>
  );
}
