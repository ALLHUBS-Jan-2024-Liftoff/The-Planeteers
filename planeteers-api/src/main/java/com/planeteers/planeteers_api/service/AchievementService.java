package com.planeteers.planeteers_api.service;

import com.planeteers.planeteers_api.models.Achievement;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public interface AchievementService {

    public List<Achievement> getAllAchievements();


    public Optional<Achievement> getAchievementById(int achievementId) ;

    public Achievement saveAchievement(Achievement achievement) ;

    public void deleteAchievement(int id);

}
