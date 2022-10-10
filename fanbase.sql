DROP TABLE IF EXISTS fan;
DROP TABLE IF EXISTS fanbase;

CREATE TABLE fan (
    fan_id serial,
    name text,
    phone text,
    tier text
);

CREATE TABLE fanbase (
    fanbase_id serial,
    fan_id serial,
    price decimal,
    amount integer
);

INSERT INTO fan (name,phone, tier) VALUES 
('Jared','2348885433' , 'Noob'),
('Ed', '4920347237', 'Noob'),
('Dris', '2432412343', 'Day One')