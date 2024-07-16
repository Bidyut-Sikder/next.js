
import path from 'path';
import React, { Fragment } from 'react';


async function getData() {

    const fs = require('fs/promises');
    const filePath = path.join(process.cwd(), 'data', 'dummy-data.json')
    const dataBuffer = await fs.readFile(filePath)
    const data = JSON.parse(dataBuffer)
    return data
}


const ProductDetails = ({ product }) => {


    if (!product) {
        return <p>Loading...</p>
    }
    return (
        <Fragment>
            <h1>Title:{product.title} </h1>
        </Fragment>
    );
};

export default ProductDetails;

export async function getStaticPaths() {
    const data = await getData()
    const ids = data.products.map((product) => product.id)
    const pathsWhithParams = ids.map(id => ({ params: { id: id } }))

    // console.log(params);

    return {
        paths: pathsWhithParams,
        fallback: true, // false or "blocking"
    }
}

export async function getStaticProps(context) {


    const { params } = context
    const id = params.id

    const data = await getData()
    const product = data.products.find((item) => item.id === id)

    if (!product) {
        return { notFound: true }
    }

    return {
        props: { product }
    }
}

//useSWR(<request-url>, (url) => fetch(url).then(res => res.json()))




