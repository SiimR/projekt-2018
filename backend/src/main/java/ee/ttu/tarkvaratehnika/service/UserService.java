package ee.ttu.tarkvaratehnika.service;

import java.util.function.Function;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ee.ttu.tarkvaratehnika.dao.UserRepository;
import ee.ttu.tarkvaratehnika.entity.UserEntity;
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
	
	private UserRepository userRepository;
	
	public UserModel findLogin(String name, String passwordHash) {
		UserEntity userEntity = userRepository.findLogin(name, passwordHash);
		
		if (userEntity == null) {
			throw new RuntimeException("User with provided credentials does not exist.");
		}
		
		return USER_ENTITY_TO_MODEL.apply(userEntity);
	}
	
	@Autowired
	public void setUserRepository(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

}
