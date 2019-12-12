require('../model/SensorModel');
var express = require('express');
var router = express.Router();
var repo = require('../repository/SensorRepository');


/* GET home page. */
router.get('/', async function(req, res, next) {
    var result = await repo.getSensorData(1);
    res.render('dashboard', { planters: result});
});

module.exports = router;
