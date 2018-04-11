package ee.ttu.tarkvaratehnika.service;

import java.util.function.Function;
import ee.ttu.tarkvaratehnika.entity.QuestionEntity;
import ee.ttu.tarkvaratehnika.model.QuestionModel;

import static ee.ttu.tarkvaratehnika.service.AnswerService.ANSWER_ENTITY_TO_MODEL;
import static ee.ttu.tarkvaratehnika.service.AnswerService.ANSWER_MODEL_TO_ENTITY;
import static java.util.stream.Collectors.toList;
import java.util.Date;

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
	
	public static final Function<QuestionModel, QuestionEntity> QUESTION_MODEL_TO_ENTITY = model -> {
		if (model == null) {
			return null;
		}
		
		return QuestionEntity.builder()
				.content(model.getContent())
				.type("Not implemented yet!")
				.points(model.getPoints())
				.creationDate(new Date())
				.modifiedDate(new Date())
				.answers(model.getAnswers().stream()
						.map(ANSWER_MODEL_TO_ENTITY)
						.collect(toList()))
				.build();
	};

}
