'use server'

import type { NextApiRequest, NextApiResponse } from 'next'
import pool from '@/lib/db/db'
import { ResponseTracksList, ResponseTracksListError } from '@/lib/types'

export default async function trackListHandler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseTracksList[] | ResponseTracksListError>
) {
	req.method !== 'GET' && res.status(400).json({ msg: 'error request' })

	await pool
		.query(
			'SELECT track.id, artist.name as artist_name, track.name as track_name, track.img_src as img_url FROM public.tracks track JOIN public.artists artist ON track.artist_id = artist.id'
		)
		.then(result => {
			if (result.rows.length == 0) {
				res.status(403).json({ msg: 'No Tracks' })
			}
			res.status(200).json(result.rows as ResponseTracksList[])
		})
		.catch(err => {
			res.status(403).json({ msg: err.toString() })
		})
}
