'use server'

import pool from '@/lib/db/db'
import { ResponseTracksList, ResponseTracksListError } from '@/lib/types'
import { NextResponse } from 'next/server'

export async function GET(
	req: Request
) /*: Promise<ResponseTracksList[] | ResponseTracksListError>*/ {
	return await pool
		.query(
			'SELECT track.id, artist.name as artist_name, track.name as track_name, track.img_src as img_url FROM public.tracks track JOIN public.artists artist ON track.artist_id = artist.id'
		)
		.then(result => {
			if (result.rows.length == 0) {
				return NextResponse.json({ msg: 'No Tracks' }, { status: 403 })
			}
			return NextResponse.json(result.rows as ResponseTracksList[], {
				status: 200
			})
		})
		.catch(err => {
			return NextResponse.json({ msg: err.toString() }, { status: 500 })
		})
}
