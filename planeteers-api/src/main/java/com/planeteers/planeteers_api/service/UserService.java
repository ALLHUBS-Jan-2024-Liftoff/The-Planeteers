package com.planeteers.planeteers_api.service;


import com.planeteers.planeteers_api.models.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.Optional;

import java.util.List;

@Service
public interface UserService {

    public List<User> getAllUsers();

    UserDetails loadUserByUsername(String username) throws UsernameNotFoundException;

    public User saveUser(User user);

    public User findUserProfileByJwt(String jwt);

    public User findUserByEmail(String email) ;

    public User findUserById(String userId) ;

    public List<User> findAllUsers();

    Optional<User> getUserById(int id);

    Optional<User> updateUser(int id, User user);

    public String currentUser(String username);


}
