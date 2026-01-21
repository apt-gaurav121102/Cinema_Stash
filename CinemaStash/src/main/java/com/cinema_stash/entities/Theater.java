package com.cinema_stash.entities;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Theater {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long theaterId;
	
	private String theaterName;
	private String theaterLocation;
	private int theaterCapacity;
	private String theaterScreenType;
	
	@OneToMany(mappedBy = "theater", fetch = FetchType.LAZY)
	private List<Show> shows;
	
	public long getTheaterId() {
		return theaterId;
	}
	public void setTheaterId(long theaterId) {
		this.theaterId = theaterId;
	}
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
