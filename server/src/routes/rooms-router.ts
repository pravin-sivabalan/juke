import * as express from 'express';
import {Express, Request, Response} from 'express';
import {IRoom, RoomSchema, Room} from '../model/index';

export let router: Express = express();

router.get('/', (req: Request, res: Response) => {
  Room.find({}, (err: Error, iroom: IRoom[]) => {
    if(err) return res.sendStatus(500);
    res.json(iroom);
  });
});

router.post('/', (req: Request, res: Response) => {
  let newRoom = new Room(req.body);
  newRoom.save((err: Error) => {
    if(err) return res.sendStatus(500);
    res.sendStatus(200);
  });
});

router.delete('/:id', (req: Request, res: Response) => {
  Room.findByIdAndRemove(req.params.id, (err: Error) => {
    if(err) return res.sendStatus(500);
    res.sendStatus(200);
  });
});

export let addRoom = (admin: String, access_token: String, refresh_token :String) => {
  let newRoom = new Room({
    "admin":admin,
    "access_token":access_token,
    "refresh_token":refresh_token
  });

  newRoom.save((err :Error) => {
    if(err) return err;
  });
}
