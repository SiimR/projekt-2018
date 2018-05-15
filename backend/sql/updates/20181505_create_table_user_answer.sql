-- DROP SEQUENCE quizzy.user_answer_seq

CREATE SEQUENCE quizzy.user_answer_seq
	INCREMENT 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1;
GRANT SELECT, USAGE ON SEQUENCE quizzy.user_answer_seq TO postgres;

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