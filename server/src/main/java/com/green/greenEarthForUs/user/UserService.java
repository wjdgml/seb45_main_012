package com.green.greenEarthForUs.user;

import com.green.greenEarthForUs.user.Entity.User;
import com.green.greenEarthForUs.user.Repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository repository){
        this.userRepository = repository;
    }

    public User createUser(User user){
        return userRepository.save(user);
    }

}
