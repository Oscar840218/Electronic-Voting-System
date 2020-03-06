package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping(path = "/user", produces = MediaType.APPLICATION_JSON_VALUE)
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping(path = "/login")
    public Object login(@RequestBody String residentId) {

        if (residentId != null) {
            Optional<User> user = userService.login(residentId);
            if (user.isPresent()) {
                String token = userService.createToken(user.get().getId());
                if (token != null) {
                    Map<String, String> json = new LinkedHashMap<>();
                    json.put("success", "true");
                    json.put("message", "Login Success!");
                    json.put("role", user.get().getRole());
                    json.put("token", token);
                    return json;
                } else {
                    return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body("Token error");
                }
            } else {
                return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body("Can not find User account");
            }
        } else {
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body("Server error");
        }
    }


    @PostMapping(path = "/register")
    public ResponseEntity<String> createUser(@RequestBody User user) {

        if(userService.createNewUser(user)) {
            return ResponseEntity.status(HttpStatus.CREATED).body("Register user success");
        }

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Account existed");
    }
}
