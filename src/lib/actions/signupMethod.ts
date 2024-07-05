'use server'

import { z } from 'zod'

export async function signupMethod(formData: FormData) {
	const User = z.object({
		login: z
			.string()
			.trim()
			.min(3, { message: 'Login must contain at least 3 character' }),
		password: z
			.string()
			.trim()
			.min(3, { message: 'Password must contain at least 3 character' })
	})

	type User = z.infer<typeof User>

	const login = formData.get('login') as string
	const password = formData.get('password') as string

	const userData: User = {
		login: login,
		password: password
	}

	let userDataParse

	try {
		userDataParse = User.safeParse(userData)

		if (!userDataParse.success && userDataParse.error) {
			throw new Error(userDataParse.error.issues[0].message)
		}
	} catch (error) {
		throw error
	}

	const _body = JSON.stringify(userDataParse.data)

	await fetch('http://localhost:3000/api/signup', {
		method: 'POST',
		body: _body
	})
		.then(res => {
			switch (res.status) {
				case 200:
					// console.log(res)
					break
				case 500:
					// console.log(res)
					throw new Error('Something in signup method went wrong')
			}
		})
		.catch(err => {
			// console.log(err.toString())
			throw err
		})
}
