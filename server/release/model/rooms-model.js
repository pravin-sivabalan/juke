import * as mongoose from 'mongoose';
export const RoomSchema = new mongoose.Schema({
    admin: {
        type: String,
        required: true
    },
    access_token: {
        type: String,
        required: true
    },
    refresh_token: {
        type: String,
        required: true
    },
    enter_token: {
        type: String,
    }
});
export const Room = mongoose.model('Room', RoomSchema, 'room');
