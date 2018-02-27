INSERT INTO quizzy.user VALUES
(
	nextval('quizzy.user_seq'),
	'testUser',
	'06843A9E1C660DF054DEFFFC5B5B60E5',-- md5 hash of 'wannabee'
	'sespir@ttu.ee',
	NOW(),
	NULL
);

INSERT INTO quizzy.quiz
SELECT nextval('quizzy.quiz_seq'), user_id, 'MyFirstQuiz', 'IDDQD', NULL, NOW(), NULL
FROM quizzy.user
WHERE name = 'testUser';

INSERT INTO quizzy.question
SELECT nextval('quizzy.question_seq'), quiz_id, 'What is the capital of Estonia?', 'STANDARD', 0, NOW(), NULL
FROM quizzy.quiz
WHERE reference = 'IDDQD';

INSERT INTO quizzy.question
SELECT nextval('quizzy.question_seq'), quiz_id, 'Where can I find some sushi?', 'STANDARD', 0, NOW(), NULL
FROM quizzy.quiz
WHERE reference = 'IDDQD';

INSERT INTO quizzy.question
SELECT nextval('quizzy.question_seq'), quiz_id, 'What is IDDQD?', 'STANDARD', 0, NOW(), NULL
FROM quizzy.quiz
WHERE reference = 'IDDQD';

INSERT INTO quizzy.answer
SELECT nextval('quizzy.answer_seq'), question_id, 'Tallinn', TRUE, NOW(), NULL
FROM quizzy.question
WHERE content = 'What is the capital of Estonia?';

INSERT INTO quizzy.answer
SELECT nextval('quizzy.answer_seq'), question_id, 'Narva', FALSE, NOW(), NULL
FROM quizzy.question
WHERE content = 'What is the capital of Estonia?';

INSERT INTO quizzy.answer
SELECT nextval('quizzy.answer_seq'), question_id, 'Casablanca', FALSE, NOW(), NULL
FROM quizzy.question
WHERE content = 'What is the capital of Estonia?';

INSERT INTO quizzy.answer
SELECT nextval('quizzy.answer_seq'), question_id, 'What is Estonia?', FALSE, NOW(), NULL
FROM quizzy.question
WHERE content = 'What is the capital of Estonia?';

INSERT INTO quizzy.answer
SELECT nextval('quizzy.answer_seq'), question_id, 'Go make it yourself', FALSE, NOW(), NULL
FROM quizzy.question
WHERE content = 'Where can I find some sushi?';

INSERT INTO quizzy.answer
SELECT nextval('quizzy.answer_seq'), question_id, 'Go to Japan', FALSE, NOW(), NULL
FROM quizzy.question
WHERE content = 'Where can I find some sushi?';

INSERT INTO quizzy.answer
SELECT nextval('quizzy.answer_seq'), question_id, 'In a sushi-bar probably', TRUE, NOW(), NULL
FROM quizzy.question
WHERE content = 'Where can I find some sushi?';

INSERT INTO quizzy.answer
SELECT nextval('quizzy.answer_seq'), question_id, 'Find Captain Obvious. He knows where to look for.', FALSE, NOW(), NULL
FROM quizzy.question
WHERE content = 'Where can I find some sushi?';

INSERT INTO quizzy.answer
SELECT nextval('quizzy.answer_seq'), question_id, 'Some abbreviation', FALSE, NOW(), NULL
FROM quizzy.question
WHERE content = 'What is IDDQD?';

INSERT INTO quizzy.answer
SELECT nextval('quizzy.answer_seq'), question_id, 'Is this somehow related to an old video game?', FALSE, NOW(), NULL
FROM quizzy.question
WHERE content = 'What is IDDQD?';

INSERT INTO quizzy.answer
SELECT nextval('quizzy.answer_seq'), question_id, 'Only oldfags know it', FALSE, NOW(), NULL
FROM quizzy.question
WHERE content = 'What is IDDQD?';

INSERT INTO quizzy.answer
SELECT nextval('quizzy.answer_seq'), question_id, 'Cheat code that made players immortal in Doom', TRUE, NOW(), NULL
FROM quizzy.question
WHERE content = 'What is IDDQD?';
