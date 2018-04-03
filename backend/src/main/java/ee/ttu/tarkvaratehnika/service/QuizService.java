package ee.ttu.tarkvaratehnika.service;

import java.util.function.Function;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ee.ttu.tarkvaratehnika.dao.QuizRepository;
import ee.ttu.tarkvaratehnika.entity.QuizEntity;
import ee.ttu.tarkvaratehnika.model.QuizModel;

import static ee.ttu.tarkvaratehnika.service.QuestionService.QUESTION_ENTITY_TO_MODEL;
import static java.util.stream.Collectors.toList;

@Service
@Transactional
public class QuizService {
	
	public static final Function<QuizEntity, QuizModel> QUIZ_ENTITY_TO_MODEL = entity -> {
		if (entity == null) {
			return null;
		}
		
		return QuizModel.builder()
				.id(entity.getQuizId())
				.userId(entity.getUser().getUserId())
				.name(entity.getName())
				.reference(entity.getReference())
				.description(entity.getDescription())
				.creationDate(entity.getCreationDate())
				.modifiedDate(entity.getModifiedDate())
				.questions(entity.getQuestions().stream()
						.map(QUESTION_ENTITY_TO_MODEL)
						.collect(toList()))
				.build();
	};
	
	private QuizRepository quizRepository;
	
	public QuizModel findByReference(String reference) {
		QuizEntity quizEntity = quizRepository.findByReference(reference);
		
		return QUIZ_ENTITY_TO_MODEL.apply(quizEntity);
	}
	
	@Autowired
	public void setQuizRepository(QuizRepository quizRepository) {
		this.quizRepository = quizRepository;
	}
}
