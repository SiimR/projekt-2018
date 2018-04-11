package ee.ttu.tarkvaratehnika.configuration;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import lombok.Getter;
import lombok.Setter;

@Configuration
@ConfigurationProperties(prefix = "quizzifly")
@Getter
public class ApplicationProperties {
	
	public static final String API_PREFIX = "/quizzifly/api";
	
	private final CorsProperties cors = new CorsProperties();
	private final ValidationProperties validation = new ValidationProperties();
	
	@Getter
	@Setter
	public static class CorsProperties {
		private String[] allowedOrigins;
		private String[] allowedMethods;
		private String[] allowedHeaders;
	}
	
	@Getter
	@Setter
	public static class ValidationProperties {
		private String userJsonSchemaUrl;
	}
}
