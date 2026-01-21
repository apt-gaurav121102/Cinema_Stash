package com.cinema_stash.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.cinema_stash.entities.BookingStatus;
import com.cinema_stash.entities.SeatTypes;

public class BookingDto {
	private int numberOfSeats;
	private LocalDateTime bookingTime;
	private SeatTypes seatTypes;
	private Double priceModifier;
	private BookingStatus bookingStatus;
	private List<String> seatNumbers;
	private Long userId;
	private Long showId;
	
	public int getNumberOfSeats() {
		return numberOfSeats;
	}
	public void setNumberOfSeats(int numberOfSeats) {
		this.numberOfSeats = numberOfSeats;
	}
	public LocalDateTime getBookingTime() {
		return bookingTime;
	}
	public void setBookingTime(LocalDateTime bookingTime) {
		this.bookingTime = bookingTime;
	}
	public SeatTypes getSeatTypes() {
	    return seatTypes;
	}

	public void setSeatTypes(SeatTypes seatTypes) {
	    this.seatTypes = seatTypes;
	}

	public Double getPriceModifier() {
		return priceModifier;
	}
	public void setPriceModifier(Double priceModifier) {
		this.priceModifier = priceModifier;
	}
	public BookingStatus getBookingStatus() {
		return bookingStatus;
	}
	public void setBookingStatus(BookingStatus bookingStatus) {
		this.bookingStatus = bookingStatus;
	}
	public List<String> getSeatNumbers() {
		return seatNumbers;
	}
	public void setSeatNumbers(List<String> seatNumbers) {
		this.seatNumbers = seatNumbers;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public Long getShowId() {
		return showId;
	}
	public void setShowId(Long showId) {
		this.showId = showId;
	}
}
