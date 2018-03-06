INSERT INTO quizzy.quiz
SELECT nextval('quizzy.quiz_seq'), user_id, 'Cats', 'cats101', NULL, NOW(), NULL
FROM quizzy.user
WHERE name = 'testUser';

INSERT INTO quizzy.question
SELECT nextval('quizzy.question_seq'), quiz_id, 'A cat has how many whiskers, on average?', 'STANDARD', 0, NOW(), NULL
FROM quizzy.quiz
WHERE reference = 'cats101';

INSERT INTO quizzy.question
SELECT nextval('quizzy.question_seq'), quiz_id, 'Do cats have fewer teeth than dogs have, or more?', 'STANDARD', 0, NOW(), NULL
FROM quizzy.quiz
WHERE reference = 'cats101';

INSERT INTO quizzy.question
SELECT nextval('quizzy.question_seq'), quiz_id, 'Which brain is the cat’s brain most similar to?', 'STANDARD', 0, NOW(), NULL
FROM quizzy.quiz
WHERE reference = 'cats101';

INSERT INTO quizzy.question
SELECT nextval('quizzy.question_seq'), quiz_id, 'A term for a group of cats is:', 'STANDARD', 0, NOW(), NULL
FROM quizzy.quiz
WHERE reference = 'cats101';

INSERT INTO quizzy.answer
SELECT nextval('quizzy.answer_seq'), question_id, '24', TRUE, NOW(), NULL
FROM quizzy.question
WHERE content = 'A cat has how many whiskers, on average?';

INSERT INTO quizzy.answer
SELECT nextval('quizzy.answer_seq'), question_id, '16', FALSE, NOW(), NULL
FROM quizzy.question
WHERE content = 'A cat has how many whiskers, on average?';

INSERT INTO quizzy.answer
SELECT nextval('quizzy.answer_seq'), question_id, '38', FALSE, NOW(), NULL
FROM quizzy.question
WHERE content = 'A cat has how many whiskers, on average?';

INSERT INTO quizzy.answer
SELECT nextval('quizzy.answer_seq'), question_id, '60', FALSE, NOW(), NULL
FROM quizzy.question
WHERE content = 'A cat has how many whiskers, on average?';

INSERT INTO quizzy.answer
SELECT nextval('quizzy.answer_seq'), question_id, 'The same', FALSE, NOW(), NULL
FROM quizzy.question
WHERE content = 'Do cats have fewer teeth than dogs have, or more?';

INSERT INTO quizzy.answer
SELECT nextval('quizzy.answer_seq'), question_id, 'Fewer', TRUE, NOW(), NULL
FROM quizzy.question
WHERE content = 'Do cats have fewer teeth than dogs have, or more?';

INSERT INTO quizzy.answer
SELECT nextval('quizzy.answer_seq'), question_id, 'More', FALSE, NOW(), NULL
FROM quizzy.question
WHERE content = 'Do cats have fewer teeth than dogs have, or more?';

INSERT INTO quizzy.answer
SELECT nextval('quizzy.answer_seq'), question_id, 'Human', TRUE, NOW(), NULL
FROM quizzy.question
WHERE content = 'Which brain is the cat’s brain most similar to?';

INSERT INTO quizzy.answer
SELECT nextval('quizzy.answer_seq'), question_id, 'Dog', FALSE, NOW(), NULL
FROM quizzy.question
WHERE content = 'Which brain is the cat’s brain most similar to?';

INSERT INTO quizzy.answer
SELECT nextval('quizzy.answer_seq'), question_id, 'Clowder', TRUE, NOW(), NULL
FROM quizzy.question
WHERE content = 'A term for a group of cats is:';

INSERT INTO quizzy.answer
SELECT nextval('quizzy.answer_seq'), question_id, 'Covey', FALSE, NOW(), NULL
FROM quizzy.question
WHERE content = 'A term for a group of cats is:';

INSERT INTO quizzy.answer
SELECT nextval('quizzy.answer_seq'), question_id, 'Clutch', FALSE, NOW(), NULL
FROM quizzy.question
WHERE content = 'A term for a group of cats is:';

INSERT INTO quizzy.answer
SELECT nextval('quizzy.answer_seq'), question_id, 'Caggle', FALSE, NOW(), NULL
FROM quizzy.question
WHERE content = 'A term for a group of cats is:';

INSERT INTO quizzy.answer
SELECT nextval('quizzy.answer_seq'), question_id, 'Kaggle', FALSE, NOW(), NULL
FROM quizzy.question
WHERE content = 'A term for a group of cats is:';