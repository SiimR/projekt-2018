package ee.ttu.tarkvaratehnika.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ee.ttu.tarkvaratehnika.model.Quiz;
import ee.ttu.tarkvaratehnika.service.QuizService;

import static ee.ttu.tarkvaratehnika.configuration.ApplicationProperties.API_PREFIX;

@RestController
@RequestMapping(API_PREFIX + "/quizzes")
public class QuizController {
	
	private QuizService quizService;
	
	@GetMapping("/{reference}")
	public ResponseEntity<Quiz> get(@PathVariable("reference") String reference) {
		return ResponseEntity.ok(quizService.findByReference(reference));
	}
	
	@Autowired
	public void setQuizService(QuizService quizService) {
		this.quizService = quizService;
	}
}
