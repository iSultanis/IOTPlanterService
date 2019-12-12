var sensorModel = require('../model/SensorModel');
var sensorRepository = require('../repository/SensorRepository');

module.exports = {
    postSensorData: function (req, res) {
        let lux;
        let temp;
        let humidity;
        let plantId = 1;
        let id = 1;
        let date = new Date().toLocaleString();
        if (req.body.lux != null) {
            lux = req.body.lux;
        } else {
            res.status(400).send("Missing the value of lux");
            return;
        }
        if (req.body.temp != null) {
            temp = req.body.temp;
        } else {
            res.status(400).send("Missing the value of temp");
            return;
        }
        if (req.body.humidity != null) {
            humidity = req.body.humidity;
        } else {
            res.status(400).send("Missing the value of lux");
            return;
        }
        req.body.plantid != null ? plantId = req.body.plantid : plantId = 1;

        let sensorData = new sensorModel(id, plantId, lux, temp, humidity, date);

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
        //console.log("data: \n" + sensorData);
        res.status(200).send(sensorData);
    }
};