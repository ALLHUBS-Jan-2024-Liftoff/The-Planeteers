package com.planeteers.planeteers_api.models;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Score extends AbstractEntity{

    private int score;

    public Score (){}

    @ManyToOne
    private User user;

    //getter and setter
    public Score(int score) {
        this.score = score;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }
}
