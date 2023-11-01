const express = require('express');
const roomtypesRouter = express.Router();
const RoomTypesModel = require('../models/mroomtypes.js');

roomtypesRouter.get('/', function(req, res){
    RoomTypesModel.getRoomTypesList(req, res);
})

roomtypesRouter.get('/:id', function(req, res){
    RoomTypesModel.getRoomTypesID(req, res);
})

roomtypesRouter.post('/', function(req, res){
    RoomTypesModel.createRoomTypes(req, res);
})

roomtypesRouter.put('/:id', function(req, res){
    RoomTypesModel.updateRoomTypes(req, res);
})

roomtypesRouter.delete('/:id', function(req, res){
    RoomTypesModel.deleteRoomTypes(req, res);
})

module.exports = roomtypesRouter;