package ee.ttu.tarkvaratehnika.integration;

import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;
import ee.ttu.tarkvaratehnika.model.QuizModel;

import static ee.ttu.tarkvaratehnika.configuration.ApplicationProperties.API_PREFIX;
import static org.junit.Assert.assertEquals;

import org.junit.Test;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class DeactivateQuizIntegrationTest {
	
	private static final String DEACTIVATION_URL = "/" + API_PREFIX + "/quizzes/deactivate/2";
	private static final String ACTIVATION_URL = "/" + API_PREFIX + "/quizzes/activate/2";
	private static final String RETRIEVAL_URL = "/" + API_PREFIX + "/quizzes/cats101";
	
	@Autowired
	private TestRestTemplate restTemplate;
	
	@Test
	public void testThatNobodyCanAccessDeactivatedQuiz() {
		restTemplate.put(DEACTIVATION_URL, null);
		
		ResponseEntity<QuizModel> responseEntity = restTemplate.getForEntity(RETRIEVAL_URL, QuizModel.class);
		
		assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, responseEntity.getStatusCode());
	}
	
	@Test
	public void testThatActiveQuizCanBeFreelyAccessed() {
		restTemplate.put(ACTIVATION_URL, null);
		
		ResponseEntity<QuizModel> responseEntity = restTemplate.getForEntity(RETRIEVAL_URL, QuizModel.class);
		QuizModel quiz = responseEntity.getBody();
		
		assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
		assertEquals(quiz.getActive(), true);
	}
}
