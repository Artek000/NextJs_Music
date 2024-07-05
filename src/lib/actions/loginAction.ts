'use server'

import { loginMethod } from '@/lib/actions/loginMethod'

export async function loginAction(formData: FormData) {
	try {
		// console.log('res', data);
		return await loginMethod(formData)
	} catch (error) {
		if (error) {
			return { error: error.toString() }
		}
		throw error
	}
}
