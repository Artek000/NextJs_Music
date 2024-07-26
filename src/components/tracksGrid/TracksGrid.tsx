'use client'

import MusicCard from '@/UI/cards/MusicCard'
import { ResponseTracksList } from '@/lib/types'

export default function TracksGrid({
	trackList
}: {
	trackList: ResponseTracksList | ResponseTracksList[]
}) {
	// console.log(trackList)

	return (
		<div className='grid grid-cols-1 gap-4 h-full w-full lg:grid-cols-4 lg:gap-8'>
			{Array.isArray(trackList) &&
				trackList.map(track => (
					<div key={track.id} className='rounded-lg bg-gray-200 h-60'>
						<MusicCard track={track} />
					</div>
				))}
		</div>
	)
}
