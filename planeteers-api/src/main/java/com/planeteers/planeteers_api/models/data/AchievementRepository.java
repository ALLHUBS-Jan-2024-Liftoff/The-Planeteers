package com.planeteers.planeteers_api.models.data;
import com.planeteers.planeteers_api.models.Achievement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AchievementRepository extends JpaRepository<Achievement, Integer> {
}
