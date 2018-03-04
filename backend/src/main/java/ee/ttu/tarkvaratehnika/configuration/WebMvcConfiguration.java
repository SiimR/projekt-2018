package ee.ttu.tarkvaratehnika.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.Assert;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
public class WebMvcConfiguration extends WebMvcConfigurerAdapter {
	
	private final String[] allowedOrigins;
	private final String[] allowedMethods;
	private final String[] allowedHeaders;
	
	@Autowired
	public WebMvcConfiguration(ApplicationProperties applicationProperties) {
		allowedOrigins = applicationProperties.getCors().getAllowedOrigins();
		Assert.notEmpty(allowedOrigins, "Allowed origins must be defined");
		
		allowedMethods = applicationProperties.getCors().getAllowedMethods();
		Assert.notEmpty(allowedMethods, "Allowed methods must be defined");
		
		allowedHeaders = applicationProperties.getCors().getAllowedHeaders();
		Assert.notEmpty(allowedHeaders, "Allowed headers must be defined");
	}
	
	@Override
	public void addCorsMappings(CorsRegistry corsRegistry) {
		corsRegistry.addMapping("/**")
				.allowedOrigins(allowedOrigins)
				.allowedMethods(allowedMethods)
				.allowedHeaders(allowedHeaders);
	}

}
