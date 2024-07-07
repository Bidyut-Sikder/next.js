"use client";

import React from 'react';
import { useFormStatus } from "react-dom";



const FormSubmit = () => {
    const { pending, data, method, action } = useFormStatus();

    if (pending) {
        return <p>Creating post ....</p>
    }

    return (
        <>
            <button type="reset">Reset</button>
            <button>Create Post</button>
        </>
    );
};

export default FormSubmit;

// import { useActionState } from 'react';