package com.cinema_stash.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cinema_stash.entities.Booking;
import com.cinema_stash.entities.BookingStatus;
import com.cinema_stash.entities.User;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long>{
	List<Booking> findByUserUserId(Long userId);
	
	List<Booking> findByShowShowId(Long showId);
	
	
	List<Booking> findByBookingStatus(BookingStatus bookingStatus);
}
