package com.example.demo.controller;

import com.example.demo.model.Candidate;
import com.example.demo.model.Profile;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping(value = "/user")
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
public class UserController {
    @Autowired
    UserRepository userRepository;

    @GetMapping(value = "/all")
    public List<User> getAll() {
        return userRepository.findAll();
    }

    @GetMapping(value = "/test")
    public String createUser() {

//        Profile profile = new Profile();
//        profile.setName("test");
//        profile.setAddress("13123");
//        profile.setAge("12~15");
//        profile.setEmail("email@test.com");
//        profile.setGender("male");
//
//        Candidate candidate = new Candidate();
//        candidate.setArea("taiwan");
//        candidate.setIntroduction("test");
//        candidate.setName("test2");
//
//        User user = new User();
//
//        user.setResidentId("A21221");
//        user.setRole("USER");
//        user.setVoted(false);
//
//        user.setProfile(profile);
//        user.setCandidate(candidate);
//
//        userRepository.save(user);
        return "Success";
    }
}
