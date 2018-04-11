package ee.ttu.tarkvaratehnika.entity;

import java.util.Date;
import java.util.List;

import javax.persistence.*;

import ee.ttu.tarkvaratehnika.entity.UserEntity.UserEntityBuilder;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "answer", schema = "quizzy")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnswerEntity {
	
	@Id
	@Column(name = "answer_id", updatable = false, insertable = false)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "quizzy.answer_seq")
	@SequenceGenerator(name = "quizzy.answer_seq", sequenceName = "quizzy.answer_seq")
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
