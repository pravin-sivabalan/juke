export interface Track {
  _id?: string,
  uri?: string,
  title: string,
  artist: string,
  albumName: string,
  albumArt: string,
  room?: string,
  votes?: number,
  duration?: number,
  upVoted?: boolean,
  downVoted?: boolean
  isLoading?: boolean
}
