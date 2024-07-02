package com.akshay.service;

import com.akshay.model.User;

public interface UserService {
	
    public User findUserByJwtToken(String jwt) throws Exception;
	
    public User findUserByEmail(String email) throws Exception;

    public User save(User user);
    
    void createUser();
}
