var sensorModel = require('../model/SensorModel');
var sensorRepository = require('../repository/SensorRepository');

module.exports = {
    postSensorData: function (req, res) {
        let lux = req.body.lux;
        let temp = req.body.temp;
        let humidity = req.body.humidity;
        let date = Date.now();
        let plantId = 1;
        let sensorData = new sensorModel(0, plantId, lux, temp, humidity, date);

        sensorRepository.postSensorData(sensorData);
        res.status(200);
        res.send({lux, temp, humidity, date});
    },
    getSensorData: async function (req, res) {
        let sensorData = await sensorRepository.getSensorData(req.params.id);

        if (sensorData[0].humidity <= 300) {
            sensorData[0].humidity = sensorData[0].humidity + ": Very dry";
        } else if (sensorData[0].humidity <= 700) {
            sensorData[0].humidity = sensorData[0].humidity + ": Humid soil";
        } else if (sensorData[0].humidity <= 950) {
            sensorData[0].humidity = sensorData[0].humidity + ": In water";
        }
        console.log("data: \n" + sensorData);
        res.status(200).send(sensorData);
    }
};