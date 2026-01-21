package com.cinema_stash.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
import org.springframework.web.bind.annotation.RestController;

import com.cinema_stash.dto.MovieDto;
import com.cinema_stash.dto.MovieResponseDto;
import com.cinema_stash.service.MovieService;

@RestController
@RequestMapping("/movies")
@CrossOrigin(origins = "http://localhost:5174")
public class MovieController {
	
	@Autowired
	private MovieService mService;
	
	@GetMapping("/all-movies")
	public ResponseEntity<List<MovieResponseDto>> getAllMovies(){
		return new ResponseEntity<>(mService.getAllMovies(), HttpStatus.OK);
	}
	
	@GetMapping("/genre/{genre}")
	public ResponseEntity<List<MovieResponseDto>> getMovieByGenre(@PathVariable String genre){
		return new ResponseEntity<>(mService.getMovieByGenre(genre), HttpStatus.OK);
	}
	
	@GetMapping("/name/{name}")
	public ResponseEntity<MovieResponseDto> getMovieByName(@PathVariable String name){
		return new ResponseEntity<>(mService.getMovieByName(name), HttpStatus.OK);
	}
	
	@PostMapping("/addMovie")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> addNewMovie(@RequestBody MovieDto dto){
		return new ResponseEntity<>(mService.addMovies(dto), HttpStatus.CREATED);
	}
	
	@PutMapping("/update/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> updateMovie(@RequestBody MovieDto dto, @PathVariable("id") Long movieId){
		return new ResponseEntity<>(mService.updateMovies(dto, movieId), HttpStatus.OK);
	}
	
}
