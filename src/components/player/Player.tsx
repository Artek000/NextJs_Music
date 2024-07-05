'use client'

import {
	PlayIcon,
	PauseIcon,
	BackwardIcon,
	ForwardIcon
} from '@heroicons/react/24/solid'
import { useRef, useState } from 'react'

export default function Player() {
	const audioRef = useRef<HTMLAudioElement>(null)
	const progressRef = useRef<HTMLInputElement>(null)
	const [isPlaying, setIsPlaying] = useState<boolean>(false)
	const [currentTime, setCurrentTime] = useState<string>('00:00')
	const [duration, setDuration] = useState<string>('00:00')

	const togglePlayPause = () => {
		if (audioRef.current) {
			setIsPlaying(prev => !prev)
			if (isPlaying) {
				audioRef.current.pause()
			} else {
				audioRef.current.play()
			}
		}
	}

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
						{/*<div className='absolute h-full w-5/12 rounded-lg bg-main-light'></div>*/}
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
			>
				<source type='audio/mpeg' src='/api/get_track' />
			</audio>
		</div>
	)
}
