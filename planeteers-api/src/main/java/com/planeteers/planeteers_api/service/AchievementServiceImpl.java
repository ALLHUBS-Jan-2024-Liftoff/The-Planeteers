package com.planeteers.planeteers_api.service;

import com.planeteers.planeteers_api.models.Achievement;
import com.planeteers.planeteers_api.models.data.AchievementRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AchievementServiceImpl implements AchievementService {

    private AchievementRepository achievementRepository;

    @Override
    public List<Achievement> getAllAchievements() {
        return achievementRepository.findAll();
    }


    public Optional<Achievement> getAchievementById(int achievementId) {
        return achievementRepository.findById(achievementId);
    }

    @Override
    public Achievement saveAchievement(Achievement achievement) {
        return achievementRepository.save(achievement);
    }

    @Override
    public void deleteAchievement(int id) {
        achievementRepository.deleteById(id);
    }
}
