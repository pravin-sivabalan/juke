import * as mongoose from 'mongoose';

export interface ITrack extends mongoose.Document{
  admin: String,
  votes: Number,
  trackName: String,
  trackId: String,
  artist: String,
  album: String,
  albumArt: String,
}

export const TrackSchema: mongoose.Schema = new mongoose.Schema({
  admin: {
    type: String,
    required: true
  },
  votes: {
    type: Number,
    required: true,
    default: 0
  },
  trackName: {
    type: String,
    required: true
  },
  trackId: {
    type: String,
    required: true
  },
  artist: {
    type: String,
    required: true
  },
  album: {
    type: String,
    required: true
  },
  albumArt: {
    type: String,
    required: true
  }
});

export const Track = mongoose.model<ITrack>('Track', TrackSchema, 'track');
