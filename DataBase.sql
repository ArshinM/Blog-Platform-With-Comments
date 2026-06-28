CREATE DATABASE blogdb;

USE blogdb;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100),
  password VARCHAR(100)
);

CREATE TABLE posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  content TEXT,
  user_id INT
);

CREATE TABLE comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  comment TEXT,
  post_id INT,
  user_id INT
);

INSERT INTO users (username, password)
VALUES 
('arshin', '1234'),
('admin', 'admin123'),
('john', 'john123');

INSERT INTO posts (title, content, user_id)
VALUES 
('My First Blog', 'This is my first blog post content', 1),
('Tech News', 'Latest updates in technology', 2),
('Travel Blog', 'I love traveling to new places', 3);

INSERT INTO comments (comment, post_id, user_id)
VALUES 
('Nice post!', 1, 2),
('Very informative', 2, 1),
('Great writing!', 3, 2);

select * from users;
select * from posts;
select * from comments;


