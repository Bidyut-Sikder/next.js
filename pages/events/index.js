import EventList from '@/components/events/event-list';
import EventsSearch from '@/components/events/events-search';
import { getAllEvents } from '@/helper/api';

import { useRouter } from 'next/router';
import React from 'react';

const AllEventsPage = ({events}) => {
const router =useRouter()



    if (!events) {
        return <p>No events found.</p>
    }

    const onSearch = (year, month) => {

        router.push(`/events/${year}/${month}`)
    }

    return (
        <>
            <EventsSearch onSearch={onSearch} />
            <EventList items={events} />
        </>
    );
};

export default AllEventsPage;







export async function getStaticProps(context) {

    let events =await getAllEvents()

    return {
        props: { events },
        revalidate: 30
    }
}







