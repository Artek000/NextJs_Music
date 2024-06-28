'use server'

import {signupMethod} from "@/lib/actions/signupMethod";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";

export async function signupAction(_currentState: unknown, formData: FormData) {
    try {
        await signupMethod(formData)
    } catch (error) {
        if (error) {
            return error.toString()
        }
        throw error
    }

    revalidatePath('/signup')
    redirect('/login')
}