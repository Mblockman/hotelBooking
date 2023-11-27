const express = require('express');
const roomstatusRouter = express.Router();
const RoomStatusModel = require('../models/mroomstatus.js');

roomstatusRouter.get('/', function(req, res){
    RoomStatusModel.getRoomStatusList(req, res);
})

roomstatusRouter.get('/:id', function(req, res){
    RoomStatusModel.getRoomStatusID(req, res);
})

roomstatusRouter.post('/', function(req, res){
    RoomStatusModel.createRoomStatus(req, res);
})

roomstatusRouter.put('/:id', function(req, res){
    RoomStatusModel.updateRoomStatus(req, res);
})

roomstatusRouter.delete('/:id', function(req, res){
    RoomStatusModel.deleteRoomStatus(req, res);
})

module.exports = roomstatusRouter;