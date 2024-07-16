import React from 'react';

const UserProfile = ({user}) => {

    return (
        <div>
            <h1>{user}</h1>
        </div>
    );
};

export default UserProfile;







export async function getServerSideProps(context) {
    console.log(context);
    const {params,req,res } = context
    

    // Fetch data from external API
    // const res = await fetch('https://api.github.com/repos/vercel/next.js')
    // const repo = await res.json()
 console.log(req.headers.cookie);
    
    // Pass data to the page via props
    return { props: { user:'bidyut' } }
  }











