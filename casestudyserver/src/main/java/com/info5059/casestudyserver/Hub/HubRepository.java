package com.info5059.casestudyserver.Hub;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Transactional;

@RepositoryRestResource(collectionResourceRel = "hubs", path = "hubs")
public interface HubRepository extends CrudRepository<Hub, Long> {// extend so we can return the number of rows
                                                                  // deleted
    @Modifying
    @Transactional
    @Query("delete from Hub where id = ?1")
    int deleteOne(Long hubid);
}
