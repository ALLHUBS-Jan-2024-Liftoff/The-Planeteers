package com.planeteers.planeteers_api.models;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;

@Entity
public class Comment extends AbstractEntity{


    private String description;

    public Comment (){}

    @ManyToOne
    private User user;

    public Comment(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
