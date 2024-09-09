package com.planeteers.planeteers_api.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

@Entity
public class GamePoint extends AbstractEntity{

    private int gamePoint;

    @OneToOne(mappedBy = "gamePoint")
    @JsonManagedReference
    private User user;

    public GamePoint() {}

    public GamePoint(User user, int gamePoint) {
        this.user = user;
        this.gamePoint = gamePoint;
    }

    public int getGamePoint() {
        return gamePoint;
    }

    public void setGamePoint(int gamePoint) {
        this.gamePoint = gamePoint;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

//    @Override
//    public String toString() {
//        return "GamePoint{" +
//                "gamePoint=" + gamePoint +
//                ", user=" + user +
//                '}';
//    }
}
