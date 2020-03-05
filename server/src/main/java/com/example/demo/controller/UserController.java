package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping(path = "/user", produces = MediaType.APPLICATION_JSON_VALUE)
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
public class UserController {

    @Autowired
    UserRepository userRepository;

    @GetMapping("/all")
    public Optional<User> getAll() {
        return userRepository.findByResidentId("12345");
    }



    @PostMapping(path = "/register")
    public ResponseEntity<String> createUser(@RequestBody User user) {

        try {
            if (userRepository.findByResidentId(user.getResidentId()).isPresent()) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("The account has been enrolled");
            } else {
                userRepository.save(user);
            }

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body("Server Error");
        }
  
        return ResponseEntity.status(HttpStatus.CREATED).body("Register user success");
    }
}
