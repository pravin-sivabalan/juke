import * as mongoose from 'mongoose';

export interface IRoom {
  code: string,
  access_token: string,
  isActive: boolean,
  isPaused: boolean,
  members: String[]
}

export const RoomSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true
  },
  access_token: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: false
  },
  isPaused: {
    type: Boolean,
    default: false
  },
  members: {
    type: [String],
    default: []
  }
});

export const Room = mongoose.model<IRoom>('Room', RoomSchema, 'room');
