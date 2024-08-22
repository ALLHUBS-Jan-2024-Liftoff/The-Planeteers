//package com.planeteers.planeteers_api.config;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.session.web.http.HttpSessionIdResolver;
//import org.springframework.session.web.http.CookieHttpSessionIdResolver;
//
//@Configuration
//public class SessionConfig {
//    @Bean
//    public HttpSessionIdResolver httpSessionIdResolver() {
//        return new CookieHttpSessionIdResolver();
//    }
//    @Bean
//    public PasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder();
//    }
//}
