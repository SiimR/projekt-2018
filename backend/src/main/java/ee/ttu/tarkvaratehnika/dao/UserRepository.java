package ee.ttu.tarkvaratehnika.dao;

import javax.transaction.Transactional;
import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import ee.ttu.tarkvaratehnika.entity.UserEntity;

@Repository
@Transactional
public class UserRepository {
	
	private SessionFactory sessionFactory;
	
	public UserEntity findLogin(String name, String passwordHash) {
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(UserEntity.class);
		
		criteria.add(Restrictions.eq("name", name));
		criteria.add(Restrictions.eq("passwordHash", passwordHash));
		
		return (UserEntity) criteria.uniqueResult();
	}
	
	@Autowired
	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}
}
