package com.planeteers.planeteers_api.models.data;

import com.planeteers.planeteers_api.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlayerPointRepository extends JpaRepository<User, Integer> {
}
