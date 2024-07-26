'use server'

import { ResponseTracksList } from '@/lib/types'

export async function getTrackListAction(): Promise<ResponseTracksList[]> {
	// if (!res.ok) {
	// 	throw new Error('Failed to fetch tracks')
	// }
	return await fetch(
		process.env.NEXT_PUBLIC_SERVER_API_URL + '/api/get_tracklist',
		{
			method: 'GET',
			cache: 'no-cache'
		}
	).then(res => res.json())
}
