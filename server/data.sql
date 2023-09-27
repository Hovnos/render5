CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  c_nick VARCHAR(255),
  c_text VARCHAR(500)
);

create table users (
    u_nick varchar(255) primary key,
    hashed_password varchar(255)
);