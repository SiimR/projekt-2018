package ee.ttu.tarkvaratehnika.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ee.ttu.tarkvaratehnika.dao.QuizRepository;
import ee.ttu.tarkvaratehnika.model.Quiz;

@Service
public class QuizService {
	
	private QuizRepository quizRepository;
	
	public Quiz findByReference(String reference) {
		return quizRepository.findByReference(reference);
	}
	
	@Autowired
	public void setQuizRepository(QuizRepository quizRepository) {
		this.quizRepository = quizRepository;
	}
}
