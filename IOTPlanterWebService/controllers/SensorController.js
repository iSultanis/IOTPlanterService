var sensorModel = require('../model/SensorModel');
var sensorRepository = require('../repository/SensorRepository');

module.exports = {
    postSensorData: function (req, res) {
        let lux = req.body.lux;
        let temp = req.body.temp;
        let humidity = req.body.humidity;
        let date = Date.now();
        let id = 1;
        let plantId = 1;
        let sensorData = new sensorModel(id, plantId, lux, temp, humidity, date);

        sensorRepository.postSensorData(sensorData);
        res.status(200);
        res.send({lux, temp, humidity, date, id});
    }
};
