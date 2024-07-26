'use server'

import fs from 'fs'
import pool from '@/lib/db/db'
import { NextRequest, NextResponse } from 'next/server'

async function* nodeStreamToIterator(stream: fs.ReadStream) {
	for await (const chunk of stream) {
		yield new Uint8Array(chunk)
	}
}

function iteratorToStream(iterator: any) {
	return new ReadableStream({
		async pull(controller) {
			const { value, done } = await iterator.next()
			if (done) {
				controller.close()
			} else {
				controller.enqueue(value)
			}
		}
	})
}

export async function GET(
	req: NextRequest,
	{ params }: { params: { id: string } }
) {
	const range = req.headers.get('range')
	if (!range) {
		return NextResponse.json(
			{ msg: 'Need set range header' },
			{ status: 400 }
		)
	}

	const id = params.id

	if (id == undefined || Array.isArray(id) || parseInt(id, 10) <= 0) {
		return NextResponse.json({ msg: 'Incorrect id' }, { status: 400 })
	}

	const trackId = parseInt(id, 10)

	const trackPath = await pool
		.query('SELECT path_src FROM public.tracks WHERE id = $1', [trackId])
		.then(result => {
			if (result.rows.length == 0) {
				return
			}
			return result.rows[0].path_src as string
		})
		.catch(err => console.log(err))

	if (trackPath) {
		const CHUNK_SIZE = 1024 * 1024
		const stat = fs.statSync(trackPath)

		const start = Number(range?.replace(/\D/g, ''))
		const end = Math.min(start + CHUNK_SIZE, stat.size - 1)
		const contentLength = end - start + 1

		const readStream = fs.createReadStream(trackPath, {
			start,
			end
		})

		const data: ReadableStream = iteratorToStream(
			nodeStreamToIterator(readStream)
		)
		return new NextResponse(data, {
			status: 206,
			headers: new Headers({
				'Content-Range': `bytes ${start}-${end}/${stat.size}`,
				'Accept-Ranges': `bytes`,
				'Content-Type': 'audio/mpeg',
				'Content-Length': contentLength + ''
			})
		})
	} else {
		return NextResponse.json(
			{ msg: 'No track source path found' },
			{ status: 403 }
		)
	}
}
