package com.planeteers.planeteers_api.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;

public class CommentDTO {
    @NotNull(message = "description can not be null")
    private String description;

    @NotNull(message = "user id can not be null")
    @JsonProperty("user_id")
    private Integer userId;

    // Getters and Setters

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }
}
