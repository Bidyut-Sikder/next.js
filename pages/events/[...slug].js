import EventList from '@/components/events/event-list';
import EventsSearch from '@/components/events/events-search';
import ResultsTitle from '@/components/events/results-title';
import Button from '@/components/ui/button';
import ErrorAlert from '@/components/ui/error-alert';
import { fetcher, getFilteredEvents } from '@/helper/api';

import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useState } from 'react';
import useSWR from 'swr';


const FilterdEventsPage = ({ filteredEvents, date, hasError }) => {
    const [events, setEvents] = useState(filteredEvents)

    const router = useRouter()
    const { data, error, isLoading } = useSWR('https://checking-a9349-default-rtdb.asia-southeast1.firebasedatabase.app/events.json', fetcher)



    useEffect(() => {
        if (data) {
           setEvents(data)
        }

    }, [data]);

    const filterdData = router.query.slug;

    if (!events) {
        return <p className='center'>Loading...</p>
    }


    const numYear = Number(filterdData[0])
    const numMonth = Number(filterdData[1])

    // const filteredData = await getFilteredEvents({ year: numYear, month: numMonth });
    date = date || new Date(numYear, numMonth - 1)



    const clientFilteredEvents = events.filter((event) => {
        const eventDate = new Date(event.date)
        return eventDate.getFullYear() === numYear && eventDate.getMonth() === numMonth - 1
    })



    if (!clientFilteredEvents || clientFilteredEvents.length === 0) {
        return <Fragment>
            <ErrorAlert>
                <p>No events found for the choosen filter.</p>

            </ErrorAlert>
            <div className='center'>
                <Button link={'/events'} >Show All Events </Button>
            </div>

        </Fragment>
    }


    if (isNaN(numMonth) || isNaN(numYear) || isNaN(numYear) > 2030 ||
        numMonth < 1 ||
        numMonth > 12 || hasError
    ) {
        return <Fragment>
            <ErrorAlert>
                <p>Invalid filter. found for the choosen filter.</p>

            </ErrorAlert>
            <div className='center'>
                <Button link={'/events'} >Show All Events </Button>
            </div>

        </Fragment>
    }






    const onSearch = (year, month) => {

        router.push(`/events/${year}/${month}`)
    }


    return (
        <Fragment>
            <EventsSearch onSearch={onSearch} />
            <ResultsTitle date={date} />
            <EventList items={clientFilteredEvents} />

        </Fragment>
    );


};

export default FilterdEventsPage;





export async function getServerSideProps(context) {
    const { params } = context;
    const filterdData = params.slug;




    const numYear = Number(filterdData[0])
    const numMonth = Number(filterdData[1])

    const filteredData = await getFilteredEvents({ year: numYear, month: numMonth });
    const date = new Date(numYear, numMonth - 1)

    if (isNaN(numMonth) || isNaN(numYear) || isNaN(numYear) > 2030 ||
        numMonth < 1 ||
        numMonth > 12
    ) {

        return {
            props: {
                hasError: true
            }

            // notFound: true,
            // redirect: {
            //     destination: '/error'
            // }
        }

    }


    // Pass data to the page via props
    return {
        props: {
            filteredEvents: filteredData,
            date: date.toString()
        }
    }
}








