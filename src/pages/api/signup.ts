'use server'

import type { NextApiRequest, NextApiResponse } from 'next'
import pool from '@/lib/db/db'

type ResponseData = {
	msg: string
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>
) {
	req.method !== 'POST' && res.status(400).json({ msg: 'error' })

	const data = JSON.parse(req.body)

	// const client = await pool.connect()
	await pool
		.query(
			`INSERT INTO users(login, password) VALUES ('${data.login}', '${data.password}')`
		)
		.then(result => {
			res.status(200).json({ msg: 'Success registered' })
		})
		.catch(err => {
			res.status(500).json({
				msg: 'Something in signup query went wrong'
			})
		})
	// client.release()
}
