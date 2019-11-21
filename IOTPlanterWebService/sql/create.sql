CREATE table sensor_read (
     id SERIAL,
     plantId INTEGER,
     lux INTEGER,
     temperature DECIMAL,
     humidity INTEGER,
     readTime BIGINT
);