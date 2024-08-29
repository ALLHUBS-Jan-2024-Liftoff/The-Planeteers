package com.planeteers.planeteers_api.models.data;

import com.planeteers.planeteers_api.models.Credit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CreditRepository extends JpaRepository<Credit, Integer> {
}
