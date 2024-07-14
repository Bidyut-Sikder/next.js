import EventList from '@/components/events/event-list';
import EventsSearch from '@/components/events/events-search';
import ResultsTitle from '@/components/events/results-title';
import Button from '@/components/ui/button';
import ErrorAlert from '@/components/ui/error-alert';
import { getFilteredEvents } from '@/dummy-data';
import { useRouter } from 'next/router';
import React, { Fragment } from 'react';

const FilterdEventsPage = () => {
    const router = useRouter()

    const filterdData = router.query.slug;

    if (!filterdData) {
        return <p className='center'>Loading...</p>
    }


    const numYear = Number(filterdData[0])
    const numMonth = Number(filterdData[1])

    if (isNaN(numMonth) || isNaN(numYear) || isNaN(numYear) > 2030 ||
        numMonth < 1 ||
        numMonth > 12
    ) {

        return <Fragment>
            <ErrorAlert>
                <p>Invalid filter,Please adjust your correct values.</p>

            </ErrorAlert>
            <div className='center'>
                <Button link={'/events'} >Show All Events </Button>

            </div>

        </Fragment>




    }
    const onSearch = (year, month) => {

        router.push(`/events/${year}/${month}`)
    }

    const filteredEvents = getFilteredEvents({ year: numYear, month: numMonth })


    if (!filteredEvents || filteredEvents.length === 0) {
        return <Fragment>
            <ErrorAlert>
                <p>No events found for the choosen filter.</p>

            </ErrorAlert>
            <div className='center'>
                <Button link={'/events'} >Show All Events </Button>
            </div>

        </Fragment>
    }




    const date = new Date(numYear, numMonth - 1)


    return (
        <Fragment>
            <EventsSearch onSearch={onSearch} />
            <ResultsTitle date={date} />
            <EventList items={filteredEvents} />

        </Fragment>
    );


};

export default FilterdEventsPage;