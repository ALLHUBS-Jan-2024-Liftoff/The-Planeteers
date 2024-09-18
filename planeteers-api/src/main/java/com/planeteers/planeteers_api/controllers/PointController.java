package com.planeteers.planeteers_api.controllers;


import com.planeteers.planeteers_api.dto.PointDTO;
import com.planeteers.planeteers_api.models.GamePoint;
import com.planeteers.planeteers_api.models.User;
import com.planeteers.planeteers_api.models.data.GamePointRepository;
import com.planeteers.planeteers_api.models.data.UserRepository;
import com.planeteers.planeteers_api.securityConfig.JwtProvider;
import com.planeteers.planeteers_api.service.PointService;
import com.planeteers.planeteers_api.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/points")
public class PointController {

    @Autowired
    private PointService pointService;

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private GamePointRepository gamePointRepository;

    public PointController(UserService userService, PointService pointService) {
        this.userService = userService;
        this.pointService = pointService;
    }


//    @PostMapping("/gamePoints/saveOrUpdate")
//    public ResponseEntity<?> saveOrUpdateGamePoints(@RequestBody @Valid PointDTO pointDTO) {
//        User user = userRepository.findById(pointDTO.getUserId())
//                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + pointDTO.getUserId()));
//
//        GamePoint gamePoint = user.getGamePoint();
//        if (gamePoint == null) {
//            gamePoint = new GamePoint();
//            gamePoint.setUser(user);
//        }
//
//        // Update the gamePoint value
//        gamePoint.setGamePoint(pointDTO.getGamePoint());
//
//        try {
//            gamePoint = gamePointRepository.save(gamePoint);
//            user.setGamePoint(gamePoint);
//            userRepository.save(user);
//
//            return new ResponseEntity<>(gamePoint, HttpStatus.CREATED);
//        } catch (Exception e) {
//            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
//        }
//    }






//    @PostMapping("updatePlayerPoints")
//    public ResponseEntity<String> updatePlayerPoints(@RequestBody @Valid PointDTO pointDTO, HttpServletRequest request) {
//        // Extract the JWT token from the request header
//        String token = request.getHeader("Authorization");
//        if (token == null || !token.startsWith("Bearer ")) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token not provided");
//        }
//        token = token.substring(7); // Remove "Bearer " prefix
//
//        try {
//            // Save player points using the token
//            pointService.savePlayerPoint(pointDTO, token);
//            return ResponseEntity.ok("Player points updated successfully.");
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
//        }
//    }

    @PostMapping("/gamePoints/saveOrUpdate")
    public ResponseEntity<?> saveOrUpdateGamePoints(@RequestBody @Valid PointDTO pointDTO) {
        User user = userRepository.findById(pointDTO.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + pointDTO.getUserId()));

        GamePoint gamePoint = user.getGamePoint();
        if (gamePoint == null) {
            gamePoint = new GamePoint();
            gamePoint.setUser(user);
        }

        // Update the gamePoint value
        gamePoint.setGamePoint(pointDTO.getGamePoint());

        try {
            gamePoint = gamePointRepository.save(gamePoint);
            user.setGamePoint(gamePoint);
            userRepository.save(user);

            return new ResponseEntity<>(gamePoint, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }


    @PostMapping("/updatePlayerPoints")
    public ResponseEntity<String> updatePlayerPoints(@RequestBody @Valid PointDTO pointDTO, HttpServletRequest request) {
        // Extract the JWT token from the request header
        String token = request.getHeader("Authorization");
        if (token == null || !token.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token not provided");
        }
        token = token.substring(7); // Remove "Bearer " prefix

        try {
            // Save player points using the token
            pointService.savePlayerPoint(pointDTO, token);
            return ResponseEntity.ok("Player points updated successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }


}
