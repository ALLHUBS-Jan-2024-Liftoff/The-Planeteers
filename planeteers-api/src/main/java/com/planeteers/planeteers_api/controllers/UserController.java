package com.planeteers.planeteers_api.controllers;


import com.planeteers.planeteers_api.dto.LoginDTO;
import com.planeteers.planeteers_api.dto.RegistrationDTO;
import com.planeteers.planeteers_api.models.User;
import com.planeteers.planeteers_api.models.data.UserRepository;
import com.planeteers.planeteers_api.service.AuthenticationService;
import com.planeteers.planeteers_api.service.RegistrationService;
import com.planeteers.planeteers_api.service.UserService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.Errors;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("user")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private AuthenticationService authenticationService;
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

    @GetMapping("/checkLogin")
    public void checkLogin(HttpSession session) {
        User currentUser = (User) session.getAttribute("currentUser");
        System.out.println(currentUser.getEmail());
    }


    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Integer id) {
        Optional<User> user = userService.getUserById(id);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found with id");
        }
    }
    @PutMapping("/edit/{id}")
    public ResponseEntity<?> editUser(@PathVariable int id, @RequestBody @Valid User user) {
        Optional<User> updatedUser = userService.updateUser(id, user);
        if (updatedUser.isPresent()) {
            return ResponseEntity.ok(updatedUser.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found with id: " + id);
        }
    }


}
