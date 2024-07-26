'use server'

import pool from '@/lib/db/db'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
	const data = await req.json()

	// const client = await pool.connect()
	return await pool
		.query(
			`INSERT INTO users(login, password) VALUES ('${data.login}', '${data.password}')`
		)
		.then(result => {
			return NextResponse.json(
				{ msg: 'Success registered' },
				{ status: 200 }
			)
		})
		.catch(err => {
			return NextResponse.json(
				{
					msg: 'Something in signup query went wrong'
				},
				{ status: 500 }
			)
		})
	// client.release()
}
