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

This is Blog and  Portfolio project using Next.Js,MongoDB,

## Vercel Deployment
## Features Using mongodb

- **mongodb connection**:Get,Post request sending to mongodb ,and working with it's response.
 

## Note

- I hosetd this project on vercel.The only problem is When I wnat to visit any of this posts When I click on this
- It show Error page. But if I reload this page then it shows the page.
- This is because Vercel does not call useStaticProps() function on its initial render.
- When I redload the page then it cals the useStaticProps() function and show the page
