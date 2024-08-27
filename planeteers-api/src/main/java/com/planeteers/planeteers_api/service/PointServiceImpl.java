package com.planeteers.planeteers_api.service;

import com.planeteers.planeteers_api.dto.CommentDTO;
import com.planeteers.planeteers_api.dto.PointDTO;
import com.planeteers.planeteers_api.models.Comment;
import com.planeteers.planeteers_api.models.GamePoint;
import com.planeteers.planeteers_api.models.PlayerPoint;
import com.planeteers.planeteers_api.models.User;
import com.planeteers.planeteers_api.models.data.GamePointRepository;
import com.planeteers.planeteers_api.models.data.PlayerPointRepository;
import com.planeteers.planeteers_api.models.data.UserRepository;
import com.planeteers.planeteers_api.securityConfig.JwtProvider;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PointServiceImpl implements PointService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PlayerPointRepository playerPointRepository;

    @Autowired
    private GamePointRepository gamePointRepository;


    public PointServiceImpl(UserRepository userRepository, PlayerPointRepository playerPointRepository, GamePointRepository gamePointRepository) {
        this.userRepository = userRepository;
        this.playerPointRepository = playerPointRepository;
        this.gamePointRepository = gamePointRepository;
    }

//

    @Override
    public PlayerPoint savePlayerPoint(PointDTO pointDTO, String token) {
        // Extract email from the JWT token
        String email = JwtProvider.getEmailFromJwtToken(token);
        if (email == null) {
            throw new RuntimeException("Invalid token"); // Or handle the error as needed
        }

        // Find the user based on the extracted email
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new EntityNotFoundException("User not found with email: " + email);
        }

        // Create the PlayerPoint entity based on the PointDTO
        PlayerPoint playerPoint = new PlayerPoint();
        playerPoint.setPlayerPoint(pointDTO.getPlayerPoint()); // Assuming PointDTO has a getPlayerPoint() method
        playerPoint.setUser(user); // Assuming PlayerPoint has a setUser() method

        return playerPointRepository.save(playerPoint);
    }


    @Override
    public GamePoint saveGamePoint(GamePoint gamePoint) {
        User user = gamePoint.getUser();
        if (user != null) {
            user.setGamePoint(gamePoint);
            System.out.println("Saving user with gamePoint: " + gamePoint.getGamePoint());
            userRepository.save(user);
        }
        System.out.println("Saving gamePoint: " + gamePoint.getGamePoint());
        return gamePointRepository.save(gamePoint);
    }

}
