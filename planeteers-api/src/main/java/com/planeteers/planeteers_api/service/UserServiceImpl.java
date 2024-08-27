package com.planeteers.planeteers_api.service;

import com.planeteers.planeteers_api.models.User;
import com.planeteers.planeteers_api.models.data.UserRepository;
import com.planeteers.planeteers_api.response.AuthResponse;
import com.planeteers.planeteers_api.securityConfig.JwtProvider;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;



    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username);
        System.out.println(user);

        if (user == null) {
            throw new UsernameNotFoundException("User not found with this email" + username);

        }


        System.out.println("Loaded user: " + user.getEmail());
        List<GrantedAuthority> authorities = new ArrayList<>();
        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPwHash(),
                authorities);
    }

    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User findUserProfileByJwt(String jwt) {
        return null;
    }

    @Override
    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public User findUserById(String userId) {
        return null;
    }

    @Override
    public List<User> findAllUsers() {
        return List.of();
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> getUserById(int id) {
        return userRepository.findById(id);
    }

    @Override
    public Optional<User> updateUser(int id, User user) {
        Optional<User> optUser = userRepository.findById(id);
        if (!optUser.isPresent()) {
            return Optional.empty();
        }
        try {
            User currentUser = optUser.get();
            currentUser.setName(user.getName());
            currentUser.setAge(user.getAge());
            currentUser.setEmail(user.getEmail());
            if (user.getPwHash() != null && !user.getPwHash().isEmpty()) {
                currentUser.setPwHash(user.getPwHash());
            }
            userRepository.save(currentUser);
            return Optional.of(currentUser);
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    @Override
    public User currentUser() {
        // Get the authentication object from the security context
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // The email of the authenticated user
        String email = (String) authentication.getPrincipal();

        // Retrieve the user details from the database or service
        User user = userRepository.findByEmail(email);

        return user;
    }


    @Override
    public AuthResponse getCurrentUser(HttpSession session) {
        User currentUser = (User) session.getAttribute("currentUser");
        String token = (String) session.getAttribute("jwtToken");

        if (currentUser == null || token == null) {
            throw new RuntimeException("No user is currently logged in or token is missing");
        }

        AuthResponse authResponse = new AuthResponse();
        authResponse.setUser(currentUser);
        authResponse.setJwt(token);
        authResponse.setMessage("User retrieved successfully");
        authResponse.setStatus(true);

        return authResponse;
    }

    @Override
    public boolean verifyUserToken(User user, String token) {
        return token.equals(user.getJwtToken());
    }
}