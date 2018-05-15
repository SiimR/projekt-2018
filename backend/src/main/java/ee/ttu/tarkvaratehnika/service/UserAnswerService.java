package ee.ttu.tarkvaratehnika.service;

import java.util.function.Function;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ee.ttu.tarkvaratehnika.dao.UserAnswerRepository;
import ee.ttu.tarkvaratehnika.entity.UserAnswerEntity;
import ee.ttu.tarkvaratehnika.model.UserAnswerModel;

@Service
@Transactional
public class UserAnswerService {
	
	public static final Function<UserAnswerModel, UserAnswerEntity> MODEL_TO_ENTITY = model -> {
		if (model == null) {
			return null;
		}
		
		return UserAnswerEntity.builder()
				.id(model.getId())
				.quizReference(model.getQuizReference())
				.userName(model.getUserName())
				.amountOfCorrectAnswers(model.getCorrect())
				.amountOfTotalAnswers(model.getTotal())
				.dateAnswered(model.getDateAnswered())
				.build();
	};
	
	private UserAnswerRepository userAnswerRepository;
	
	public Integer save(UserAnswerModel model) {
		UserAnswerEntity entity = MODEL_TO_ENTITY.apply(model);
		return userAnswerRepository.save(entity);
	}
	
	@Autowired
	public void setUserAnswerRepository(UserAnswerRepository userAnswerRepository) {
		this.userAnswerRepository = userAnswerRepository;
	}
	
}
