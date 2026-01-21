package com.cinema_stash.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cinema_stash.dto.BookingDto;
import com.cinema_stash.entities.Booking;
import com.cinema_stash.entities.BookingStatus;
import com.cinema_stash.entities.User;
import com.cinema_stash.service.BookingService;

@RestController
@RequestMapping("/bookings")
@CrossOrigin(origins = "http://localhost:5174")
public class BookingController {
	
	@Autowired
	private BookingService bookingService;
	
	@PostMapping("/createBooking")
	public ResponseEntity<?> createBooking(@RequestBody BookingDto dto){
		return ResponseEntity.ok(bookingService.createBooking(dto));
	}
	
	@GetMapping("/myBookings")
	public ResponseEntity<List<Booking>> getMyBookings(Authentication authentication) {
	    String email = authentication.getName(); // extract from JWT
	    User user = bookingService.getUserByEmail(email);
	    return ResponseEntity.ok(bookingService.getBookingsByUserId(user.getUserId()));
	}

	
	@GetMapping("/getUsersBooking/{id}")
	public ResponseEntity<List<Booking>> getUsersBooking(@PathVariable("id") Long userId){
		return ResponseEntity.ok(bookingService.getBookingsByUserId(userId));
	}
	
	@GetMapping("/getShowsBooking/{id}")
	public ResponseEntity<List<Booking>> getShowsBooking(@PathVariable("id") Long showId){
		return ResponseEntity.ok(bookingService.getBookingsByShowId(showId));
	}
	
	@PutMapping("/{id}/confirm")
	public ResponseEntity<?> confirmBooking(@PathVariable("id") Long bookingId){
		return ResponseEntity.ok(bookingService.confirmBooking(bookingId));
	}
	
	@DeleteMapping("/{id}/cancel")
	public ResponseEntity<?> cancelBooking(@PathVariable("id") Long bookingId){
		return ResponseEntity.ok(bookingService.cancelBooking(bookingId));
	}
	
	@GetMapping("/getBookingsByStatus/{bookingStatus}")
	public ResponseEntity<List<Booking>> getBookingsByStatus(@PathVariable BookingStatus bookingStatus){
		return ResponseEntity.ok(bookingService.getBookingsByStatus(bookingStatus));
	}
	
}
