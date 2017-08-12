import * as mongoose from 'mongoose';

export interface ITrack {
  room: string,
  uri: string,
  title: string,
  artist: string,
  albumName: string,
  albumArt: string,
  duation: Number,
  votes: number,
  played: boolean,
  _id?: string,
  upVotedUsers?: String[],
  downVotedUsers?: String[],
  upVoted?: boolean,
  downVoted?: boolean
}

export const TrackSchema = new mongoose.Schema({
  uri: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  artist: {
    type: String,
    required: true
  },
  albumName: {
    type: String,
    required: true
  },
  albumArt: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  upVotedUsers: {
    type: [String],
    default: []
  },
  downVotedUsers: {
    type: [String],
    default: []
  },
  votes: {
    type: Number,
    default: 0
  },
  played: {
    type: Boolean,
    default: false
  }

});

export const Track = mongoose.model<ITrack>('Track', TrackSchema, 'track');
