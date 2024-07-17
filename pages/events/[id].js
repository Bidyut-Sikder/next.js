import EventContent from '@/components/event-detail/event-content';
import EventLogistics from '@/components/event-detail/event-logistics';
import EventSummary from '@/components/event-detail/event-summary';
import ErrorAlert from '@/components/ui/error-alert';
import { getAllEvents, getEventById, getFeaturedEvents } from '@/helper/api';
import { useRouter } from 'next/router';
import React, { Fragment } from 'react';

const EventDetailPage = ({ event }) => {
    const router = useRouter()
    // const { id } = router.query

    // const event = getEventById(id)

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


export async function getStaticPaths() {
    const allEvents = await getAllEvents()
    const paths = allEvents.map(event => ({ params: { id: event.id } }))

    //console.log(paths);


    return {
        paths: paths,
        fallback: false, // false or "blocking"
    }
    //if falback is false it will redirect 404 page if unknown route is given
    //if falback is true it will show error/crash if unknown route is given
    //if falback is blocking it will show error/crash if unknown route is given

}










export async function getStaticProps(context) {

    const { params } = context
    const { id } = params
    const event = await getEventById(id)


    return {
        props: { event },
        revalidate: 30
    }
}








