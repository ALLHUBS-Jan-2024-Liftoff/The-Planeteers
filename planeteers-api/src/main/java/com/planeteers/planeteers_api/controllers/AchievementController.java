package com.planeteers.planeteers_api.controllers;

import com.planeteers.planeteers_api.models.Achievement;
import com.planeteers.planeteers_api.service.AchievementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/achievements")
@CrossOrigin(origins = "http://localhost:5173")
public class AchievementController {

    private final AchievementService achievementService;

    @Autowired
    public AchievementController(AchievementService achievementService) {
        this.achievementService = achievementService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Achievement> getAchievementById(@PathVariable int id) {
        Optional<Achievement> achievement = achievementService.getAchievementById(id);
        return achievement.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Achievement> createAchievement(@RequestBody Achievement achievement) {
        Achievement savedAchievement = achievementService.saveAchievement(achievement);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedAchievement);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Achievement> updateAchievement(@PathVariable int id, @RequestBody Achievement achievement) {
        if (!achievementService.getAchievementById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        Achievement updatedAchievement = achievementService.saveAchievement(achievement);
        return ResponseEntity.ok(updatedAchievement);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAchievement(@PathVariable int id) {
        if (achievementService.getAchievementById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        achievementService.deleteAchievement(id);
        return ResponseEntity.noContent().build();
    }
}