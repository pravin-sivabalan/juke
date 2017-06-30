import * as mongoose from 'mongoose';

export interface IRoom extends mongoose.Document{
  admin :string;
  access_token :string;
  refresh_token :string;
  enter_token :string;
}

export const RoomSchema: mongoose.Schema = new mongoose.Schema({
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

export const Room = mongoose.model<IRoom>('Room', RoomSchema, 'room');
