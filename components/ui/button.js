import React from 'react';
import classes from '../events/button.module.css';
import Link from 'next/link';

const Button = (props) => {

    if (props.link) {

        return (
            <Link className={classes.btn} href={props.link} >{props.children}</Link>
        );
    }



    return <button type='submit' className={classes.btn}>{props.children}</button>
};

export default Button;




