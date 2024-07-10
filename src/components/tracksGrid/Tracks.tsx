'use server'

import { getTrackListAction } from '@/lib/actions/getTrackListAction'
import TracksGrid from '@/components/tracksGrid/TracksGrid'

export default async function Tracks() {
	const trackList = await getTrackListAction()

	return <TracksGrid trackList={trackList} />
}
