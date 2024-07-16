

import Link from 'next/link';
import path from 'path'




export async function getStaticProps(context) {
    //console.log(process.cwd());

    const fs = require('fs/promises');
    const filePath = path.join(process.cwd(), 'data', 'dummy-data.json')
    const dataBuffer = await fs.readFile(filePath)
    const data = JSON.parse(dataBuffer)

    if (!data) {
        return {
            redirect: {
                destination: '/no-data'
            }
        }
    }


    if (data.products.length === 0) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            products: data.products,
        },
        revalidate: 10,

    }
}















const HomePage = (props) => {
    const { products } = props



    return (
        <ul>
            {products.map((product) => (
                <li key={product.id}>
                   <Link href={`/products/${product.id}`}> <h2>{product.title}</h2></Link>
                </li>
            ))}
        </ul>
    );
};

export default HomePage;










