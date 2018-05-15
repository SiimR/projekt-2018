package ee.ttu.tarkvaratehnika.service;

import java.util.function.Function;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ee.ttu.tarkvaratehnika.dao.QuizRepository;
import ee.ttu.tarkvaratehnika.entity.QuestionEntity;
import ee.ttu.tarkvaratehnika.entity.QuizEntity;
import ee.ttu.tarkvaratehnika.entity.UserEntity;
import ee.ttu.tarkvaratehnika.model.QuizModel;

import static ee.ttu.tarkvaratehnika.service.QuestionService.QUESTION_ENTITY_TO_MODEL;
import static ee.ttu.tarkvaratehnika.service.QuestionService.QUESTION_MODEL_TO_ENTITY;
import static java.util.stream.Collectors.toList;

import java.util.Date;
import java.util.List;

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
				.active(entity.getActive())
				.questions(entity.getQuestions().stream()
						.map(QUESTION_ENTITY_TO_MODEL)
						.collect(toList()))
				.build();
	};
	
	public static final Function<QuizModel, QuizEntity> QUIZ_MODEL_TO_ENTITY = model -> {
		if (model == null) {
			return null;
		}
		
		return QuizEntity.builder()
				.name(model.getName())
				.reference(model.getReference())
				.description(model.getDescription())
				.creationDate(new Date())
				.modifiedDate(new Date())
				.active(model.getActive())
				.questions(model.getQuestions().stream()
						.map(QUESTION_MODEL_TO_ENTITY)
						.collect(toList()))
				.build();
	};
	
	private QuizRepository quizRepository;
	private UserService userService;
	
	public QuizModel findByReference(String reference) {
		QuizEntity quizEntity = quizRepository.findByReference(reference);
		
		if (!quizEntity.getActive()) {
			throw new RuntimeException("This quiz is inactive at the moment.");
		}
		
		return QUIZ_ENTITY_TO_MODEL.apply(quizEntity);
	}
	
	public List<QuizModel> listUserRelated(Integer userId) {
		return quizRepository.listUserRelated(userId).stream()
				.map(QUIZ_ENTITY_TO_MODEL)
				.collect(toList());
	}
	
	public Integer create(QuizModel model) {
		QuizEntity entity = QUIZ_MODEL_TO_ENTITY.apply(model);
		
		UserEntity user = userService.findById(model.getUserId());
		entity.setUser(user);
		
		prepareValidEntity(entity);
		
		return quizRepository.save(entity);
	}
	
	public Integer update(QuizModel model) {
		QuizEntity entity = QUIZ_MODEL_TO_ENTITY.apply(model);
		
		update(entity);
		
		return entity.getQuizId();
		
	}
	
	public Integer activate(Integer quizId) {
		QuizEntity entity = quizRepository.findById(quizId);
		
		entity.setActive(true);
		update(entity);
		
		return quizId;
	}
	
	public Integer deactivate(Integer quizId) {
		QuizEntity entity = quizRepository.findById(quizId);
		
		entity.setActive(false);
		update(entity);
		
		return quizId;
	}
	
	public Integer delete(Integer quizId) {
		QuizEntity entity = quizRepository.findById(quizId);
		
		quizRepository.delete(entity);
		return quizId;
	}
	
	private void update(QuizEntity entity) {
		quizRepository.update(entity);
	}
	
	private void prepareValidEntity(QuizEntity entity) {
		entity.getQuestions().forEach(question -> question.setQuiz(entity));
		for (QuestionEntity question : entity.getQuestions()) {
			question.getAnswers().forEach(answer -> answer.setQuestion(question));
		}
	}
	
	@Autowired
	public void setQuizRepository(QuizRepository quizRepository) {
		this.quizRepository = quizRepository;
	}
	
	@Autowired
	public void setUserService(UserService userService) {
		this.userService = userService;
	}
}
