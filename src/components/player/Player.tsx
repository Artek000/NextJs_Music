'use client'

import {
	PlayIcon,
	PauseIcon,
	BackwardIcon,
	ForwardIcon
} from '@heroicons/react/24/solid'
import { useEffect, useRef, useState } from 'react'
import { useAppSelector } from '@/lib/hooks'
import { selectTrack } from '@/lib/trackSlice'

export default function Player() {
	const audioRef = useRef<HTMLAudioElement>(null)
	const progressRef = useRef<HTMLInputElement>(null)
	const bufferRef = useRef<HTMLInputElement>(null)
	const [isPlaying, setIsPlaying] = useState<boolean>(false)
	const [currentTime, setCurrentTime] = useState<string>('00:00')
	const [duration, setDuration] = useState<string>('00:00')
	const currTrack = useAppSelector(state => selectTrack(state))

	const togglePlayPause = () => {
		if (audioRef.current) {
			if (isPlaying) {
				audioRef.current.pause()
				setIsPlaying(prev => !prev)
			} else {
				audioRef.current.play().then(() => {
					setIsPlaying(prev => !prev)
				})
			}
		}
	}

	useEffect(() => {
		if (audioRef.current && currTrack.id > 0) {
			audioRef.current.pause()
			setIsPlaying(false)
			audioRef.current.load()
			audioRef.current.play().then(() => {
				setIsPlaying(true)
			})
			// console.log('effect')
		}
	}, [currTrack.id])

	const onLoadedMetadata = () => {
		if (audioRef.current && progressRef.current) {
			progressRef.current.max = String(audioRef.current.duration)
			setDuration(formatTime(audioRef.current.duration))
		}
	}

	const onTimelineChange = () => {
		if (audioRef.current && progressRef.current) {
			audioRef.current.currentTime = parseInt(
				progressRef.current.value,
				10
			)
			setCurrentTime(formatTime(audioRef.current.currentTime))
		}
	}

	const onTimeUpdate = () => {
		if (audioRef.current && progressRef.current) {
			setCurrentTime(formatTime(audioRef.current.currentTime))
			progressRef.current.value = String(audioRef.current.currentTime)
			if (audioRef.current.buffered.length > 0 && bufferRef.current) {
				bufferRef.current.style.width =
					(audioRef.current.buffered.end(0) /
						audioRef.current.duration) *
						100 +
					'%'
			}
		}
	}

	const formatTime = (time: number) => {
		if (time > 0) {
			const minutes = Math.floor(time / 60)
			const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`
			const seconds = Math.floor(time % 60)
			const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`
			return `${formatMinutes}:${formatSeconds}`
		}
		return '00:00'
	}

	return (
		<div className='absolute bottom-0 left-0 right-0 mx-auto w-full h-16 bg-secondary lg:rounded-t-lg lg:max-w-7xl'>
			<div className='flex items-center justify-center h-full'>
				<div className='mx-auto h-full flex flex-row justify-center items-center'>
					{currTrack.id !== 0 && (
						<div className='mr-2 p-2 select-none text-main-white text-xl'>
							<span className='tracking-widest tabular-nums'>
								{currTrack.artist_name}
							</span>
							<span>&nbsp;-&nbsp;</span>
							<span className='tracking-widest tabular-nums'>
								{currTrack.track_name}
							</span>
						</div>
					)}
					<button className='w-9 h-9 bg-main-dark rounded-full flex justify-center items-center'>
						<BackwardIcon className='w-6 h-6 fill-main-white' />
					</button>
					<button className='w-12 h-12 mx-2 bg-main-dark rounded-full flex justify-center items-center'>
						{isPlaying ? (
							<PauseIcon
								className='w-8 h-8 fill-main-white'
								onClick={togglePlayPause}
							/>
						) : (
							<PlayIcon
								className='w-8 h-8 fill-main-white'
								onClick={togglePlayPause}
							/>
						)}
					</button>
					<button className='w-9 h-9 bg-main-dark rounded-full flex justify-center items-center'>
						<ForwardIcon className='w-6 h-6 fill-main-white' />
					</button>

					<div className='ml-2 p-2 select-none text-main-white text-xs'>
						<span className='tracking-widest tabular-nums'>
							{currentTime}
						</span>
						<span>/</span>
						<span className='tracking-widest tabular-nums'>
							{duration}
						</span>
					</div>
					<div className='relative h-3 w-40 rounded-lg ml-2 bg-main-white'>
						{/* download bar*/}
						<div
							ref={bufferRef}
							className='absolute h-full rounded-lg bg-main-light'
						></div>
						{/* timeline bar*/}
						<input
							type='range'
							ref={progressRef}
							onChange={onTimelineChange}
							defaultValue={0}
							className='absolute h-full w-full rounded-lg bg-transparent appearance-none cursor-pointer slider'
						/>
					</div>
				</div>
			</div>
			<audio
				ref={audioRef}
				onTimeUpdate={onTimeUpdate}
				onLoadedMetadata={onLoadedMetadata}
				preload='auto'
			>
				<source
					type='audio/mpeg'
					src={`/api/get_track/${currTrack.id}`}
				/>
			</audio>
		</div>
	)
}
