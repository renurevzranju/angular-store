CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price INTEGER NOT NULL,
    description VARCHAR,
    category VARCHAR(200) NOT NULL,
    imageCode VARCHAR(50) NOT NULL
);