package com.cinema_stash.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cinema_stash.dto.ShowDto;
import com.cinema_stash.entities.Show;
import com.cinema_stash.service.ShowService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/shows")
@CrossOrigin(origins = "http://localhost:5174")
public class ShowController {
	@Autowired
	private ShowService showService;
	
	@GetMapping("/getShows")
	public ResponseEntity<List<Show>> getAllShows(){
		return ResponseEntity.ok(showService.getAllShows());
	}
	
	@PostMapping("/addShow")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> createShow(@Valid @RequestBody ShowDto dto){
		return ResponseEntity.ok(showService.createShow(dto));
	}
	
	@GetMapping("/theater/{id}")
	public ResponseEntity<List<Show>> getShowsByTheater(@PathVariable("id") Long theaterId) {
	    return ResponseEntity.ok(showService.getShowsByTheater(theaterId));
	}

	@GetMapping("/all-with-details")
	public ResponseEntity<List<Show>> getAllShowsDetails() {
	    return ResponseEntity.ok(showService.getAllShowsWithDetails());
	}

	
	@PutMapping("/updateShow/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> updateShow(@Valid @PathVariable("id") Long showId, @RequestBody ShowDto dto){
		return ResponseEntity.ok(showService.updateShow(showId, dto));
	}
}
