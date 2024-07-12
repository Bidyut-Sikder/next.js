
'use server';

import { createAuthSession, destroySession } from "@/lib/auth";
import { hashPassword, verifyPassword } from "@/lib/hash";
import { createUser, getUserByUserEmail } from "@/lib/user";

import { redirect } from "next/navigation";




//singup fuonction
export const signup = async (previousState, formData) => {
    const email = formData.get('email')
    const password = formData.get('password')

    let errors = {}


    if (!email.includes('@')) {
        errors.email = "Please enter a valid email address."
    }

    if (password.trim().length < 8) {
        errors.password = "Password must be at least 8 characters long."
    }


    if (Object.keys(errors).length > 0) {
        return {
            errors: errors
        }
    }

    const hashPass = hashPassword(password)


    try {
        const userId = createUser(email, hashPass)
        await createAuthSession(userId)
        redirect('/training');

    } catch (error) {
        if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
            return {
                errors: {
                    email: "Email already in use."
                }
            }
        }

        throw error;
    }


}


//login function
export const login = async (previousState, formData) => {

    const email = formData.get('email')
    const password = formData.get('password')

    const existingUser = getUserByUserEmail(email)//database call for user's data



    if (!existingUser) {
        return {
            errors: {
                email: "Email not found.Could not authenticate user."
            }
        }
    }

    const isValidPassword = verifyPassword(existingUser.password, password)


    if (!isValidPassword) {
        return {
            errors: {
                password: "Invalid password."
            }
        }
    }


    await createAuthSession(existingUser.id)
    redirect('/training');


}


//auth function 
export const auth = async (mode, preState, formData) => {
    if (mode === 'login') {
        return login(preState, formData)
    }

    return signup(preState, formData)
}



//logout function
export const logout = async (previousState) => {
    await destroySession()
    redirect('/')
}


