package com.planeteers.planeteers_api.controllers;


import com.planeteers.planeteers_api.dto.LoginDTO;
import com.planeteers.planeteers_api.dto.RegistrationDTO;
import com.planeteers.planeteers_api.models.User;
import com.planeteers.planeteers_api.models.data.UserRepository;

import com.planeteers.planeteers_api.service.AuthenticationService;
import com.planeteers.planeteers_api.service.RegistrationService;
import com.planeteers.planeteers_api.service.UserService;

import com.planeteers.planeteers_api.service.UserService;
import com.planeteers.planeteers_api.service.UserServiceImpl;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.context.annotation.Bean;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("user")
@CrossOrigin(origins = "http://127.0.0.1:5173")
public class UserController {

    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;


    @Autowired
    private UserServiceImpl customUserDetails;

    @Autowired
    private UserService userService;
    @Autowired
    private RegistrationService registrationService;
    @GetMapping("/")
    public List<User> index() {
        return userService.getAllUsers();
    }


    @PostMapping("create")
    public ResponseEntity<?> createUser(@RequestBody @Valid RegistrationDTO registrationDTO, HttpSession session, Errors errors){
        if (errors.hasErrors()) {
            List<String> errorMessages = new ArrayList<>();
            for (ObjectError error : errors.getAllErrors()) {
                errorMessages.add(error.getDefaultMessage());
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessages);
        }

        try {
        User user = registrationService.registerUser(registrationDTO);
        session.setAttribute("currentUser", user);
        System.out.println( " created user session" + session.getId());
        System.out.println("this is the current user after create" + session.getAttribute("currentUser"));
            return ResponseEntity.status(HttpStatus.CREATED).body(session.getAttribute("currentUser"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while creating the user.");
        }

    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody @Valid LoginDTO loginDTO, HttpSession session, Errors errors) {
        if (errors.hasErrors()) {
            List<String> errorMessages = new ArrayList<>();
            for (ObjectError error : errors.getAllErrors()) {
                errorMessages.add(error.getDefaultMessage());
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessages);
        }

        try {
            User user = authenticationService.authenticateUser(loginDTO);
            session.setAttribute("currentUser", user);
            System.out.println("User logged in:" + user.getEmail());
            System.out.println("Session ID: login " + session.getId());
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> checkLogin(HttpSession session) {
        try{
            User currentUser = (User) session.getAttribute("currentUser");
            if (currentUser != null){
                String sessionId = session.getId();
                System.out.println("Current user " + currentUser);
                System.out.println("session id " + sessionId);
                return ResponseEntity.ok(currentUser);
            }else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not logged in");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while retrieving the user");
        }

    }


  

   
    @GetMapping("{id}")
    public ResponseEntity<?> getUserById(@PathVariable Integer id) {
        Optional<User> user = userService.getUserById(id);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found with id");
        }
    }

    @PutMapping("edit/{id}")
    public ResponseEntity<?> editUser(@PathVariable int id, @RequestBody @Valid User user) {
        Optional<User> updatedUser = userService.updateUser(id, user);
        if (updatedUser.isPresent()) {
            return ResponseEntity.ok(updatedUser.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found with id: " + id);
        }
    }


    @DeleteMapping("/delete/{id}")
public ResponseEntity<?> deleteUser(@PathVariable int id) {
    try {
        userService.deleteUser(id);
        return ResponseEntity.ok("User deleted successfully");
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }
}
        @GetMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session){
    try{
        session.invalidate();
        System.out.println("User logged out. Session invalidated.");
        return ResponseEntity.ok("User successfully logged out");
    }catch (Exception e){
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while logging out");
    }
        }

    
}


