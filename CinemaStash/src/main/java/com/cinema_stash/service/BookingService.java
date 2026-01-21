package com.cinema_stash.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cinema_stash.dto.BookingDto;
import com.cinema_stash.entities.Booking;
import com.cinema_stash.entities.BookingStatus;
import com.cinema_stash.entities.SeatTypes;
import com.cinema_stash.entities.Show;
import com.cinema_stash.entities.User;
import com.cinema_stash.repository.BookingRepository;
import com.cinema_stash.repository.ShowRepository;
import com.cinema_stash.repository.UserRepository;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepo;

    @Autowired
    private ShowRepository showRepo;

    @Autowired
    private UserRepository userRepo;

    // seat availability
    public boolean isSeatsAvailable(Long showId, Integer numberOfSeats) {
        Show show = showRepo.findById(showId)
                .orElseThrow(() -> new RuntimeException("Show not found"));

        int bookedSeats = show.getBookings().stream()
                .filter(b -> b.getBookingStatus() != BookingStatus.CANCELLED)
                .mapToInt(Booking::getNumberOfSeats)
                .sum();

        return (show.getTheater().getTheaterCapacity() - bookedSeats) >= numberOfSeats;
    }

    // check duplicate seats
    public void validateDuplicateSeats(Long showId, List<String> seatNumbers) {
        Show show = showRepo.findById(showId)
                .orElseThrow(() -> new RuntimeException("Show not Found"));

        Set<String> occupiedSeats = show.getBookings().stream()
                .filter(b -> b.getBookingStatus() != BookingStatus.CANCELLED)
                .flatMap(b -> b.getSeatNumbers().stream())
                .collect(Collectors.toSet());

        List<String> duplicates = seatNumbers.stream()
                .filter(occupiedSeats::contains)
                .toList();

        if (!duplicates.isEmpty()) {
            throw new RuntimeException("Selected seats are already booked");
        }
    }

    public double calculateTotalPrice(SeatTypes seatTypes, int seats) {
    	
    		if (seatTypes == null) {
    	        seatTypes = SeatTypes.SILVER;
    	    }

        double basePrice = switch (seatTypes) {
            case GOLD -> 150;
            case SILVER -> 120;
            default -> 120;
        };

        double gst = basePrice * 0.18;
        double total = (basePrice + gst) * seats;
        return Math.round(total * 100)/100;
    }

    public Booking createBooking(BookingDto dto) {

        Show show = showRepo.findById(dto.getShowId())
                .orElseThrow(() -> new RuntimeException("Show not found"));

        if (!isSeatsAvailable(dto.getShowId(), dto.getNumberOfSeats())) {
            throw new RuntimeException("Not enough seats available");
        }

        if (dto.getSeatNumbers().size() != dto.getNumberOfSeats()) {
            throw new RuntimeException("Seat numbers count must match number of seats");
        }

        validateDuplicateSeats(dto.getShowId(), dto.getSeatNumbers());

        User user = userRepo.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setShow(show);
        booking.setNumberOfSeats(dto.getNumberOfSeats());
        booking.setSeatNumbers(dto.getSeatNumbers());
        booking.setSeatType(dto.getSeatTypes());
        booking.setPrice(calculateTotalPrice(dto.getSeatTypes(), dto.getNumberOfSeats()));
        booking.setBookingTime(LocalDateTime.now());
        booking.setBookingStatus(BookingStatus.PENDING);

        return bookingRepo.save(booking);
    }
    
    public User getUserByEmail(String email) {
        return userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
    }


	public List<Booking> getBookingsByUserId(Long userId) {
		return bookingRepo.findByUserUserId(userId);
	}
	
	public List<Booking> getBookingsByShowId(Long showId){
		return bookingRepo.findByShowShowId(showId);
	}
	
	public Booking confirmBooking(Long bookingId) {
		Booking booking = bookingRepo.findById(bookingId)
				.orElseThrow(() -> new RuntimeException("Booking Not Found!"));
		
		if(booking.getBookingStatus() != BookingStatus.PENDING) {
			throw new RuntimeException("Booking is not in pending state!");
		}
		
		//payment Process Integrate
		booking.setBookingStatus(BookingStatus.CONFIRM);
		return bookingRepo.save(booking);
	}
	
	public Booking cancelBooking(Long BookingId) {
		Booking booking = bookingRepo.findById(BookingId)
				.orElseThrow(() -> new RuntimeException("Booking not found!"));
		
		validateCancellation(booking);
		
		booking.setBookingStatus(BookingStatus.CANCELLED);
		return bookingRepo.save(booking);
	}
	
	public void validateCancellation(Booking booking) {
	    LocalDateTime showTime = booking.getShow().getShowTime();
	    LocalDateTime deadlineTime = showTime.minusHours(2);

	    if (LocalDateTime.now().isAfter(deadlineTime)) {
	        throw new RuntimeException("Cannot cancel booking within 2 hours of the show!");
	    }

	    if (booking.getBookingStatus() == BookingStatus.CANCELLED) {
	        throw new RuntimeException("Booking Already Cancelled!");
	    }
	}

	public List<Booking> getBookingsByStatus(BookingStatus bookingStatus) {
		List<Booking> bookings = bookingRepo.findByBookingStatus(bookingStatus);
		
		if(bookings.isEmpty()) {
			throw new RuntimeException("No Bookings found with status: " + bookingStatus);
		}
		
		return bookings;
	}
}