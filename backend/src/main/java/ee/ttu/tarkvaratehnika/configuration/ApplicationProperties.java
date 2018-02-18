package ee.ttu.tarkvaratehnika.configuration;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "quizzifly")
public class ApplicationProperties {
	
	public static final String API_PREFIX = "/quizzifly/api";
}
