import Image from 'next/image'

export default function MusicCard({
	imgURL,
	artistName,
	trackName
}: {
	imgURL: string
	artistName: string
	trackName: string
}) {
	return (
		<article className='relative overflow-hidden select-none cursor-pointer h-full rounded-lg shadow transition hover:shadow-lg'>
			<Image
				width={350}
				height={350}
				alt=''
				src={imgURL}
				className='absolute inset-0 h-full w-full object-cover'
			/>
			<div className='relative w-full h-full bg-gradient-to-t from-gray-900/50 to-gray-900/25 '></div>
			<div className='absolute bottom-0 p-4 sm:p-6'>
				<div>
					<h3 className='mt-0.5 text-lg text-main-white'>
						{artistName} - {trackName}
					</h3>
				</div>
			</div>
		</article>
	)
}
