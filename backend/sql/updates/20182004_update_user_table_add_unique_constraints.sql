ALTER TABLE quizzy.user
ADD CONSTRAINT unique_user_name UNIQUE(name);

ALTER TABLE quizzy.user
ADD CONSTRAINT unique_user_email UNIQUE(email);