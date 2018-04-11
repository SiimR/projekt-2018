package ee.ttu.tarkvaratehnika.configuration;

import java.io.IOException;
import javax.persistence.EntityManagerFactory;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import com.github.fge.jackson.JsonLoader;
import ee.ttu.tarkvaratehnika.service.JsonValidationService;

@Configuration
@EnableConfigurationProperties(ApplicationProperties.class)
public class ApplicationConfiguration {
	
	@Autowired
	private EntityManagerFactory entityManagerFactory;
	
	@Bean
	public SessionFactory sessionFactory() {
		return entityManagerFactory.unwrap(SessionFactory.class);
	}
	
	@Bean
	public JsonValidationService jsonValidationService(ApplicationProperties applicationProperties) throws IOException {
		return new JsonValidationService(
				JsonLoader.fromResource(applicationProperties.getValidation().getUserJsonSchemaUrl()));
	}

}
