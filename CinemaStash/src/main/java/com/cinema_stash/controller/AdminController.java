package com.cinema_stash.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cinema_stash.dto.RegisterRequestDto;
import com.cinema_stash.entities.User;
import com.cinema_stash.service.UserService;

@CrossOrigin(origins = "http://localhost:5174")
@RestController
@RequestMapping("/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {
	
	@Autowired
	private UserService userService;
	
	@PostMapping("/register")
	public ResponseEntity<?> registerAdmin(@RequestBody RegisterRequestDto dto){
		return ResponseEntity.ok(userService.registerAdmin(dto));
	}
	
	@GetMapping("/get-Admins")
    public ResponseEntity<List<User>> getAllAdmins() {
        List<User> admins = userService.getAllAdmins();
        return ResponseEntity.ok(admins);
    }
	
	@GetMapping("/getAllUsers")
	public ResponseEntity<?> getAllUsers(){
	    return ResponseEntity.ok(userService.getAllUsers());
	}

	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteUser(@PathVariable Long id) {
	    userService.deleteUser(id); 
	    return ResponseEntity.ok("Deleted");
	}


	
}
