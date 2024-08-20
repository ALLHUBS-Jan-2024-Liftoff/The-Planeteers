package com.planeteers.planeteers_api.models.data;

import com.planeteers.planeteers_api.models.GamePoint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GamePointRepository extends JpaRepository<GamePoint, Integer> {
}
