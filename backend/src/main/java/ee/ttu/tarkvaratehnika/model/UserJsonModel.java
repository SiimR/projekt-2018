package ee.ttu.tarkvaratehnika.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonRawValue;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserJsonModel {
	
	private final static String NAME_KEY = "name";
	private final static String EMAIL_KEY = "email";
	private final static String PASSWORD_HASH_KEY = "passwordHash";
	
	@JsonProperty("details")
	@JsonRawValue
	private JsonNode jsonContent;
	
	public String getName() {
		return jsonContent.path(NAME_KEY).asText(null);
	}
	
	public String getEmail() {
		return jsonContent.path(EMAIL_KEY).asText(null);
	}
	
	public String getPasswordHash() {
		return jsonContent.path(PASSWORD_HASH_KEY).asText(null);
	}
	
	public void setName(String name) {
		((ObjectNode) jsonContent).put(NAME_KEY, name);
	}
	
	public void setEmail(String email) {
		((ObjectNode) jsonContent).put(EMAIL_KEY, email);
	}
	
	public void setPasswordHash(String passwordHash) {
		((ObjectNode) jsonContent).put(PASSWORD_HASH_KEY, passwordHash);
	}
}
