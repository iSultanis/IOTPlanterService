var express = require('express');
var sensorRouter = express.Router();
var sensorController = require('../Controllers/SensorController');

sensorRouter.post('/', function(req, res, next) {
    sensorController.postSensorData(req,res);
});

module.exports = sensorRouter;