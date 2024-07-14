import EventList from '@/components/events/event-list';
import EventsSearch from '@/components/events/events-search';
import { getAllEvents, getFilteredEvents } from '@/dummy-data';
import { useRouter } from 'next/router';
import React from 'react';

const AllEventsPage = () => {
    const router = useRouter()

    let events = getAllEvents()




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