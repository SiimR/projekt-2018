package ee.ttu.tarkvaratehnika.service;

import java.util.function.Function;
import ee.ttu.tarkvaratehnika.entity.AnswerEntity;
import ee.ttu.tarkvaratehnika.model.AnswerModel;

public class AnswerService {
	
	public static final Function<AnswerEntity, AnswerModel> ANSWER_ENTITY_TO_MODEL = entity -> {
		if (entity == null) {
			return null;
		}
		
		return AnswerModel.builder()
				.id(entity.getAnswerId())
				.questionId(entity.getQuestion().getQuestionId())
				.content(entity.getContent())
				.correct(entity.getCorrect())
				.creationDate(entity.getCreationDate())
				.modifiedDate(entity.getModifiedDate())
				.build();
	};
}
