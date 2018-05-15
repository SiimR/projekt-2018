package ee.ttu.tarkvaratehnika.dao;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import ee.ttu.tarkvaratehnika.entity.UserAnswerEntity;

@Repository
@Transactional
public class UserAnswerRepository {
	
	private SessionFactory sessionFactory;
	
	public Integer save(UserAnswerEntity entity) {
		return (Integer) sessionFactory.getCurrentSession().save(entity);
	}
	
	@Autowired
	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}

}
