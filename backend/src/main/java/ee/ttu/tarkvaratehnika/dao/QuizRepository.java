package ee.ttu.tarkvaratehnika.dao;

import java.util.List;

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
	
	public List<QuizEntity> listUserRelated(Integer userId) {
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(QuizEntity.class);
		
		criteria.createAlias("user", "user");
		criteria.add(Restrictions.eq("user.userId", userId));
		
		return criteria.list();
	}

	@Autowired
	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}
}
