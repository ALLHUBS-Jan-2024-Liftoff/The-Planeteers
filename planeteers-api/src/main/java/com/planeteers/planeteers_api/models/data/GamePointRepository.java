package com.planeteers.planeteers_api.models.data;

import com.planeteers.planeteers_api.models.GamePoint;
import com.planeteers.planeteers_api.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GamePointRepository extends JpaRepository<User, Integer> {
    GamePoint findByEmail(String email);
}
