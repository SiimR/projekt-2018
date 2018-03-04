package ee.ttu.tarkvaratehnika.dao;

import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import ee.ttu.tarkvaratehnika.entity.QuizEntity;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public class QuizRepository {
	
	private SessionFactory sessionFactory;
	
	public QuizEntity findByReference(String reference) {
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(QuizEntity.class);
		
		criteria.add(Restrictions.eq("reference", reference));
		
		return (QuizEntity) criteria.uniqueResult();
	}

	@Autowired
	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}
}
