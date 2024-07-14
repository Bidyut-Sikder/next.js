
import React from 'react';
import classes from './event-item.module.css'
import Button from '../ui/button';
import DateIcon from '../icons/date-icon';
import AddressIcon from '../icons/address-icon';
import ArrowRightIcon from '../icons/arrow-right-icon';




const EventItem = ({ item }) => {

    const { title, image, date, location, id } = item


    const readabaleDate = new Date(date).toLocaleDateString('en-us', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'

    })

    const formatedAddress = location.replace(', ', '\n')



    return (
        <li className={classes.item}>
            <img src={'/' + image} alt={title} />

            <div className={classes.content}>
                <div className={classes.summary}>
                    <h2>{title}</h2>
                    <div className={classes.date}>
                        <DateIcon />
                        <time>{readabaleDate}</time>
                    </div>
                    <div className={classes.address}>
                        <AddressIcon />
                        <address>{formatedAddress}</address>
                    </div>

                    <div className={classes.actions}>

                        <Button link={`/events/${id}`} >
                            <span>Explore Event</span>
                            <span className={classes.icon}><ArrowRightIcon /></span>
                        </Button>

                    </div>
                </div>
            </div>

        </li>
    );
};

export default EventItem;