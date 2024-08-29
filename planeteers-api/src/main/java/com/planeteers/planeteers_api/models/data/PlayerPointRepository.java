package com.planeteers.planeteers_api.models.data;

import com.planeteers.planeteers_api.models.PlayerPoint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlayerPointRepository extends JpaRepository<PlayerPoint, Integer> {
}
