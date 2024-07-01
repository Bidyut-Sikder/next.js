'use client'

import React, { useRef, useState } from 'react';
import classes from './image-picker.module.css'
import Image from 'next/image';

const ImagePicker = ({ label, name }) => {
    const [pickedImage, setPickedImage] = useState('')
    const ref = useRef()
    const handlePickClick = () => {
        ref.current.click()
    }
    const handleImageChange = (event) => {
        const file = event.target.files[0]

        if (!file) {
            setPickedImage(null)
            return;
        }
        const reader = new FileReader();
        reader.onload = () => {
            setPickedImage(reader.result)
        }
        reader.readAsDataURL(file)
    }

   // console.log(pickedImage)

    return (
        <div className={classes.picker}>
            <label htmlFor={name}>{label}</label>

            <div className={classes.controls}>
                <div className={classes.preview}>
                    {!pickedImage && <p>No image picked yet.</p>}
                    {pickedImage && <Image fill src={pickedImage} alt='The image selected by user.' />}
                </div>

                <input
                    onChange={handleImageChange}
                    ref={ref}

                    className={classes.input}
                    type='file' id='image' name={name}
                    accept='image/png,image/jpeg' />

                <button type='button' onClick={handlePickClick} className={classes.button}>
                    Pick An Image</button>
            </div>



        </div>
    );
};

export default ImagePicker;











