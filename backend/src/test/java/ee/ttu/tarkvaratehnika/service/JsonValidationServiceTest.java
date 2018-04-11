package ee.ttu.tarkvaratehnika.service;

import java.io.IOException;
import org.junit.Before;
import org.junit.Test;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.github.fge.jackson.JsonLoader;
import ee.ttu.tarkvaratehnika.exception.JsonValidationException;
import ee.ttu.tarkvaratehnika.model.UserJsonModel;

public class JsonValidationServiceTest {
	
	private JsonValidationService jsonValidationService;
	private UserJsonModel user;
	
	@Before
	public void setUp() throws IOException {
		this.jsonValidationService = new JsonValidationService(
				JsonLoader.fromResource("/user_schema.json"));
		this.user = new UserJsonModel(JsonNodeFactory.instance.objectNode());
	}
	
	@Test
	public void successfullyValidatesCorrectJson() {
		user.setName("Salah11_Firmino21");
		user.setEmail("mci@lfc.com");
		user.setPasswordHash("06843A9E1C660DF054DEFFFC5B5B60E5");
		
		jsonValidationService.validateUserDetails(user.getJsonContent());
	}
	
	@Test(expected = JsonValidationException.class)
	public void mustFailWhenUserNameContainsIllegalCharacters() {
		user.setName("Jesus01?");
		user.setEmail("mci@lfc.com");
		user.setPasswordHash("06843A9E1C660DF054DEFFFC5B5B60E5");
		
		jsonValidationService.validateUserDetails(user.getJsonContent());
	}
	
	@Test(expected = JsonValidationException.class)
	public void mustFailWhenUserNameIsShorterThanSixCharacters() {
		user.setName("short");
		user.setEmail("mci@lfc.com");
		user.setPasswordHash("06843A9E1C660DF054DEFFFC5B5B60E5");
		
		jsonValidationService.validateUserDetails(user.getJsonContent());
	}
	
	@Test(expected = JsonValidationException.class)
	public void mustFailWhenUserNameIsLongerThanThirtyCharacters() {
		user.setName("some_too_long_user_name_that_is_not_supposed_to_pass");
		user.setEmail("mci@lfc.com");
		user.setPasswordHash("06843A9E1C660DF054DEFFFC5B5B60E5");
		
		jsonValidationService.validateUserDetails(user.getJsonContent());
	}
	
	@Test(expected = JsonValidationException.class)
	public void mustFailWhenUserNameIsMissing() {
		user.setName(null);
		user.setEmail("mci@lfc.com");
		user.setPasswordHash("06843A9E1C660DF054DEFFFC5B5B60E5");
		
		jsonValidationService.validateUserDetails(user.getJsonContent());
	}
	
	@Test(expected = JsonValidationException.class)
	public void mustFailWhenEmailDoesNotMatchFormat() {
		user.setName("Salah11_Firmino21");
		user.setEmail("this_is_not_an_email!");
		user.setPasswordHash("06843A9E1C660DF054DEFFFC5B5B60E5");
		
		jsonValidationService.validateUserDetails(user.getJsonContent());
	}
	
	@Test(expected = JsonValidationException.class)
	public void mustFailWhenEmailIsMissing() {
		user.setName("Salah11_Firmino21");
		user.setEmail(null);
		user.setPasswordHash("06843A9E1C660DF054DEFFFC5B5B60E5");
		
		jsonValidationService.validateUserDetails(user.getJsonContent());
	}
	
	@Test(expected = JsonValidationException.class)
	public void mustFailWhenPasswordHashContainsIllegalCharacters() {
		user.setName("Salah11_Firmino21");
		user.setEmail("mci@lfc.com");
		user.setPasswordHash("this_IS_NOT_valid_MD5_hash");
		
		jsonValidationService.validateUserDetails(user.getJsonContent());
	}
	
	@Test(expected = JsonValidationException.class)
	public void mustFailWhenPasswordHashIsMissing() {
		user.setName("Salah11_Firmino21");
		user.setEmail("mci@lfc.com");
		user.setPasswordHash(null);
		
		jsonValidationService.validateUserDetails(user.getJsonContent());
	}
	
	@Test(expected = JsonValidationException.class)
	public void mustFailWhenPasswordHashUsesLowercaseCharactersInsteadOfUppercaseOnes() {
		user.setName("Salah11_Firmino21");
		user.setEmail("mci@lfc.com");
		user.setPasswordHash("06843a9e1c660df054defffc5b5b60e5");
		
		jsonValidationService.validateUserDetails(user.getJsonContent());
	}
}
