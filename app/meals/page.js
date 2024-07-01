import React, { Suspense } from 'react';

import classes from './page.module.css'
import Link from 'next/link';
import MealsGrid from '@/components/meals/meals-grid';
import { getMeals } from '@/lib/meals';



const FecthMeal = async () => {
    const meals = await getMeals()

    return <MealsGrid meals={meals} />
}

const MealsPage = () => {

    return (
        <>
            <header className={classes.header}>
                <h1>Delicios meals,created{' '}
                    <span className={classes.highlight}>by you</span>
                </h1>
                <p>Choose your favorite recipe and cook it yourself.</p>

                <p className={classes.cta}>
                    <Link href={`/meals/share`}> Share Your Favorite Recipe</Link>
                </p>

            </header>
            <main className={classes.main}>
              
             <Suspense fallback={<p className={classes.loading}>Fetching meals ....</p>}>
             <FecthMeal />
             </Suspense>
            </main>
        </>
    );
};

export default MealsPage;