package com.cinema_stash.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.cinema_stash.dto.LoginRequestDto;
import com.cinema_stash.dto.LoginResponseDto;
import com.cinema_stash.dto.RegisterRequestDto;
import com.cinema_stash.entities.User;
import com.cinema_stash.entities.UserRole;
import com.cinema_stash.jwt.JwtService;
import com.cinema_stash.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private PasswordEncoder passEncoder;

	@Autowired
	private AuthenticationManager authManager;

	@Autowired
	private JwtService jwtService;

	public User registerUser(RegisterRequestDto dto) {
		// Check if email already exists
		if (userRepo.findByEmail(dto.getEmail()).isPresent()) {
			throw new RuntimeException("User Already Exists!");
		}

		User newUser = new User();
		newUser.setName(dto.getName());
		newUser.setEmail(dto.getEmail()); // <-- make sure to set email!
		newUser.setPhone(dto.getPhone());
		newUser.setDateOfBirth(dto.getDateOfBirth());
		newUser.setRole(UserRole.USER);
		newUser.setPassword(passEncoder.encode(dto.getPassword()));

		return userRepo.save(newUser);
	}

	public User registerAdmin(RegisterRequestDto dto) {
		if (userRepo.findByEmail(dto.getEmail()).isPresent()) {
			throw new RuntimeException("Admin Already Exists!");
		}

		User newUser = new User();
		newUser.setName(dto.getName());
		newUser.setEmail(dto.getEmail()); // important!
		newUser.setPhone(dto.getPhone());
		newUser.setDateOfBirth(dto.getDateOfBirth());
		newUser.setRole(UserRole.ADMIN);
		newUser.setPassword(passEncoder.encode(dto.getPassword()));

		return userRepo.save(newUser);
	}

	public LoginResponseDto loginUser(LoginRequestDto dto) {
		User user = userRepo.findByEmail(dto.getEmail())
				.orElseThrow(() -> new RuntimeException("User Not Found, Please Registered! "));

		authManager.authenticate(new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword()));
		String token = jwtService.generateToken(user);

		return new LoginResponseDto(token, user.getUserId(), user.getName(), user.getRole().name(),
				"Token generated successfully!");

	}

	public List<User> getAllUsers() {
	    List<User> users = userRepo.findAll();
	    if(users.isEmpty()) {
	        throw new RuntimeException("Users Not Found!");
	    }
	    return users;
	}


	public void deleteUser(Long userId) {
		User user = userRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found!"));
		userRepo.delete(user);
	}

	public List<User> getAllAdmins() {
        return userRepo.findByRole("ADMIN");
    }
}