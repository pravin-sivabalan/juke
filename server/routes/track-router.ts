import * as _ from 'lodash';
import * as express from 'express';
import { socket } from '../socket';
import { Express, Request, Response } from 'express';
import { ITrack, TrackSchema, Track } from '../models/index';

export let track: Express = express();

track.get('/', (req: Request, res: Response) => {
  Track.find({}).lean().exec((err: Error, data: ITrack[]) => {
    if(err) return res.sendStatus(500);
    let tracks = data;
    for(let i = 0; i < tracks.length; i++) {
      if(_.includes(tracks[i].upVotedUsers, req.session.username)) {
        tracks[i].upVoted = true;
      } else if(_.includes(tracks[i].downVotedUsers, req.session.username)) {
        tracks[i].downVoted = true;
      }
      delete tracks[i].upVotedUsers;
      delete tracks[i].downVotedUsers;
    }
    return res.json(tracks);
  });
});

track.patch('/:id', (req: Request, res: Response) => {
  const updatedObj = req.body;
  Track.findByIdAndUpdate(req.params.id, {$set: updatedObj}, (err: Error, track: ITrack) => {
    if(err) return res.sendStatus(500);
    return res.json(track);
  });
})

track.post('/', (req: Request, res: Response) => {
  let newTrack = new Track(req.body);
  newTrack.save((err: Error) => {
    if(err) return res.sendStatus(500);
    const track = _.clone(req.body);
    track._id = newTrack._id;
    track.votes = 0;
    socket.emitAddTrack(track);
    return res.sendStatus(204);
  });
});

track.delete('/:id', (req: Request, res: Response) => {
  Track.findByIdAndRemove(req.params.id, (err: Error) => {
    if(err) return res.sendStatus(500);
    socket.emitDeleteTrack(req.params.id);
    return res.sendStatus(204);
  })
});

track.get('/upvote/:id', (req: Request, res: Response) => {
  Track.findById(req.params.id, (err: Error, track: ITrack) => {
    if(err) return res.sendStatus(500);
    if(_.includes(track.upVotedUsers, req.session.username)) return res.sendStatus(409);
    track.votes++;
    track.upVoted = true;
    track.downVoted = false;
    track.upVotedUsers.push(req.session.username);
    for(let i = 0; i < track.downVotedUsers.length; i++) {
      if(track.downVotedUsers[i] === req.session.username) {
        track.downVotedUsers.splice(i, 1);
        break;
      }
    }
    let newTrack = new Track(track);
    newTrack.save((err: Error) => {
      if(err) return res.sendStatus(500);
      socket.emitVote(newTrack._id, newTrack.votes);
      return res.json({votes: newTrack.votes});
    })
  })
});

track.get('/downvote/:id', (req: Request, res: Response) => {
  Track.findById(req.params.id, (err: Error, track: ITrack) => {
    if(err) return res.sendStatus(500);
    if(_.includes(track.downVotedUsers, req.session.username)) return res.sendStatus(409);
    track.votes--;
    track.downVoted = true;
    track.upVoted = false;
    track.downVotedUsers.push(req.session.username);
    for(let i = 0; i < track.upVotedUsers.length; i++) {
      if(track.upVotedUsers[i] === req.session.username) {
        track.upVotedUsers.splice(i, 1);
        break;
      }
    }
    let newTrack = new Track(track);
    newTrack.save((err: Error) => {
      if(err) return res.sendStatus(500);
      socket.emitVote(newTrack._id, newTrack.votes);
      return res.json({votes: newTrack.votes});
    })
  })
});
