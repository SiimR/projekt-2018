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
@Table(name = "quiz", schema = "quizzy")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuizEntity {
	
	@Id
	@Column(name = "quiz_id", updatable = false, insertable = false)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "quizzy.quiz_seq")
	@SequenceGenerator(name = "quizzy.quiz_seq", sequenceName = "quizzy.quiz_seq")
	private Integer quizId;
	
	@OneToMany(mappedBy = "quiz", cascade = CascadeType.PERSIST)
	private List<QuestionEntity> questions;
	
	@ManyToOne()
	@JoinColumn(name = "user_id", nullable = false)
	private UserEntity user;
	
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
	
	@Column(name = "active")
	private Boolean active;
}
