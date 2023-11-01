const express = require('express');
const ratetypesRouter = express.Router();
const RateTypesModel = require('../models/mratetypes.js');

ratetypesRouter.get('/', function(req, res){
    RateTypesModel.getRateTypesList(req, res);
})

ratetypesRouter.get('/:id', function(req, res){
    RateTypesModel.getRateTypesID(req, res);
})

ratetypesRouter.post('/', function(req, res){
    RateTypesModel.createRateTypes(req, res);
})

ratetypesRouter.put('/:id', function(req, res){
    RateTypesModel.updateRateTypes(req, res);
})

ratetypesRouter.delete('/:id', function(req, res){
    RateTypesModel.deleteRateTypes(req, res);
})

module.exports = ratetypesRouter;