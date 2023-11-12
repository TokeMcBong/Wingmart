package com.info5059.casestudyserver.Customer;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Transactional;

@RepositoryRestResource(collectionResourceRel = "customers", path = "customers")
public interface CustomerRepository extends CrudRepository<Customer, Long> {// extend so we can return the number of
                                                                            // rows
    // deleted
    @Modifying
    @Transactional
    @Query("delete from Customer where id = ?1")
    int deleteOne(Long userid);
}
