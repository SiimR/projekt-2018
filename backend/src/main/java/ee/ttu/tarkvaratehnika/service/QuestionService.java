package ee.ttu.tarkvaratehnika.service;

import java.util.function.Function;
import ee.ttu.tarkvaratehnika.entity.QuestionEntity;
import ee.ttu.tarkvaratehnika.model.QuestionModel;

import static ee.ttu.tarkvaratehnika.service.AnswerService.ANSWER_ENTITY_TO_MODEL;
import static java.util.stream.Collectors.toList;

public class QuestionService {
	
	public static final Function<QuestionEntity, QuestionModel> QUESTION_ENTITY_TO_MODEL = entity -> {
		if (entity == null) {
			return null;
		}
		
		return QuestionModel.builder()
				.id(entity.getQuestionId())
				.quizId(entity.getQuiz().getQuizId())
				.content(entity.getContent())
				.type(entity.getType())
				.points(entity.getPoints())
				.creationDate(entity.getCreationDate())
				.modifiedDate(entity.getModifiedDate())
				.answers(entity.getAnswers().stream()
						.map(ANSWER_ENTITY_TO_MODEL)
						.collect(toList()))
				.build();
	};

}
