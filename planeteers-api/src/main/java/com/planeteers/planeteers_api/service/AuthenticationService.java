package com.planeteers.planeteers_api.service;

import com.planeteers.planeteers_api.dto.LoginDTO;
import com.planeteers.planeteers_api.models.User;
import com.planeteers.planeteers_api.models.data.UserRepository;
import jakarta.validation.constraints.Null;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class AuthenticationService {

    @Autowired
    private UserRepository userRepository;

    public static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public User authenticateUser(LoginDTO loginDTO) throws Exception {
        Optional<User> optionalUser = userRepository.findByEmail(loginDTO.getEmail());
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (encoder.matches(loginDTO.getPassword(), user.getPwHash())) {
                return user;
            } else {
                throw new Exception("Invalid password");
            }
        } else {
            throw new Exception("User not found");
        }
    }
}
