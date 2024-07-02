package com.akshay.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.akshay.config.JwtProvider;
import com.akshay.model.USER_ROLE;
import com.akshay.model.User;
import com.akshay.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private JwtProvider jwtProvider;

    public void saveUser(User user) {
        userRepository.save(user);
    }

    @Override
    public User save(User user) {
        // Implement the save method to persist the user
        return userRepository.save(user);
    }

	@Override
	public User findUserByEmail(String email) throws Exception {
		return userRepository.findByEmail(email);
	}
    
    @Override
    public User findUserByJwtToken(String jwt) throws Exception {

        String email = jwtProvider.getEmailFromJwtToken(jwt); 
        
        if (email == null) {
            throw new Exception("Invalid JWT token");
        }
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new Exception("User not found for JWT token");
        }
        return user;
    }
    public void createUser() {
        User user = new User();
        user.setEmail("example@example.com");
        user.setFullName("Example User");
        user.setPassword("password");
        user.setRole(USER_ROLE.ROLE_CUSTOMER);
        user.setStatus(true);

        saveUser(user);
     }
    
}
