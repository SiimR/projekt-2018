package ee.ttu.tarkvaratehnika.dao;

import org.springframework.stereotype.Repository;

import ee.ttu.tarkvaratehnika.model.Quiz;

@Repository
public class QuizRepository {
	
	public Quiz findByReference(String reference) {
		return new Quiz("Sample", reference);
	}

}
