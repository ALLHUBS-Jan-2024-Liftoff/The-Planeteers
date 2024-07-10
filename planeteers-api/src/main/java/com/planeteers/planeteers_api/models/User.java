package com.planeteers.planeteers_api.models;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

import java.util.ArrayList;
import java.util.List;

@Entity
public class User extends AbstractEntity{

    @Email
    @NotNull
    private String email;

    private int age;

    @OneToMany
    @JoinColumn(name = "user_id")
    private final List<Score> scores = new ArrayList<>();

    @OneToOne
    private final List<Credit> credits = new ArrayList<>();

    @OneToMany
    @JoinColumn(name = "user_id")
    private final List<Comment> comments = new ArrayList<>();

    public User () {}

    public User(String email, int age) {
        super ();
        this.email = email;
        this.age = age;
    }

    //getters and setters
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
