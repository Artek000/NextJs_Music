'use server'

import jsonwebtoken from 'jsonwebtoken'
import pool from '@/lib/db/db'
import { NextRequest, NextResponse } from 'next/server'

const jwt = jsonwebtoken

export async function POST(req: NextRequest) {
	const data = await req.json()

	return await pool
		.query(
			`SELECT id, login FROM users WHERE login='${data.login}' AND password='${data.password}'`
		)
		.then(result => {
			if (result.rows.length == 0) {
				return NextResponse.json(
					{ msg: 'Incorrect user data.' },
					{ status: 403 }
				)
				// throw new Error('Incorrect user data.');
			}
			const token = jwt.sign(
				{ id: result.rows[0].id, login: result.rows[0].login },
				`${process.env.JWT_SECRET}`,
				{ expiresIn: '15m' }
			)
			return NextResponse.json(
				{
					msg: 'Successfully logged in!',
					token: token,
					id: result.rows[0].id,
					login: result.rows[0].login
				},
				{ status: 200 }
			)
		})
		.catch(err => {
			return NextResponse.json({ msg: err.toString() }, { status: 403 })
		})
}
