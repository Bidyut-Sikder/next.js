import React, { useRef } from 'react';
import Button from '../ui/button';

import classes from './event-search.module.css'

const EventsSearch = (props) => {

    const yearInput = useRef()
    const monthInput = useRef()


    const submitHander = (e) => {
        e.preventDefault()

        const year = yearInput.current.value
        const month = monthInput.current.value

        props.onSearch(year, month)

    }


    return (
        <form className={classes.form} onSubmit={submitHander}>
            <div className={classes.controls}>
                <div className={classes.control}>
                    <label htmlFor='year'>Year</label>
                    <select name="year" ref={yearInput} id='year'>
                        <option value="2021" >2021</option>
                        <option value="2022" >2022</option>
                        <option value="2023" >2023</option>

                    </select>
                </div>



                <div className={classes.control}>
                    <label htmlFor='month'>Month</label>

                    <select name="month" ref={monthInput} id='month'>
                        <option value="1" >Jan</option>
                        <option value="2" >Feb</option>
                        <option value="3" >Mar</option>
                        <option value="4" >Apr</option>
                        <option value="5" >May</option>
                        <option value="6" >Jun</option>
                        <option value="7" >Jul</option>
                        <option value="8" >Aug</option>
                        <option value="9" >Sep</option>
                        <option value="10" >Oct</option>
                        <option value="11" >Nov</option>
                        <option value="12" >Dec</option>
                    </select>

                </div>
            </div>

            <Button > Find Event</Button>
        </form>
    );
};

export default EventsSearch;