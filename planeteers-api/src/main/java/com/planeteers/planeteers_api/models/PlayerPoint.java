package com.planeteers.planeteers_api.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
public class PlayerPoint extends AbstractEntity{

    private int playerPoint;

    @OneToOne(mappedBy = "playerPoint")
    @JoinColumn(name = "user_id")
    private User user;

    public PlayerPoint() {}

    public PlayerPoint(int playerPoint, User user) {
        this.playerPoint = playerPoint;
        this.user = user;
    }
    public int getPlayerPoint() {
        return playerPoint;
    }

    public void setPlayerPoint(int playerPoint) {
        this.playerPoint = playerPoint;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
