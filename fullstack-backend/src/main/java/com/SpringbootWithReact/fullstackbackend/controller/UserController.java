package com.SpringbootWithReact.fullstackbackend.controller;


import com.SpringbootWithReact.fullstackbackend.exception.UserNotFoundException;
import com.SpringbootWithReact.fullstackbackend.model.User;
import com.SpringbootWithReact.fullstackbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000/")
public class UserController {

    @Autowired
    private UserRepository userRepository;

@PostMapping("/api/user/")
    User addUser(@RequestBody User newUser){
        return userRepository.save(newUser);
    }

    @GetMapping("/api/user/")
    List<User> getUserDetails(){
       return userRepository.findAll();
    }

    @GetMapping("/api/user/{id}")
    public User getUserById(@PathVariable Long id) {
        // get the resource
       return userRepository.findById(id)
               .orElseThrow(()->new UserNotFoundException(id));
    }

    @DeleteMapping("/api/user/{id}")
    public String deleteUser(@PathVariable Long id) {
        // Check if the resource exists
        if (!userRepository.existsById(id)) {
             throw new UserNotFoundException(id);
        }
        // Delete the resource
            userRepository.deleteById(id);
            return "User with ID " + id + " deleted successfully";

    }

    @PutMapping("/api/user/{id}")
    public User updateUser(@RequestBody User newUser, @PathVariable Long id){
return userRepository.findById(id)
        .map(user -> {
            user.setName(newUser.getName());
            user.setUsername(newUser.getUsername());
            user.setEmail(newUser.getEmail());
            return userRepository.save(user);
        }).orElseThrow(()-> new UserNotFoundException(id));
    }
}
