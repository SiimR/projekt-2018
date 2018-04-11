package ee.ttu.tarkvaratehnika.service;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;

import ee.ttu.tarkvaratehnika.dao.UserRepository;
import ee.ttu.tarkvaratehnika.entity.UserEntity;
import ee.ttu.tarkvaratehnika.model.UserJsonModel;

import static org.mockito.Mockito.when;
import static org.mockito.Matchers.any;

@RunWith(MockitoJUnitRunner.class)
public class UserServiceTest {
	
	private static final String AVAILABLE_NAME = "This name is available";
	private static final String OCCUPIED_NAME = "This name is not available";
	private static final String AVAILABLE_EMAIL = "email@available.com";
	private static final String OCCUPIED_EMAIL = "email@occupied.com";
	
	@Mock
	private UserRepository userRepository;
	@Mock
	private JsonValidationService jsonValidationService;
	@InjectMocks
	private UserService userService;
	private UserJsonModel user;
	
	@Before
	public void setUp() {
		this.user = new UserJsonModel(JsonNodeFactory.instance.objectNode());
		when(jsonValidationService.validateUserDetails(any(JsonNode.class))).thenReturn(null);
		when(userRepository.save(any(UserEntity.class))).thenReturn(1);
		
		when(userRepository.findByName(AVAILABLE_NAME)).thenReturn(null);
		when(userRepository.findByName(OCCUPIED_NAME)).thenReturn(new UserEntity());
		when(userRepository.findByEmail(AVAILABLE_EMAIL)).thenReturn(null);
		when(userRepository.findByEmail(OCCUPIED_EMAIL)).thenReturn(new UserEntity());
	}
	
	@Test
	public void successfullyRegistersNewUserWhenNameAndEmailAreAvailable() {
		user.setName(AVAILABLE_NAME);
		user.setEmail(AVAILABLE_EMAIL);
		userService.register(user);
	}
	
	@Test(expected = RuntimeException.class)
	public void mustThrowExceptionWhenNameIsAlreadyInUse() {
		user.setName(OCCUPIED_NAME);
		user.setEmail(AVAILABLE_EMAIL);
		userService.register(user);
	}
	
	@Test(expected = RuntimeException.class)
	public void mustThrowExceptionWhenEmailIsAlreadyInUse() {
		user.setName(AVAILABLE_NAME);
		user.setEmail(OCCUPIED_EMAIL);
		userService.register(user);
	}
}
