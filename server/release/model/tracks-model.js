import * as mongoose from 'mongoose';
export const TrackSchema = new mongoose.Schema({
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
export const Track = mongoose.model('Track', TrackSchema, 'track');
