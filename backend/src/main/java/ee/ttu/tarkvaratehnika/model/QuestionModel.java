package ee.ttu.tarkvaratehnika.model;

import java.util.Date;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuestionModel {
	
	private Integer id;
	private Integer quizId;
	private String content;
	private String type;
	private Integer points;
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ssZ")
	private Date creationDate;
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ssZ")
	private Date modifiedDate;
	private List<AnswerModel> answers;
}