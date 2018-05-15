package ee.ttu.tarkvaratehnika.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import ee.ttu.tarkvaratehnika.model.QuizModel;
import ee.ttu.tarkvaratehnika.service.QuizService;

import static ee.ttu.tarkvaratehnika.configuration.ApplicationProperties.API_PREFIX;

@RestController
@RequestMapping(API_PREFIX + "/quizzes")
public class QuizController {
	
	private QuizService quizService;
	
	@GetMapping("/{reference}")
	public ResponseEntity<QuizModel> get(@PathVariable("reference") String reference) {
		return ResponseEntity.ok(quizService.findByReference(reference));
	}
	
	@GetMapping()
	public ResponseEntity<List<QuizModel>> list(@RequestParam(value = "userId") Integer userId) {
		return ResponseEntity.ok(quizService.listUserRelated(userId));
	}
	
	@PostMapping
	public ResponseEntity<Integer> create(@RequestBody QuizModel quizModel) {
		return ResponseEntity.ok(quizService.create(quizModel));
	}
	
	@PutMapping
	public ResponseEntity<Integer> update(@RequestBody QuizModel quizModel) {
		return ResponseEntity.ok(quizService.update(quizModel));
	}
	
	@PutMapping("/activate/{id}")
	public ResponseEntity<Integer> activate(@PathVariable("id") Integer quizId) {
		return ResponseEntity.ok(quizService.activate(quizId));
	}
	
	@PutMapping("/deactivate/{id}")
	public ResponseEntity<Integer> deactivate(@PathVariable("id") Integer quizId) {
		return ResponseEntity.ok(quizService.deactivate(quizId));
	}
	
	@Autowired
	public void setQuizService(QuizService quizService) {
		this.quizService = quizService;
	}
}
