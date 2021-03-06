CREATE TABLE user (
    id INTEGER NOT NULL AUTO_INCREMENT,
    user_name VARCHAR(30) NOT NULL,
    password VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE post (
    id INTEGER NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    content TEXT NOT NULL,
    user_id INTEGER NOT NULL,
	created_at TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE comment (
    id INTEGER NOT NULL AUTO_INCREMENT,
    user_comment VARCHAR(100) NOT NULL,
    user_id INTEGER NOT NULL,
    post_id INTEGER NOT NULL,
	created_at TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (id)
);

