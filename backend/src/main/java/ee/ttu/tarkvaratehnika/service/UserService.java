package ee.ttu.tarkvaratehnika.service;

import java.util.function.Function;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ee.ttu.tarkvaratehnika.dao.UserRepository;
import ee.ttu.tarkvaratehnika.entity.UserEntity;
import ee.ttu.tarkvaratehnika.model.UserJsonModel;
import ee.ttu.tarkvaratehnika.model.UserModel;

@Service
@Transactional
public class UserService {
	
	public static final Function<UserEntity, UserModel> USER_ENTITY_TO_MODEL = entity -> {
		
		if (entity == null) {
			return null;
		}
		
		return UserModel.builder()
				.id(entity.getUserId())
				.name(entity.getName())
				.passwordHash(entity.getPasswordHash())
				.email(entity.getEmail())
				.creationDate(entity.getCreationDate())
				.modifiedDate(entity.getModifiedDate())
				.build();
	};
	
	public static final Function<UserJsonModel, UserEntity> USER_JSON_TO_ENTITY = json -> {
		
		if (json == null) {
			return null;
		}
		
		return UserEntity.builder()
				.name(json.getName())
				.email(json.getEmail())
				.passwordHash(json.getPasswordHash())
				.build();
	};
	
	private UserRepository userRepository;
	private JsonValidationService jsonValidationService;
	
	public UserModel findLogin(String name, String passwordHash) {
		UserEntity userEntity = userRepository.findLogin(name, passwordHash);
		
		if (userEntity == null) {
			throw new RuntimeException("User with provided credentials does not exist.");
		}
		
		return USER_ENTITY_TO_MODEL.apply(userEntity);
	}
	
	public Integer register(UserJsonModel newUserDetails) {
		jsonValidationService.validateUserDetails(newUserDetails.getJsonContent());
		
		UserEntity userEntity = USER_JSON_TO_ENTITY.apply(newUserDetails);
		validateUserUniqueConstraints(userEntity);
		
		return userRepository.save(userEntity);
	}
	
	public UserEntity findById(Integer id) {
		return userRepository.findById(id);
	}
	
	private void validateUserUniqueConstraints(UserEntity user) {
		validateUniqueNameConstraint(user.getName());
		validateUniqueEmailConstraint(user.getEmail());
	}
	
	private void validateUniqueNameConstraint(String name) {
		UserEntity user = userRepository.findByName(name);
		
		if (user != null) {
			throw new RuntimeException("The provided user name '" + name + "' is in use already");
		}
	}
	
	private void validateUniqueEmailConstraint(String email) {
		UserEntity user = userRepository.findByEmail(email);
		
		if (user != null) {
			throw new RuntimeException("The provided user email '" + email + "' is in use already");
		}
	}
	
	@Autowired
	public void setUserRepository(UserRepository userRepository) {
		this.userRepository = userRepository;
	}
	
	@Autowired
	public void setJsonValidationService(JsonValidationService jsonValidationService) {
		this.jsonValidationService = jsonValidationService;
	}

}
