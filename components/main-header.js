

import Link from 'next/link';

import React from 'react';
import NavLink from './nav-link';

const MainHeader = () => {


    return (
        <header id='main-header'>
            <ul>
                <div id='logo'>
                    <Link href={`/`}> NextNews</Link>
                </div>
            </ul>

            <nav>
                <ul>
                    <li>
                        <NavLink href={'/news'}> News  </NavLink>
                    </li>


                    <li>
                        <NavLink href={'/archive'}> Archive </NavLink>
                    </li>
                </ul>
            </nav>


        </header>
    );
};

export default MainHeader;


