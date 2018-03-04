package ee.ttu.tarkvaratehnika.entity;

import java.util.Date;
import java.util.List;
import javax.persistence.*;
import lombok.Data;

@Entity
@Table(name = "question", schema = "quizzy")
@Data
public class QuestionEntity {
	
	@Id
	@Column(name = "question_id", updatable = false, insertable = false)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "question_seq")
	@SequenceGenerator(name = "question_seq", sequenceName = "question_seq")
	private Integer questionId;
	
	@OneToMany(mappedBy = "question")
	private List<AnswerEntity> answers;
	
	@ManyToOne()
	@JoinColumn(name = "quiz_id", nullable = false)
	private QuizEntity quiz;
	
	@Column(name = "content")
	private String content;
	
	@Column(name = "type")
	private String type;
	
	@Column(name = "points")
	private Integer points;
	
	@Column(name = "creation_date")
	@Temporal(TemporalType.TIMESTAMP)
	private Date creationDate;
	
	@Column(name = "modified_date")
	@Temporal(TemporalType.TIMESTAMP)
	private Date modifiedDate;
}
