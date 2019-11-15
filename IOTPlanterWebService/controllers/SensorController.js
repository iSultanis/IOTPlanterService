module.exports = {
    postSensorData: function (req, res) {
        let lux = req.body.lux;
        let temp = req.body.temp;
        let humidity = req.body.humidity;

        res.status(200);
        res.send({lux, temp, humidity});
    }
};