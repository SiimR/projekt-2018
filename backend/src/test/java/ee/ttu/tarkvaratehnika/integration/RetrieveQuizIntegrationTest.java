package ee.ttu.tarkvaratehnika.integration;

import org.junit.Test;
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

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class RetrieveQuizIntegrationTest {
	
	private static final String URL = "/" + API_PREFIX + "/quizzes/cats101";
	private static final String EXPECTED_QUIZ_NAME = "Cats";
	private static final String EXPECTED_QUESTION_CONTENT = "A term for a group of cats is:";
	private static final String EXPECTED_ANSWER_CONTENT = "Covey";
	
	@Autowired
	private TestRestTemplate restTemplate;
	
	@Test
	public void testThatQuizIsSuccessfullyRetrievedFromDatabase() {
		ResponseEntity<QuizModel> responseEntity = restTemplate.getForEntity(URL, QuizModel.class);
		QuizModel quiz = responseEntity.getBody();
		
		String actualQuestionContent = quiz.getQuestions()
				.get(3)
				.getContent();
		
		String actualAnswerContent = quiz.getQuestions()
				.get(3)
				.getAnswers()
				.get(1)
				.getContent();
		
		assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
		assertEquals(EXPECTED_QUIZ_NAME, quiz.getName());
		assertEquals(EXPECTED_QUESTION_CONTENT, actualQuestionContent);
		assertEquals(EXPECTED_ANSWER_CONTENT, actualAnswerContent);
	}
}
