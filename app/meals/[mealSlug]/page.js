
import Image from 'next/image';
import calsses from './page.module.css'
import Link from 'next/link';
import { getMeal } from '@/lib/meals';
import { notFound } from 'next/navigation';



export const generateMetadata = async ({ params }) => {
    const meal = getMeal(params.mealSlug);



    if (!meal) {
        notFound()
    }

    return {
        title: meal.title,
        description: meal.summary,
    }
}

const page = ({ params }) => {
    const { mealSlug } = params

    const meal = getMeal(mealSlug)

    if (!meal) {
        notFound()
    }

    meal.instructions = meal.instructions.replace(/\n/g, '<br/>')

    return (
        <>
            <header className={calsses.header}>
                <div className={calsses.image}>
                    <Image src={meal.image} alt={meal.title} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" fill />
                </div>
                <div className={calsses.headerText}>
                    <h1>{meal.title}</h1>
                    <p className={calsses.creator}>
                        by <Link href={`mailto:${meal.creator_email}`}>NAME</Link>
                    </p>
                    <p className={calsses.summary}> {meal.summary}</p>
                </div>
            </header>
            <main>
                <p className={calsses.instructions}
                    dangerouslySetInnerHTML={{ __html: meal.instructions }} >

                </p>
            </main>
        </>
    );
};

export default page;