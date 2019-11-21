var pgp = require('pg-promise')(/* options */);
var db = pgp('postgres://postgres:postgres@localhost:5432/IOTPlanterDB');

module.exports = {
    postSensorData: function (sensorData) {
        db.none('INSERT INTO sensor_read (plantid, lux, temperature, humidity, readtime) VALUES ($1, $2, $3, $4, $5);'
            , [sensorData.plantid, sensorData.lux, sensorData.temperature, sensorData.humidity, sensorData.readTime])
            // .then(function (data) {
            //     console.log('DATA:', data.value)
            // })
            .catch(function (error) {
                console.log('ERROR:', error)
            })
    }
};