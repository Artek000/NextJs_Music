'use server'

import type { NextApiRequest, NextApiResponse } from 'next'
import jsonwebtoken from 'jsonwebtoken'
import pool from '@/lib/db/db'
import { ResponseLoginData } from '@/lib/types'

const jwt = jsonwebtoken

export default async function loginHandler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseLoginData>
) {
	req.method !== 'POST' && res.status(400).json({ msg: 'error request' })

	const data = JSON.parse(req.body)

	await pool
		.query(
			`SELECT id, login FROM users WHERE login='${data.login}' AND password='${data.password}'`
		)
		.then(result => {
			if (result.rows.length == 0) {
				res.status(403).json({ msg: 'Incorrect user data.' })
				// throw new Error('Incorrect user data.');
			}
			const token = jwt.sign(
				{ id: result.rows[0].id, login: result.rows[0].login },
				`${process.env.JWT_SECRET}`,
				{ expiresIn: '15m' }
			)
			res.status(200).json({
				msg: 'Successfully logged in!',
				token: token,
				id: result.rows[0].id,
				login: result.rows[0].login
			})
		})
		.catch(err => {
			res.status(403).json({ msg: err.toString() })
		})
}
