const express = require('express');
const selectedRouter = express.Router();
const ReservationModel = require('../models/mselected.js');

selectedRouter.get('/list', function(req, res){
    ReservationModel.getReservationList(req, res);
})

selectedRouter.get('/one', function(req, res){
    ReservationModel.getReservationOne(req, res);
})
selectedRouter.get('/typecount', function(req, res){
    ReservationModel.getReservationTypeCount(req, res);
})

selectedRouter.get('/typelist', function(req, res){
    ReservationModel.getReservationTypeList(req, res);
})

selectedRouter.get('/rate', function(req, res){
    ReservationModel.getRate(req, res);
})

selectedRouter.get('/notroomlist', function(req, res){
    ReservationModel.getNotRoomList(req, res);
})

module.exports = selectedRouter;