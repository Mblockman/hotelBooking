const express = require('express');
const guestsRouter = express.Router();
const guestsModel = require('../models/mguests.js');

guestsRouter.get('/', function(req, res){
    guestsModel.getGuestsList(req, res);
})

guestsRouter.get('/:id', function(req, res){
    guestsModel.getGuestsID(req, res);
})

guestsRouter.get('/email/:email', function(req, res){
    guestsModel.getGuestsEmail(req, res);
})

guestsRouter.post('/', function(req, res){
    //console.log(req.body);
    guestsModel.createGuests(req, res);
})

guestsRouter.put('/:id', function(req, res){
    guestsModel.updateGuests(req, res);
})

guestsRouter.delete('/:id', function(req, res){
    guestsModel.deleteGuests(req, res);
})

module.exports = guestsRouter;