package com.planeteers.planeteers_api.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
public class User extends AbstractEntity{
//    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();


    @NotNull(message = "Cannot be blank")
    private String name;
    
    @Email
    @NotNull
    private String email;

    @NotNull
    @Min(value= 13, message = "Must be over 13 to play")
    private int age;

    @Size(min = 8, message = "Password must be 8 characters long")
    @NotNull
    private String pwHash;

    @OneToMany
    @JoinColumn(name = "user_id")
    private final List<Score> scores = new ArrayList<>();

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "credit", referencedColumnName = "id")
    private Credit credit;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "game_point_id", referencedColumnName = "id")  // Referring to the ID column in GamePoint
    @JsonBackReference
    private GamePoint gamePoint;


    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "playerPoint", referencedColumnName = "id")
    private PlayerPoint playerPoint;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonManagedReference
    private final List<Comment> comments = new ArrayList<>();

    private String jwtToken;

    // Add a field to store the expiration date of the JWT token
    private Date tokenExpirationDate;

    public User () {}

    public User(String name, String email, int age, String password) {
        super ();
        this.name = name;
        this.email = email;
        this.age = age;
        this.pwHash = password;
    }

    //getters and setters


    public String getPwHash() {
        return pwHash;
    }
    public void setPwHash(String password) {
        this.pwHash = password;
    }

//    public void setPwHash(String password) {
//        this.pwHash = encoder.encode(password);
//    }

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

    public List<Comment> getComments() {
        return comments;
    }

    public List<Score> getScores() {
        return scores;
    }

    public Credit getCredit() {
        return credit;
    }

    public void setCredit(Credit credit) {
        this.credit = credit;
    }

    public GamePoint getGamePoint() {
        return gamePoint;
    }

    public void setGamePoint(GamePoint gamePoint) {
        this.gamePoint = gamePoint;
    }

    public PlayerPoint getPlayerPoint() {
        return playerPoint;
    }

    public void setPlayerPoint(PlayerPoint playerPoint) {
        this.playerPoint = playerPoint;
    }

    public String getJwtToken() {
        return jwtToken;
    }

    public void setJwtToken(String jwtToken) {
        this.jwtToken = jwtToken;
    }

    public Date getTokenExpirationDate() {
        return tokenExpirationDate;
    }

    public void setTokenExpirationDate(Date tokenExpirationDate) {
        this.tokenExpirationDate = tokenExpirationDate;
    }

    @Override
    public String toString() {
        return "User{" +
                " id='" + getId() + '\'' +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", age=" + age +
                ", pwHash='" + pwHash + '\'' +
                ", scores=" + scores.size() +
                ", credit=" + (credit != null ? credit.getUser() : null) +
                ", comments=" + comments.size() +
                ", playerPoint" + playerPoint +
                ", gamePoint=" + gamePoint +
                ", gamePoint" + jwtToken +
                ", gamePoint" + tokenExpirationDate +
                '}';
    }

}