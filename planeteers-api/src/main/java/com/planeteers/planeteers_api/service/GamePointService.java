//package com.planeteers.planeteers_api.service;
//
//import com.planeteers.planeteers_api.models.GamePoint;
//import com.planeteers.planeteers_api.models.data.GamePointRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//
//public class GamePointService {
//
//        @Autowired
//        private GamePointRepository gamePointRepository;
//
//        public GamePoint addPoints(String email, int pointsToAdd) {
//            GamePoint gamePoints = gamePointRepository.findByEmail(email);
//            if (gamePoints == null) {
//                gamePoints = new GamePoint(user, 0);
//            }
//            gamePoints.setGamePoint(gamePoints.getGamePoint() + pointsToAdd);
//            return gamePointRepository.save(gamePoints);
//        }
//
//        public GamePoint subtractPoints(String username, int pointsToSubtract) {
//            GamePoint userPoints = gamePointRepository.findByEmail(username);
//            if (userPoints != null) {
//                userPoints.setGamePoint(userPoints.getGamePoint() - pointsToSubtract);
//                return gamePointRepository.save(userPoints);
//            }
//            return null;
//        }
//    }
//
//}
