package com.planeteers.planeteers_api.models.data;


import com.planeteers.planeteers_api.models.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {
}
