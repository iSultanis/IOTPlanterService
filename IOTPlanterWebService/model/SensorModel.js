module.exports = function PlanterModel(id, plantid, lux, temperature, humidity, readTime) {
    this.id = id;
    this.plantid = plantid;
    this.lux = lux;
    this.temperature = temperature;
    this.humidity = humidity;
    this.readTime = readTime;
};