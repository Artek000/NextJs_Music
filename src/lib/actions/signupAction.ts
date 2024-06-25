'use server'

import {signupMethod} from "@/lib/actions/signupMethod";

export async function signupAction(_currentState: unknown, formData: FormData) {
    try {
        await signupMethod(formData)
    } catch (error) {
        if (error) {
            return error.toString()
        }
        throw error
    }
}