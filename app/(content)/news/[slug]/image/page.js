import { DUMMY_NEWS } from "@/dummy-news";
import { getNewsItem } from "@/lib/news";
import Link from "next/link";
import { notFound } from "next/navigation";


const FullScreenImage =async ({ params }) => {


    const { slug } = params

    const newsItem = await getNewsItem(slug)

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