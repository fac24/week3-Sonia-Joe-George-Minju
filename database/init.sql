BEGIN; 

DROP TABLE IF EXISTS users, sessions, posts CASCADE;

CREATE TABLE sessions (
    sid CHAR(24) UNIQUE NOT NULL PRIMARY KEY,
    data JSON NOT NULL -- user : { username: blah }
    -- user_id INTEGER REFERENCES users(id) NOT NULL,
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password TEXT NOT NULL
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL, 
  post TEXT NOT NULL
);


INSERT INTO users (username, password) VALUES
  ('moolahrouge', Aaaaaa1),
  ('apatheticAlan', Bbbbbbb2)
;

INSERT INTO posts (user_id, post) VALUES
  (1, 'Broccoli milk ftw. It changed my life!'),
  (2, `Oat milk. Because it's cheap. Lols`)
;

COMMIT;
