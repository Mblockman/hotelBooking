const express = require('express');
const roomsRouter = express.Router();
const RoomsModel = require('../models/mrooms.js');

roomsRouter.get('/', function(req, res){
    RoomsModel.getRoomsList(req, res);
})

roomsRouter.get('/:id', function(req, res){
    RoomsModel.getRoomsID(req, res);
})

roomsRouter.post('/', function(req, res){
    RoomsModel.createRooms(req, res);
})

roomsRouter.put('/:id', function(req, res){
    RoomsModel.updateRooms(req, res);
})

roomsRouter.delete('/:id', function(req, res){
    RoomsModel.deleteRooms(req, res);
})

module.exports = roomsRouter;