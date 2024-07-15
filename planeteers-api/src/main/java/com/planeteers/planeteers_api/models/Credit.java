package com.planeteers.planeteers_api.models;


import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;

@Entity
public class Credit extends AbstractEntity{

    private int coin;

    @OneToOne
    private User user;

    public Credit (){}

    public Credit(int coin) {
        this.coin = coin;
    }

    public int getCoin() {
        return coin;
    }

    public void setCoin(int coin) {
        this.coin = coin;
    }
}
