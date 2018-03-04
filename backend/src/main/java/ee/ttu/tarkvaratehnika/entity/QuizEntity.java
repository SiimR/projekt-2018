package ee.ttu.tarkvaratehnika.entity;

import java.util.Date;
import java.util.List;
import javax.persistence.*;
import lombok.Data;

@Entity
@Table(name = "quiz", schema = "quizzy")
@Data
public class QuizEntity {
	
	@Id
	@Column(name = "quiz_id", updatable = false, insertable = false)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "quiz_seq")
	@SequenceGenerator(name = "quiz_seq", sequenceName = "quiz_seq")
	private Integer quizId;
	
	@Column(name = "user_id")
	private Integer userId;
	
	@OneToMany(mappedBy = "quiz")
	private List<QuestionEntity> questions;
	
	@Column(name = "name")
	private String name;
	
	@Column(name = "reference")
	private String reference;
	
	@Column(name = "description")
	private String description;
	
	@Column(name = "creation_date")
	@Temporal(TemporalType.TIMESTAMP)
	private Date creationDate;
	
	@Column(name = "modified_date")
	@Temporal(TemporalType.TIMESTAMP)
	private Date modifiedDate;
}
