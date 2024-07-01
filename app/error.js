'use client'

const Error = ({ error }) => {

    console.log(error.toString())

    return (
        <main className="error">
            <h1>An errro Occurred!</h1>
            <p>{error.toString()}</p>
        </main>
    );
};

export default Error; 