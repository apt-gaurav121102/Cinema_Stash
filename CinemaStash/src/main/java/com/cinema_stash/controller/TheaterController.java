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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cinema_stash.dto.TheaterDto;
import com.cinema_stash.entities.Theater;
import com.cinema_stash.service.TheaterService;

@RestController
@RequestMapping("/theaters")
@CrossOrigin(origins = "http://localhost:5174")
public class TheaterController {
	
	@Autowired
	private TheaterService theaterService;
	
	@PostMapping("/addTheater")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> addTheater(@RequestBody TheaterDto dto){
		return ResponseEntity.ok(theaterService.addTheater(dto));
	}
	
	@GetMapping("/getTheaterByLocation")
	public ResponseEntity<List<Theater>> getTheaterByLocation(@RequestParam String location){
		return ResponseEntity.ok(theaterService.getTheaterByLocation(location));
	}
	
	@GetMapping("/getAll")
	public ResponseEntity<List<Theater>> getAllTheaters() {
	    List<Theater> theaters = theaterService.getAllTheaters();
	    return ResponseEntity.ok(theaters);
	}


	@PutMapping("updateTheater/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> updateTheater(@PathVariable("id") Long theaterId, @RequestBody TheaterDto dto){
		return ResponseEntity.ok(theaterService.updateTheater(theaterId, dto));
	}
	
	@DeleteMapping("/delete/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<Void> deleteTheater(@PathVariable("id") Long theaterId){
		theaterService.deleteTheater(theaterId);
		return ResponseEntity.ok().build();
	}
}
