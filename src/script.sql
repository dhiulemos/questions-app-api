DROP DATABASE app;

CREATE DATABASE app;

USE app;

CREATE TABLE questions (
	id int NOT NULL AUTO_INCREMENT,
	question varchar(1000) not null,
	PRIMARY KEY (id)
);
    
INSERT INTO questions (question) VALUES 
('Pergunta 1'),
('Pergunta 2');

SELECT * FROM questions ORDER BY id;

CREATE TABLE answers (
	id int NOT NULL AUTO_INCREMENT,
	answer varchar(1000) NOT NULL,
	correct_answer boolean not null default 0,
	question_id int NOT NULL,
	FOREIGN KEY (question_id) 
		REFERENCES questions(id)
		ON UPDATE CASCADE ON DELETE CASCADE,
	PRIMARY KEY (id)
); 

INSERT INTO answers (answer, correct_answer, question_id) VALUES 
('P1 - Opção A, certo', true, 1),
('P1 - Opção B, errado', false, 1),
('P1 - Opção C, errado', false, 1),
('P1 - Opção D, errado', false, 1),
('P2 - Opção A, errado', false, 2),
('P2 - Opção B, errado', false, 2),
('P2 - Opção C, certo', true, 2),
('P2 - Opção D, errado', false, 2);

SELECT * FROM answers ORDER BY question_id;

CREATE TABLE users (
	id int NOT NULL AUTO_INCREMENT,
	username varchar(1000) not null,
    password varchar(1000) not null,
	PRIMARY KEY (id)
);

SELECT * FROM users ORDER BY id;
