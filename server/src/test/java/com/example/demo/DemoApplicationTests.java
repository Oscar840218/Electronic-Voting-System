package com.example.demo;

import com.example.demo.controller.UserController;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.UserService;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import static io.restassured.RestAssured.*;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
class DemoApplicationTests {

    @Autowired
    UserService userService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserController userController;

    @Test
    void testServerWorks() {
        userService.testConnection();
    }

    @Test
    void testDatabaseConnection() {
        userRepository.findById(1);
    }

    @Test
    void testFrontendLogin() {
        userController.login("A123456");
    }
}
