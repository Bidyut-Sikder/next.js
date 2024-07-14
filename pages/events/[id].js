import EventContent from '@/components/event-detail/event-content';
import EventLogistics from '@/components/event-detail/event-logistics';
import EventSummary from '@/components/event-detail/event-summary';
import ErrorAlert from '@/components/ui/error-alert';
import { getEventById } from '@/dummy-data';
import { useRouter } from 'next/router';
import React, { Fragment } from 'react';

const EventDetailPage = () => {
    const router = useRouter()

    const { id } = router.query

    const event = getEventById(id)

    if (!event) {
        return (
            <Fragment>
                <ErrorAlert>
                    <p>No eventt found.</p>
                </ErrorAlert>
                
            </Fragment>
        )
    }



    return (
        <Fragment>
            <EventSummary title={event.title} />
            <EventLogistics event={event} />

            <EventContent >
                <p>{event.description}</p>
            </EventContent>

        </Fragment>
    );
};

export default EventDetailPage;