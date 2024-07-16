
import React from 'react';

const UserDetails = ({userId}) => {
    return (
        <div>
            userid page {userId}
        </div>
    );
};

export default UserDetails;


export async function getServerSideProps(context) {
    const { params } = context;
    const { userId } = params;
    console.log(userId);
    


    // Fetch data from external API
    const res = await fetch('https://api.github.com/repos/vercel/next.js')
    const repo = await res.json()
    // Pass data to the page via props
    return { props: { userId } }
  }


