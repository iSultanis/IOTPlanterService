CREATE table sensor_read
(
  id          SERIAL PRIMARY KEY,
  plant_id    INTEGER,
  lux         INTEGER,
  temperature DECIMAL,
  humidity    INTEGER,
  readTime    VARCHAR(255)
);

CREATE TABLE plant
(
  id           SERIAL PRIMARY KEY,
  common_name  VARCHAR(255),
  latin_name   VARCHAR(255),
  min_temp     DECIMAL,
  max_temp     DECIMAL,
  min_humidity INTEGER,
  max_humidity INTEGER,
  min_shade    VARCHAR(4),
  frost_tender BOOLEAN
);

alter table sensor_read
  add constraint "sensor_read__plant.plant_id_fk"
    foreign key (plant_id) references plant(id);

INSERT INTO plant(common_name, latin_name, min_temp, max_temp,
                  min_humidity, max_humidity, min_shade, frost_tender)
                  VALUES ('agave', 'agave cantala agave', -6.7, 41.2,
                          10, 30, 'NONE', TRUE);