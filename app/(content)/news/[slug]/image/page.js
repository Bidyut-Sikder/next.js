import { DUMMY_NEWS } from "@/dummy-news";
import Link from "next/link";
import { notFound } from "next/navigation";


const FullScreenImage = ({ params }) => {


    const { slug } = params

    const newsItem = DUMMY_NEWS.find((item) => item.slug === slug)

    if (!newsItem) {
        notFound()
    }

    return (
        <div className="fullscreen-image">
           
                <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
         
        </div>
    );
};

export default FullScreenImage;