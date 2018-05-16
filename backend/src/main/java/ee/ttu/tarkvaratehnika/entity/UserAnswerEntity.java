package ee.ttu.tarkvaratehnika.entity;

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "user_answer", schema = "quizzy")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserAnswerEntity {
	
	@Id
	@Column(name = "id", updatable = false, insertable = false)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "quizzy.user_answer_seq")
	@SequenceGenerator(name = "quizzy.user_answer_seq", sequenceName = "quizzy.user_answer_seq")
	private Integer id;
	
	@Column(name = "quiz_reference")
	private String quizReference;
	
	@Column(name = "user_name")
	private String userName;
	
	@Column(name = "correct")
	private Integer amountOfCorrectAnswers;
	
	@Column(name = "total")
	private Integer amountOfTotalAnswers;
	
	@Column(name = "date_answered")
	@Temporal(TemporalType.TIMESTAMP)
	private Date dateAnswered;
}
