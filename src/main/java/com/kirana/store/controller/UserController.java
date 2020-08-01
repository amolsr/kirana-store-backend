package com.kirana.store.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.kirana.store.model.User;
import com.kirana.store.repository.UserRepository;

@RestController
public class UserController {
    @Autowired
    UserRepository userRepository;

    @GetMapping("/users")
    public List<User> getUsers() {
        List<User> usersList = userRepository.findAll();
        return usersList;
    }

    @GetMapping("/user/{id}")
    public Optional<User> getUser(@PathVariable ObjectId id) {
        Optional<User> user = userRepository.findById(id);
        return user;
    }

    @PutMapping("/user/{id}")
    public Optional<User> updateUser(@RequestBody User newUser, @PathVariable ObjectId id) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setName(newUser.getName());
            user.setEmail(newUser.getEmail());
            user.setMobile(newUser.getMobile());
            user.setPassword(newUser.getPassword());
            userRepository.save(user);
        }
        return optionalUser;
    }

    @DeleteMapping(value = "/user/{id}", produces = "application/json; charset=utf-8")
    public Map<String, Object> deleteUser(@PathVariable ObjectId id) {
        Map<String, Object> response = new HashMap<>();
        Boolean result = userRepository.existsById(id);
        userRepository.deleteById(id);
        response.put("success", result);
        return response;
    }

    @PostMapping("/user")
    public Map<String, Object> addUser(@RequestBody User newUser) {
        Map<String, Object> response = new HashMap<>();
        try {
            ObjectId id = new ObjectId();
            User user = new User(id, newUser.getName(), newUser.getEmail(), newUser.getMobile(), newUser.getPassword());
            userRepository.insert(user);
            response.put("success", Boolean.TRUE);
            response.put("result", user);
            return response;
        } catch (org.springframework.dao.DuplicateKeyException e) {
            response.put("success", Boolean.FALSE);
            response.put("error", "User Exist");
            return response;
        } catch (Exception e) {
            e.printStackTrace();
            response.put("success", Boolean.FALSE);
            return response;
        }
    }
}