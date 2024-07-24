package com.planeteers.planeteers_api.service;


import com.planeteers.planeteers_api.models.User;
import com.planeteers.planeteers_api.models.data.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

import java.util.List;

@Service
public interface UserService {

    public User saveUser(User user);

    public List<User> getAllUsers();

    Optional<User> getUserById(int id);

    Optional<User> updateUser(int id, User user);

    User findByEmail(String email);

}
