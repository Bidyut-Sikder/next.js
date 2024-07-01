import Link from 'next/link';
import React from 'react';

import logoImg from '@/assets/logo.png'
import classes from '@/components/main-header/main-header.module.css'
import Image from 'next/image';
import MainHeaderBackground from './main-header-background';
import NavLink from './nav-link';


const MainHeader = () => {
    return (
        <>
            <MainHeaderBackground />

            <header className={classes.header}>
                <Link className={classes.logo} href={`/`}>
                    <Image priority src={logoImg} alt="A plate with food on it" />
                    Next lavel food
                </Link>


                <nav className={classes.nav}>
                    <ul>
                        <li>
                            <NavLink href={'/meals'} >
                                Browse Meals
                            </NavLink>
                            {/* <Link href={`/meals`}>Browse Meals</Link> */}
                        </li>
                        <li>
                            <NavLink href={'/community'} >
                                Foodes Community
                            </NavLink>

                            {/* <Link href={`/community`}>Foodes Community</Link> */}
                        </li>

                    </ul>
                </nav>

            </header>
        </>
    );
};

export default MainHeader;