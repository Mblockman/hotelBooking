const express = require('express');
const ratesRouter = express.Router();
const RatesModel = require('../models/mrates.js');

ratesRouter.get('/', function(req, res){
    RatesModel.getRatesList(req, res);
})

ratesRouter.get('/:id', function(req, res){
    RatesModel.getRatesID(req, res);
})

ratesRouter.post('/', function(req, res){
    RatesModel.createRates(req, res);
})

ratesRouter.put('/:id', function(req, res){
    RatesModel.updateRates(req, res);
})

ratesRouter.delete('/:id', function(req, res){
    RatesModel.deleteRates(req, res);
})

module.exports = ratesRouter;