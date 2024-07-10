'use client'

import Image from 'next/image'
import { ResponseTracksList } from '@/lib/types'
import { useAppDispatch } from '@/lib/hooks'
import { setTrack } from '@/lib/trackSlice'

export default function MusicCard({ track }: { track: ResponseTracksList }) {
	const trackDispatch = useAppDispatch()

	const selectTrack = () => {
		trackDispatch(setTrack(track))
	}

	return (
		<article
			onClick={selectTrack}
			className='relative overflow-hidden select-none cursor-pointer h-full rounded-lg shadow transition hover:shadow-lg'
		>
			<Image
				width={350}
				height={350}
				alt={track.track_name}
				src={track.img_url}
				className='absolute inset-0 h-full w-full object-cover'
			/>
			<div className='relative w-full h-full bg-gradient-to-t from-gray-900/50 to-gray-900/25 '></div>
			<div className='absolute bottom-0 p-4 sm:p-6'>
				<div>
					<h3 className='mt-0.5 text-lg text-main-white'>
						{track.artist_name} - {track.track_name}
					</h3>
				</div>
			</div>
		</article>
	)
}
