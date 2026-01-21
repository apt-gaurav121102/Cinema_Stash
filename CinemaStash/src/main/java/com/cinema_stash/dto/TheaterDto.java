package com.cinema_stash.dto;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
public class TheaterDto {
	private String theaterName;
	private String theaterLocation;
	private int theaterCapacity;
	private String theaterScreenType;
	
	public String getTheaterName() {
		return theaterName;
	}
	public void setTheaterName(String theaterName) {
		this.theaterName = theaterName;
	}
	public String getTheaterLocation() {
		return theaterLocation;
	}
	public void setTheaterLocation(String theaterLocation) {
		this.theaterLocation = theaterLocation;
	}
	public int getTheaterCapacity() {
		return theaterCapacity;
	}
	public void setTheaterCapacity(int theaterCapacity) {
		this.theaterCapacity = theaterCapacity;
	}
	public String getTheaterScreenType() {
		return theaterScreenType;
	}
	public void setTheaterScreenType(String theaterScreenType) {
		this.theaterScreenType = theaterScreenType;
	}
	
	
}
