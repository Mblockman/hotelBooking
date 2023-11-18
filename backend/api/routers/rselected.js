const express = require('express');
const selectedRouter = express.Router();
const ReservationModel = require('../models/mselected.js');

selectedRouter.get('/list', function(req, res){
    var url = require('url');
    var queryData = url.parse(req.url,true).query;
    if (Object.keys(queryData).length != 0){ req.body = queryData};
    ReservationModel.getReservationList(req, res);
})

selectedRouter.get('/one', function(req, res){
    var url = require('url');
    var queryData = url.parse(req.url,true).query;
    if (Object.keys(queryData).length != 0){ req.body = queryData};
    ReservationModel.getReservationOne(req, res);
})
selectedRouter.get('/typecount', function(req, res){
    var url = require('url');
    var queryData = url.parse(req.url,true).query;
    if (Object.keys(queryData).length != 0){ req.body = queryData};
    ReservationModel.getReservationTypeCount(req, res);
})

selectedRouter.get('/typelist', function(req, res){
    var url = require('url');
    var queryData = url.parse(req.url,true).query;
    if (Object.keys(queryData).length != 0){ req.body = queryData};
    ReservationModel.getReservationTypeList(req, res);
})

selectedRouter.get('/rate', function(req, res){
    var url = require('url');
    var queryData = url.parse(req.url,true).query;
    if (Object.keys(queryData).length != 0){ req.body = queryData};
    ReservationModel.getRate(req, res);
})

selectedRouter.get('/notroomlist', function(req, res){
    var url = require('url');
    var queryData = url.parse(req.url,true).query;
    if (Object.keys(queryData).length != 0){ req.body = queryData};
    ReservationModel.getNotRoomList(req, res);
})

module.exports = selectedRouter;