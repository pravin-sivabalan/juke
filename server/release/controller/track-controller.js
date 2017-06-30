import { Track } from '../model/index';
export class controller {
    getTracks(req, res) {
        Track.find({ admin: req.params.id }, (err, itrack) => {
            if (err)
                return res.sendStatus(500);
            res.json(itrack);
        });
    }
    postTrack(req, res) {
        let newRoom = new Track(req.body);
        newRoom.save((err) => {
            if (err)
                return res.sendStatus(500);
            res.sendStatus(200);
        });
    }
    deleteTrack(req, res) {
        Track.findByIdAndRemove(req.params.id, (err) => {
            if (err)
                return res.sendStatus(500);
            res.sendStatus(200);
        });
    }
}
export let TrackController = new controller();
