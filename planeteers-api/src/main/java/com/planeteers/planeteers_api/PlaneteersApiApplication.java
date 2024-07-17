package com.planeteers.planeteers_api;

import com.planeteers.planeteers_api.models.User;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class PlaneteersApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(PlaneteersApiApplication.class, args);

		User user1 = new User("mal", "lololo@gmail.com",21,"halfbaked");

		System.out.println(user1);
	}
	// test
}
