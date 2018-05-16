package ee.ttu.tarkvaratehnika.integration;

import static ee.ttu.tarkvaratehnika.configuration.ApplicationProperties.API_PREFIX;
import static org.junit.Assert.assertEquals;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;

import ee.ttu.tarkvaratehnika.model.QuizModel;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class UpdateQuizIntegrationTest {
	
	private static final String RETRIEVAL_URL = "/" + API_PREFIX + "/quizzes/cats101";
	private static final String UPDATE_URL = "/" + API_PREFIX + "/quizzes";
	
	@Autowired
	private TestRestTemplate restTemplate;
	
	@Test
	public void testThatQuizCanBeSuccessfullyUpdated() {
		ResponseEntity<QuizModel> responseEntity = restTemplate.getForEntity(RETRIEVAL_URL, QuizModel.class);
		QuizModel quiz = responseEntity.getBody();
		
		assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
		assertEquals(quiz.getName(), "Cats");
		
		quiz.setName("Dogs");
		
		restTemplate.put(UPDATE_URL, quiz);
		
		ResponseEntity<QuizModel> responseEntityAfterUpdate = restTemplate.getForEntity(RETRIEVAL_URL, QuizModel.class);
		QuizModel quizAfterUpdate = responseEntityAfterUpdate.getBody();
		
		assertEquals(HttpStatus.OK, responseEntityAfterUpdate.getStatusCode());
		assertEquals(quizAfterUpdate.getName(), "Dogs");
		
		quizAfterUpdate.setName("Cats");
		
		restTemplate.put(UPDATE_URL, quizAfterUpdate);
		
		ResponseEntity<QuizModel> responseEntityAfterRollBack = restTemplate.getForEntity(RETRIEVAL_URL, QuizModel.class);
		QuizModel quizAfterRollBack = responseEntityAfterRollBack.getBody();
		
		assertEquals(HttpStatus.OK, responseEntityAfterRollBack.getStatusCode());
		assertEquals(quizAfterRollBack.getName(), "Cats");
	}
}
