package com.planeteers.planeteers_api.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;

public class GamePoint extends AbstractEntity{

    private int gamePoint;

    @OneToOne(mappedBy = "gamePoint")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference
    private User user;

    public GamePoint() {}

    public GamePoint(User user, int gamePoint) {
        this.user = user;
        this.gamePoint = gamePoint;
    }

    public int getGamePoint() {
        return gamePoint;
    }

    public void setGamePoint(User user, int gamePoint) {
        this.user = user;
        this.gamePoint = gamePoint;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
