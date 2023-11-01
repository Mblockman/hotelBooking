const express = require('express');
const bookingstatusRouter = express.Router();
const bookingstatusModel = require('../models/mbookingstatus.js');

bookingstatusRouter.get('/', function(req, res){
    bookingstatusModel.getBookingstatusList(req, res);
})

bookingstatusRouter.get('/:id', function(req, res){
    bookingstatusModel.getBookingstatusID(req, res);
})

bookingstatusRouter.post('/', function(req, res){
    bookingstatusModel.createBookingstatus(req, res);
})

bookingstatusRouter.put('/:id', function(req, res){
    bookingstatusModel.updateBookingstatus(req, res);
})

bookingstatusRouter.delete('/:id', function(req, res){
    bookingstatusModel.deleteBookingstatus(req, res);
})

module.exports = bookingstatusRouter;