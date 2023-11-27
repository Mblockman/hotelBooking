const express = require('express');
const bookingRouter = express.Router();
const BookingModel = require('../models/mbooking.js');

bookingRouter.get('/', function(req, res){
    BookingModel.getBookingList(req, res);
})

bookingRouter.get('/:id', function(req, res){
    BookingModel.getBookingID(req, res);
})

bookingRouter.post('/', function(req, res){
    BookingModel.createBooking(req, res);
})

bookingRouter.put('/:id', function(req, res){
    BookingModel.updateBooking(req, res);
})

bookingRouter.delete('/:id', function(req, res){
    BookingModel.deleteBooking(req, res);
})

module.exports = bookingRouter;