const express = require('express');
const hotelRoutes = express.Router();
const HotelsModel = require('../models/mhotels.js');

hotelRoutes.get('/', function(req, res){
    HotelsModel.getHotelsList(req, res);
})

hotelRoutes.get('/:id', function(req, res){
    HotelsModel.getHotelsID(req, res);
})

hotelRoutes.post('/', function(req, res){
    HotelsModel.createHotels(req, res);
})

hotelRoutes.put('/:id', function(req, res){
    HotelsModel.updateHotel(req, res);
})

hotelRoutes.delete('/:id', function(req, res){
    HotelsModel.deleteHotel(req, res);
})

module.exports = hotelRoutes;