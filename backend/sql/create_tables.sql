-- DROP SEQUENCE quizzy.user_seq

CREATE SEQUENCE quizzy.user_seq
	INCREMENT 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1;
GRANT SELECT, USAGE ON SEQUENCE quizzy.user_seq TO postgres;

-- DROP SEQUENCE quizzy.quiz_seq

CREATE SEQUENCE quizzy.quiz_seq
	INCREMENT 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1;
GRANT SELECT, USAGE ON SEQUENCE quizzy.quiz_seq TO postgres;

-- DROP SEQUENCE quizzy.question_seq

CREATE SEQUENCE quizzy.question_seq
	INCREMENT 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1;
GRANT SELECT, USAGE ON SEQUENCE quizzy.question_seq TO postgres;

-- DROP SEQUENCE quizzy.answer_seq

CREATE SEQUENCE quizzy.answer_seq
	INCREMENT 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1;
GRANT SELECT, USAGE ON SEQUENCE quizzy.answer_seq TO postgres;

-- DROP SEQUENCE quizzy.user_answer_seq

CREATE SEQUENCE quizzy.user_answer_seq
	INCREMENT 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1;
GRANT SELECT, USAGE ON SEQUENCE quizzy.user_answer_seq TO postgres;

-- DROP TABLE quizzy.user

CREATE TABLE quizzy.user
(
	user_id INTEGER NOT NULL,
	name VARCHAR(30) NOT NULL,
	password VARCHAR NOT NULL,
	email VARCHAR(30) NOT NULL,
	creation_date TIMESTAMP WITH TIME ZONE,
	modified_date TIMESTAMP WITH TIME ZONE,
	CONSTRAINT pk_user PRIMARY KEY(user_id),
	CONSTRAINT unique_user_name UNIQUE(name),
	CONSTRAINT unique_user_email UNIQUE(email)
)
WITH (
OIDS=FALSE
);

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE quizzy.user TO postgres;

-- DROP TABLE quizzy.quiz

CREATE TABLE quizzy.quiz
(
	quiz_id INTEGER NOT NULL,
	user_id INTEGER NOT NULL,
	name VARCHAR(255) NOT NULL,
	reference VARCHAR(255) NOT NULL,
	description VARCHAR,
	active BOOLEAN NOT NULL DEFAULT TRUE,
	timer INTEGER DEFAULT 0,
	creation_date TIMESTAMP WITH TIME ZONE,
	modified_date TIMESTAMP WITH TIME ZONE,
	CONSTRAINT pk_quiz PRIMARY KEY(quiz_id),
	CONSTRAINT unique_quiz_ref UNIQUE(reference)
)
WITH (
OIDS=FALSE
);

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE quizzy.quiz TO postgres;

-- DROP TABLE quizzy.question

CREATE TABLE quizzy.question
(
	question_id INTEGER NOT NULL,
	quiz_id INTEGER NOT NULL,
	content VARCHAR NOT NULL,
	type VARCHAR NOT NULL,
	points INTEGER DEFAULT 0,
	creation_date TIMESTAMP WITH TIME ZONE,
	modified_date TIMESTAMP WITH TIME ZONE,
	CONSTRAINT pk_question PRIMARY KEY(question_id)
)
WITH (
OIDS=FALSE
);

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE quizzy.question TO postgres;

-- DROP TABLE quizzy.answer

CREATE TABLE quizzy.answer
(
	answer_id INTEGER NOT NULL,
	question_id INTEGER NOT NULL,
	content VARCHAR NOT NULL,
	is_correct BOOLEAN DEFAULT FALSE,
	creation_date TIMESTAMP WITH TIME ZONE,
	modified_date TIMESTAMP WITH TIME ZONE,
	CONSTRAINT pk_answer PRIMARY KEY(answer_id)
)
WITH (
OIDS=FALSE
);

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE quizzy.answer TO postgres;

-- DROP TABLE quizzy.user_answer

CREATE TABLE quizzy.user_answer
(
	id INTEGER NOT NULL,
	quiz_reference VARCHAR(255) NOT NULL,
	user_name VARCHAR(30) NOT NULL,
	correct INTEGER NOT NULL,
	total INTEGER NOT NULL,
	date_answered TIMESTAMP WITH TIME ZONE,
	CONSTRAINT pk_user_answer_id PRIMARY KEY(id)
)
WITH (
OIDS=FALSE
);

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE quizzy.user_answer TO postgres;