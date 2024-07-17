package com.planeteers.planeteers_api.controllers;


import com.planeteers.planeteers_api.models.User;
import com.planeteers.planeteers_api.models.data.UserRepository;
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

@Controller
@RequestMapping("user")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/")
    public User index(){
        return (User) userRepository.findAll();
    }

    @PostMapping("create")
    public ResponseEntity<?> createUser(@ModelAttribute @Valid User user, Errors errors){
        if (errors.hasErrors()){
            List<String> errorMessages = new ArrayList<>();
            for (ObjectError error : errors.getAllErrors()) {
                errorMessages.add(error.getDefaultMessage());
            }
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(errorMessages);
        }
        userRepository.save(user);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(user);
    }

}
