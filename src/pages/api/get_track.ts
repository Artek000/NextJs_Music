import fs from 'fs'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function getTrackHandler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const range = req.headers.range
	if (!range) {
		res.status(400).send('Need set range header')
	}

	const CHUNK_SIZE = 1024 * 1024
	const stat = fs.statSync('./src/files/FISHER_Losing_It.mp3')

	const start = Number(range?.replace(/\D/g, ''))
	const end = Math.min(start + CHUNK_SIZE, stat.size - 1)
	const contentLength = end - start + 1

	res.writeHead(206, {
		'Content-Range': `bytes ${start}-${end}/${stat.size}`,
		'Accept-Ranges': `bytes`,
		'Content-Type': 'audio/mpeg',
		'Content-Length': contentLength
	})

	const readStream = fs.createReadStream('./src/files/FISHER_Losing_It.mp3', {
		start,
		end
	})

	readStream.pipe(res)
}
