const express = require('express');
const selectedRouter = express.Router();
const ReservationModel = require('../models/mselected.js');
// const guestsModel = require('../models/mguests.js');

//const BookingModel = require('../models/mbooking.js');

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
    //console.log(req.body);
    ReservationModel.getReservationTypeCount(req, res);
})

selectedRouter.get('/typelist', function(req, res){
    var url = require('url');
    var queryData = url.parse(req.url,true).query;
    if (Object.keys(queryData).length != 0){ req.body = queryData};
    //console.log(req.body);
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

selectedRouter.post('/booking', function(req, res){
    //console.log(req);

    //const cloneObj = obj => JSON.parse(JSON.stringify(obj));
    //const queryData = cloneObj(req.body);

    
    ReservationModel.totalbooking(req, res);
    
    /*
    console.log('*1******************************', queryData);
    //req1.params.email = queryData.geMailAddress;
    console.log('*2******************************', req1.params.email );
   // guestsModel.getGuestsEmail(req1, res1);
    //console.log('*3******************************', req1, res1);
    */
    //console.log('return data :', guestsModel.insertID);
    //let guestsid = guestsModel.insertID
    //console.log('return data :',res);

    //guestsModel.getGuestsEmail(req, res);
    //req.params.email = queryData.geMailAddress;
    //guestsModel.getGuestsEmail(req, res);
    //console.log(res);
    //var guestsid = res
    //ReservationModel.getNotRoomList(req, res);
})

module.exports = selectedRouter;