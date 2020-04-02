package com.example.demo.service;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.Optional;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    public boolean createNewUser(User user) {
        try {
            if (userRepository.findByResidentId(user.getResidentId()).isPresent()) {
                return false;
            }
            userRepository.save(user);
            return true;

        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public Optional<User> login(String id) {
        try {
            return userRepository.findByResidentId(id);
        } catch (Exception e) {
            e.printStackTrace();
            return Optional.empty();
        }
    }

    public String createToken(int id) {
        Date date = new Date();
        long t= date.getTime();
        Date expireTime = new Date(t + 86400000);
        try {
            Algorithm algorithm = Algorithm.HMAC256("secret");
            return JWT.create()
                    .withClaim("id", id)
                    .withExpiresAt(expireTime)
                    .withIssuer("auth0")
                    .sign(algorithm);
        } catch (JWTCreationException | UnsupportedEncodingException exception){
            //UTF-8 encoding not supported
        }
        return null;
    }

    public String testConnection() {
        return "Server connection success";
    }
}
