//package com.planeteers.planeteers_api.controllers;
//
//
//import com.planeteers.planeteers_api.models.User;
//import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//@RequestMapping("auth")
//public class AuthController {
//
//    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//    if (!(authentication instanceof AnonymousAuthenticationToken)) {
//        String currentUserName = authentication.getName();
//        return currentUserName;
//    }else{
//        throw RuntimeException("No User")
//    }
//
//}
//
