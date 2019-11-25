var pgp = require('pg-promise')(/* options */);
var db = pgp(process.env.DB_HOST+"://"+process.env.DB_USER+":"+process.env.DB_PASS+"@localhost:"+process.env.DB_PORT+"/IOTPlanterDB"); // last proges in file is password

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
    },
    getSensorData: async function (id) {
        console.log(process.env.DB_HOST);
        return await db.any("SELECT * FROM sensor_read", id)
            .catch(function (error) {
                console.log('ERROR:', error)
            });

    }
};