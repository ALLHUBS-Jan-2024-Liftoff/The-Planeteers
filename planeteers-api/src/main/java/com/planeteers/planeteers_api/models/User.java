package com.planeteers.planeteers_api.models;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.ArrayList;
import java.util.List;

@Entity
public class User extends AbstractEntity{
    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();


    @Size(max = 100)
    @NotNull(message = "Cannot be blank")
    private String name;
    @Email
    @NotNull
    private String email;
    @NotNull
    @Min(value= 13, message = "Must be over 13 to play")
    private int age;


    @NotNull
    private String pwHash;
    @OneToMany
    @JoinColumn(name = "user_id")
    private final List<Score> scores = new ArrayList<>();

    @OneToOne
    private final List<Credit> credits = new ArrayList<>();


    @OneToMany
    @JoinColumn(name = "user_id")
    private final List<Comment> comments = new ArrayList<>();

    public User () {}

    public User(String name, String email, int age, String password) {
        super ();
        this.email = email;
        this.age = age;
        this.pwHash = encoder.encode(password);
    }

    //getters and setters


    public String getPwHash() {
        return pwHash;
    }

    public void setPwHash(String pwHash) {
        this.pwHash = pwHash;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }


}
