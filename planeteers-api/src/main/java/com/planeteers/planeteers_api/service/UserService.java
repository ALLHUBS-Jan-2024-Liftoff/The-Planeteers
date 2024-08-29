package com.planeteers.planeteers_api.service;


import com.planeteers.planeteers_api.models.User;
import com.planeteers.planeteers_api.models.data.UserRepository;
import com.planeteers.planeteers_api.response.AuthResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
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

    public  User currentUser();

    AuthResponse getCurrentUser(HttpSession session); // Updated to include HttpSession parameter

    public boolean verifyUserToken(User user, String token);
}
