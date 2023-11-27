const express = require('express');
const bookedRoutes = express.Router();
const BookedModel = require('../models/mbooked.js');

bookedRoutes.get('/', function(req, res){
    BookedModel.getBookedList(req, res);
})

bookedRoutes.get('/:id', function(req, res){
    BookedModel.getBookedID(req, res);
})

bookedRoutes.post('/', function(req, res){
    BookedModel.createBooked(req, res);
})

bookedRoutes.put('/:id', function(req, res){
    BookedModel.updateBooked(req, res);
})

bookedRoutes.delete('/:id', function(req, res){
    BookedModel.deleteBooked(req, res);
})

module.exports = bookedRoutes;