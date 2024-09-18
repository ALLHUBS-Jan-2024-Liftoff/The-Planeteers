package com.planeteers.planeteers_api.controllers;


import com.planeteers.planeteers_api.models.User;
import com.planeteers.planeteers_api.models.data.UserRepository;
import com.planeteers.planeteers_api.response.AuthResponse;
import com.planeteers.planeteers_api.securityConfig.JwtProvider;
import com.planeteers.planeteers_api.service.UserService;
import com.planeteers.planeteers_api.service.UserServiceImpl;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("user")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;


    @Autowired
    private UserServiceImpl customUserDetails;


    @Autowired
    private UserService userService;

    @GetMapping("/")
    public List<User> index() {
        return userService.getAllUsers();
    }


    @PostMapping("create")
    public ResponseEntity<AuthResponse> createUser(@RequestBody @Valid User user) {
        String email = user.getEmail();
        String password = user.getPwHash();
        String fullName = user.getName();
        int age = user.getAge();

         User isEmailExist = userRepository.findByEmail(email);
        if (isEmailExist != null){
            return new ResponseEntity<>(HttpStatus.CONFLICT); // Example response for email conflict

        }
        User createdUser = new User();
        createdUser.setEmail(email);
        createdUser.setName(fullName);
        createdUser.setAge(age);
        createdUser.setPwHash(passwordEncoder.encode(password));

        User savedUser = userRepository.save(createdUser);
        userRepository.save(savedUser);
        Authentication authentication = new UsernamePasswordAuthenticationToken(email, password);

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = JwtProvider.generateToken(authentication);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(token);
        authResponse.setMessage("Register Success");
        authResponse.setUser(savedUser);
        authResponse.setStatus(true);
        return new ResponseEntity<>(authResponse, HttpStatus.OK);

    }

    @PostMapping("login")
    public ResponseEntity<AuthResponse> loginUser(@RequestBody User loginRequest, HttpServletResponse response) {
        String username = loginRequest.getEmail();
        String password = loginRequest.getPwHash();

        // Authenticate user
        Authentication authentication = authenticate(username, password);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserDetails authenticatedUser = (UserDetails) authentication.getPrincipal();
        User currentUser = userRepository.findByEmail(username);

        if (currentUser == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        // Check if the user already has a JWT token stored
        String existingToken = currentUser.getJwtToken();
        Date tokenExpirationDate = currentUser.getTokenExpirationDate();

        if (existingToken != null && !existingToken.isEmpty() && tokenExpirationDate != null) {
            // Validate the existing token
            if (new Date().before(tokenExpirationDate)) {
                // If the token is still valid, return it without generating a new one
                response.addHeader("Authorization", "Bearer " + existingToken);

                AuthResponse authResponse = new AuthResponse();
                authResponse.setMessage("Login success");
                authResponse.setUser(currentUser);
                authResponse.setJwt(existingToken);
                authResponse.setStatus(true);

                return new ResponseEntity<>(authResponse, HttpStatus.OK);
            }
        }

        // Generate a new JWT token if the user doesn't have one or the existing one is invalid/expired
        String newToken = JwtProvider.generateToken(authentication);

        // Set token expiration date (e.g., 24 hours from now)
        Date newExpirationDate = new Date(System.currentTimeMillis() + 86400000); // 24 hours in milliseconds

        // Save the new token and its expiration date in the user's record
        currentUser.setJwtToken(newToken);
        currentUser.setTokenExpirationDate(newExpirationDate);
        userRepository.save(currentUser);

        response.addHeader("Authorization", "Bearer " + newToken);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setMessage("Login success");
        authResponse.setUser(currentUser);
        authResponse.setJwt(newToken);
        authResponse.setStatus(true);

        return new ResponseEntity<>(authResponse, HttpStatus.OK);
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

    private Authentication authenticate(String username, String password) {

        System.out.println(username + "---++----" + password);

        UserDetails userDetails = customUserDetails.loadUserByUsername(username);

        System.out.println("Sig in in user details" + userDetails);

        if (userDetails == null) {
            System.out.println("Sign in details - null" + userDetails);

            throw new BadCredentialsException("Invalid username and password");
        }
        if (!passwordEncoder.matches(password, userDetails.getPassword())) {
            System.out.println("Sign in userDetails - password mismatch" + userDetails);

            throw new BadCredentialsException("Invalid password");

        }
        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

    }


//    @GetMapping("currentUser")
//    public User currentUser(HttpSession session) {
//        // Retrieve the current user from the session
//        UserDetails authenticatedUser = (UserDetails) session.getAttribute("currentUser");
//        System.out.println(authenticatedUser);
//
//        if (authenticatedUser == null) {
//            throw new RuntimeException("No user is currently logged in");
//        }
//
//        // You may need to convert UserDetails to your User entity or return necessary user info
//        User user = userRepository.findByEmail(authenticatedUser.getUsername());
//
//        return user;
//    }

    @GetMapping("currentUser")
    public User currentUser() {
    return userService.currentUser();
    }

//    @GetMapping("getcurrentuser")
//    public String getCurrentUser() {
//        // Access the current authenticated user
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        String currentUserEmail = authentication.getName(); // This will be the email or username
//
//        // You can also access other details or authorities if needed
//        return "Current user: " + currentUserEmail;
//    }

    @GetMapping("current")
    public ResponseEntity<User> getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();  // Assuming email is the username
        User currentUser = userRepository.findByEmail(email);

        if (currentUser == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        return ResponseEntity.ok(currentUser);
    }

//    private String getTokenFromHeader(HttpServletRequest request) {
//        String authHeader = request.getHeader("Authorization");
//        if (authHeader != null && authHeader.startsWith("Bearer ")) {
//            return authHeader.substring(7); // Remove "Bearer " prefix
//        }
//        return null;
//    }
//
//    @PostMapping("/storeSessionData")
//    public String storeSessionData(HttpSession session, @RequestParam String data) {
//        // Store data in session
//        session.setAttribute("userData", data);
//        return "Data stored in session";
//    }
//
//    @GetMapping("/retrieveSessionData")
//    public String retrieveSessionData(HttpSession session) {
//        // Retrieve data from session
//        String data = (String) session.getAttribute("userData");
//        return "Stored data: " + data;
    }


