CREATE DATABASE perntodo;

CREATE TABLE users (
    id SERIAL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE todo (
    todo_id SERIAL,
    description VARCHAR(255) NOT NULL,
    user_id INTEGER NOT NULL,
    song VARCHAR,
    title VARCHAR,
    PRIMARY KEY (todo_id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);



