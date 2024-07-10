import fs from 'fs'
import type { NextApiRequest, NextApiResponse } from 'next'
import pool from '@/lib/db/db'

export default async function getTrackHandler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const range = req.headers.range
	if (!range) {
		res.status(400).send('Need set range header')
	}

	const { id } = req.query

	if (id == undefined || Array.isArray(id) || parseInt(id, 10) <= 0) {
		res.status(400).send('Incorrect id')
		return
	}

	const trackId = parseInt(id, 10)

	const trackPath = await pool
		.query('SELECT path_src FROM public.tracks WHERE id = $1', [trackId])
		.then(result => {
			if (result.rows.length == 0) {
				res.status(403).json({ msg: 'No track source path found' })
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

		res.writeHead(206, {
			'Content-Range': `bytes ${start}-${end}/${stat.size}`,
			'Accept-Ranges': `bytes`,
			'Content-Type': 'audio/mpeg',
			'Content-Length': contentLength
		})

		const readStream = fs.createReadStream(trackPath, {
			start,
			end
		})

		readStream.pipe(res)
	}
}
