package com.planeteers.planeteers_api.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;

public class PlayerPoint extends AbstractEntity{

    private int playerPoint;

    @OneToOne(mappedBy = "playerPoint")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference
    private User user;

    public PlayerPoint() {}

    public PlayerPoint(int playerPoint) {
        this.playerPoint = playerPoint;
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
