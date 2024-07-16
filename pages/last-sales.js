import React, { useEffect, useState } from 'react';
import useSWR from 'swr';

const LastSalesPage = ({ salesData }) => {
    const [sales, setSales] = useState(salesData)

   // console.log(sales);


    const fetcher = url => fetch(url).then(r => r.json())


    const { data, error, isLoading, isValidating } =
        useSWR('https://jsonplaceholder.typicode.com/todos?_limit=5', fetcher)

    useEffect(() => {
        if (data) {
           setSales(data)
        }

    }, []);

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    if (error) {
        return <h1>Error</h1>
    }

    return (
        <div>

            {
                sales.map((product, i) => {
                    return (
                        <div key={i}>
                            <h1>{product.title}</h1>
                            <p>{product.id}</p>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default LastSalesPage;


//in this way we can use (server side and client side data fetching at the same time)


export async function getStaticProps() {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
    const salesData = await res.json()
   // console.log(salesData);
    
    return { props: { salesData } }
}















