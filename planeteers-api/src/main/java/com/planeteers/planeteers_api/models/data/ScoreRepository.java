package com.planeteers.planeteers_api.models.data;


import com.planeteers.planeteers_api.models.Score;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ScoreRepository extends CrudRepository<Score, Integer> {
}
