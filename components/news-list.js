import Link from 'next/link';
import React from 'react';



const NewsList = ({news}) => {


    return (
        <ul className='news-list'>
        {
            news.map((news, i)  => {
                return (
                    <li key={i}>
                        <Link href={`/news/${news.slug}`}>
                        <img src={`/images/news/${news.image}`} alt="" />
                       <span>{news.title}</span>
                        </Link>
                    </li>

                )
            })
        }
    </ul>

    );
};

export default NewsList;