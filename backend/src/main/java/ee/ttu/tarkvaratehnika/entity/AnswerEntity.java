package ee.ttu.tarkvaratehnika.entity;

import java.util.Date;
import javax.persistence.*;
import lombok.Data;

@Entity
@Table(name = "answer", schema = "quizzy")
@Data
public class AnswerEntity {
	
	@Id
	@Column(name = "answer_id", updatable = false, insertable = false)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "answer_seq")
	@SequenceGenerator(name = "answer_seq", sequenceName = "answer_seq")
	private Integer answerId;
	
	@ManyToOne
	@JoinColumn(name = "question_id", nullable = false)
	private QuestionEntity question;
	
	@Column(name = "content")
	private String content;
	
	@Column(name = "is_correct")
	private Boolean correct;
	
	@Column(name = "creation_date")
	@Temporal(TemporalType.TIMESTAMP)
	private Date creationDate;
	
	@Column(name = "modified_date")
	@Temporal(TemporalType.TIMESTAMP)
	private Date modifiedDate;
}
