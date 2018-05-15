package ee.ttu.tarkvaratehnika.entity;

import java.util.Date;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "user", schema = "quizzy")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserEntity {
	
	@Id
	@Column(name = "user_id", updatable = false, insertable = false)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "quizzy.user_seq")
	@SequenceGenerator(name = "quizzy.user_seq", sequenceName = "quizzy.user_seq")
	private Integer userId;
	
	@OneToMany(mappedBy = "user", orphanRemoval = true, cascade = CascadeType.PERSIST)
	private List<QuizEntity> quizzes;
	
	@Column(name = "name")
	private String name;
	
	@Column(name = "password")
	private String passwordHash;
	
	@Column(name = "email")
	private String email;
	
	@Column(name = "creation_date")
	@Temporal(TemporalType.TIMESTAMP)
	private Date creationDate;
	
	@Column(name = "modified_date")
	@Temporal(TemporalType.TIMESTAMP)
	private Date modifiedDate;
}
