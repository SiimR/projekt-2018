package ee.ttu.tarkvaratehnika.exception;

import java.util.ArrayList;
import java.util.List;
import com.github.fge.jsonschema.core.report.ProcessingMessage;
import com.github.fge.jsonschema.core.report.ProcessingReport;

public class JsonValidationException extends BasicException {
	
	private final ProcessingReport report;
	
	public JsonValidationException(ProcessingReport report) {
		this.report = report;
	}
	
	public List<ProcessingMessage> getMessages() {
		List<ProcessingMessage> messages = new ArrayList<>();
		
		if (report != null) {
			report.forEach(messages::add);
		}
		
		return messages;
	}
}
