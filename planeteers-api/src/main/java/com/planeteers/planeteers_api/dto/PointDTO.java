package com.planeteers.planeteers_api.dto;


import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;

public class PointDTO {

    private int gamePoint;
    private int playerPoint;

    @NotNull(message = "user id cannot be null")
    @JsonProperty("user_id")
    private Integer userId;

    // Getters and Setters
    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public int getGamePoint() {
        return gamePoint;
    }

    public void setGamePoint(int gamePoint) {
        this.gamePoint = gamePoint;
    }

    public int getPlayerPoint() {
        return playerPoint;
    }

    public void setPlayerPoint(int playerPoint) {
        this.playerPoint = playerPoint;
    }
}
