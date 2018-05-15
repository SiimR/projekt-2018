package ee.ttu.tarkvaratehnika.controller;

import static ee.ttu.tarkvaratehnika.configuration.ApplicationProperties.API_PREFIX;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ee.ttu.tarkvaratehnika.model.UserAnswerModel;
import ee.ttu.tarkvaratehnika.service.UserAnswerService;

@RestController
@RequestMapping(API_PREFIX + "/userAnswers")
public class UserAnswerController {
	
	private UserAnswerService userAnswerService;
	
	@PostMapping
	public ResponseEntity<Integer> create(@RequestBody UserAnswerModel model) {
		return ResponseEntity.ok(userAnswerService.save(model));
	}
	
	@Autowired
	public void setUserAnswerService(UserAnswerService userAnswerService) {
		this.userAnswerService = userAnswerService;
	}
	
}
