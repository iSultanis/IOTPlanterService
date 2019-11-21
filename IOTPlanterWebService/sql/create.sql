CREATE table sensor_read (
     id SERIAL,
     plantId INTEGER,
     lux INTEGER,
     temperature INTEGER,
     humidity INTEGER,
     readTime BIGINT
);