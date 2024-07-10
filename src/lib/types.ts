export interface ResponseTracksList {
	id: number
	artist_name: string
	track_name: string
	img_url: string
}

export type ResponseTracksListError = {
	msg: string
}

export type ResponseLoginData = {
	msg: string
	token?: string
	id?: string
	login?: string
}

export type ResponseLoginDataError = {}

export type ResponseSignUpData = {}

export type ResponseSignUpDataError = {
	msg: string
}
