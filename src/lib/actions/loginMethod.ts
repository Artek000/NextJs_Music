'use server'

import { z } from 'zod'

export async function loginMethod(formData: FormData) {
	const User = z.object({
		login: z.string().trim(),
		password: z.string().trim()
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

	return await fetch(process.env.NEXT_PUBLIC_SERVER_API_URL + '/api/login', {
		cache: 'no-cache',
		method: 'POST',
		body: _body
	})
		.then(res => {
			switch (res.status) {
				case 200:
					// console.log(res)
					return res.json()
				case 403:
					throw new Error('Something in data login method went wrong') //достать ошибку из json и подставить
				case 500:
					// console.log(res)
					throw new Error('Something in login method went wrong')
			}
		})
		.catch(err => {
			// console.log(err.toString())
			throw err
		})
}
