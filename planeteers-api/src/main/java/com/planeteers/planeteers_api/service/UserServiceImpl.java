package com.planeteers.planeteers_api.service;

import com.planeteers.planeteers_api.models.User;
import com.planeteers.planeteers_api.models.data.UserRepository;
import jakarta.validation.constraints.Email;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;

    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
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
    public User findByEmail(String email) {

        return userRepository.findByEmail(email);
    }
}
