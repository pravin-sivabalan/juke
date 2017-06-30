import {Express, Request, Response} from 'express';
import {ITrack, TrackSchema, Track} from '../model/index';

export class controller {
  getTracks(req: Request, res: Response){
    Track.find({admin:req.params.id}, (err: Error, itrack: ITrack[]) => {
      if(err) return res.sendStatus(500);
      res.json(itrack);
    });
  }

  postTrack(req: Request, res: Response){
    let newRoom = new Track(req.body);

    newRoom.save((err: Error) => {
      if(err) return res.sendStatus(500);
      res.sendStatus(200);
    });
  }

  deleteTrack(req: Request, res: Response){
    Track.findByIdAndRemove(req.params.id, (err: Error) => {
      if(err) return res.sendStatus(500);
      res.sendStatus(200);
    })
  }
}

export let TrackController = new controller();
