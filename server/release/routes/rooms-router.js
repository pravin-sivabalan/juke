import * as express from 'express';
import { Room } from '../model/index';
export let router = express();
router.get('/rooms', (req, res) => {
    Room.find({}, (err, iroom) => {
        if (err)
            return res.sendStatus(500);
        res.json(iroom);
    });
});
router.post('/rooms', (req, res) => {
    let newRoom = new Room(req.body);
    newRoom.save((err) => {
        if (err)
            return res.sendStatus(500);
        res.sendStatus(200);
    });
});
router.delete('/rooms/:id', (req, res) => {
    Room.findByIdAndRemove(req.params.id, (err) => {
        if (err)
            return res.sendStatus(500);
        res.sendStatus(200);
    });
});
export let addRoom = (admin, access_token, refresh_token) => {
    let newRoom = new Room({
        "admin": admin,
        "access_token": access_token,
        "refresh_token": refresh_token
    });
    newRoom.save((err) => {
        if (err)
            return err;
    });
};
