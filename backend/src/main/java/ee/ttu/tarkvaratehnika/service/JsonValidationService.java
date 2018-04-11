package ee.ttu.tarkvaratehnika.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.github.fge.jsonschema.core.exceptions.ProcessingException;
import com.github.fge.jsonschema.core.report.ProcessingReport;
import com.github.fge.jsonschema.main.JsonSchema;
import com.github.fge.jsonschema.main.JsonSchemaFactory;

import ee.ttu.tarkvaratehnika.exception.JsonValidationException;

public class JsonValidationService {
	
	private JsonSchema userSchema;
	
	public JsonValidationService(JsonNode userSchema) {
		try {
			this.userSchema = JsonSchemaFactory.byDefault().getJsonSchema(userSchema);
		} catch (ProcessingException e) {
			throw new RuntimeException("Failed to load Json schema", e);
		}
	}
	
	public ProcessingReport validateUserDetails(JsonNode json) {
		try {
			ProcessingReport report = userSchema.validate(json, true);
			report.forEach(System.out::println);
			
			if (!report.isSuccess()) {
				throw new JsonValidationException(report);
			}
			
			return report;
		} catch (ProcessingException e) {
			throw new RuntimeException("Could not validate user details Json", e);
		}
	}
}
