import MusicCard from '@/UI/cards/MusicCard'

export default function TracksGrid() {
	const tracksArray: {
		imgURL: string
		artistName: string
		trackName: string
	}[] = [
		{
			imgURL: 'https://static.vecteezy.com/system/resources/thumbnails/026/795/346/small_2x/abstract-illustration-of-musical-instruments-ai-generative-png.png',
			artistName: 'Name 1',
			trackName: 'Track 1'
		},
		{
			imgURL: '',
			artistName: 'Name 2',
			trackName: 'Track 2'
		}
	]

	return (
		<div className='grid grid-cols-1 gap-4 h-full w-full lg:grid-cols-4 lg:gap-8'>
			{tracksArray &&
				tracksArray.map((track, index) => (
					<div key={index} className='rounded-lg bg-gray-200 h-60'>
						<MusicCard
							imgURL={track.imgURL}
							artistName={track.artistName}
							trackName={track.trackName}
						/>
					</div>
				))}
		</div>
	)
}
