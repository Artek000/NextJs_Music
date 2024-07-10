'use server'

import { ResponseTracksList } from '@/lib/types'

export async function getTrackListAction(): Promise<ResponseTracksList[]> {
	// if (!res.ok) {
	// 	throw new Error('Failed to fetch tracks')
	// }
	return await fetch('http://localhost:3000/api/get_tracklist', {
		cache: 'no-cache'
	})
		.then(res => res.json())
		.then(data => {
			return data
		})
}
