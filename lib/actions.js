'use server'


import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

const isValidText = (text) => {

    return !text || text.trim() === ''
}



export const shareMeal = async (formData) => {
    'use server';

    const meal = {
        title: formData.get('title'),
        summary: formData.get('summary'),
        image: formData.get('image'),
        instructions: formData.get('instructions'),
        creator: formData.get('name'),
        creator_email: formData.get('email'),

    }

    if (isValidText(meal.title) ||
        isValidText(meal.summary) ||
        isValidText(meal.instructions) ||
        isValidText(meal.creator) ||
        isValidText(meal.creator_email) ||
        !meal.creator_email.includes('@') ||
        !meal.image ||
        meal.image.size === 0
    ) {
        return {
            message: 'Invalid input'
        }
    }




    await saveMeal(meal)
    revalidatePath('/meals')

    //  revalidatePath('/','layout')     //it revalidates all nested paths


    redirect('/meals')
}
