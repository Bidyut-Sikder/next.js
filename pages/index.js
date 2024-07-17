import EventList from '@/components/events/event-list';
import { getFeaturedEvents } from '@/helper/api';


import React from 'react';

const HomePage = ({ featuredEvents }) => {

    // const featuredEvents = getFeaturedEvents()
    // const featuredEvents = getFeaturedEvents()


    return (
        <div>
            <ul>
                <EventList items={featuredEvents} />
            </ul>
        </div>
    );
};

export default HomePage;





export async function getStaticProps() {
    const events = await getFeaturedEvents()


    return {
        props: { featuredEvents: events },
        revalidate: 20

    }
}























// {
//   "rules": {
//     "videos": {
//       ".read": true,
//       ".write": false
//     },
//     "quiz": {
//       ".read": "auth != null",
//       ".write": "auth != null"
//     },
//     "answers": {
//       ".read": "auth != null",
//       ".write": "auth != null"
//     },
//     "result": {
//       "$uid": {
//         ".read": "$uid === auth.uid",
//         ".write": "$uid === auth.uid"
//       }
//     }
//   }
// }












