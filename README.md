

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```


## Topics
In this section we have seen how to Fetch data in  Page Router  in next.js project.

## Features 
- [x] getStaticProps() it can be used dynamic or static page(it can be revalidated at certain times)
- [x] getStaticPaths() it is used a dynamic pre-rendered time 
   ### this two run on build time 
- [x] getServerSideProps()
   ### this one runs on every request time 


## Note
And we could use getStaticProps() to pre-render  and useEffect() to fetch data at the same time  in next.js project (server side and client side rendering at the same time).





