package com.cinema_stash.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cinema_stash.dto.TheaterDto;
import com.cinema_stash.entities.Theater;
import com.cinema_stash.repository.TheaterRepository;

@Service
public class TheaterService {
	
	@Autowired
	private TheaterRepository theaterRepo;

	public Theater addTheater(TheaterDto dto) {
		Theater theater = new Theater();
		theater.setTheaterName(dto.getTheaterName());
		theater.setTheaterLocation(dto.getTheaterLocation());
		theater.setTheaterCapacity(dto.getTheaterCapacity());
		theater.setTheaterScreenType(dto.getTheaterScreenType());
		
		return theaterRepo.save(theater);
	}
	
	public List<Theater> getAllTheaters() {
	    return theaterRepo.findAll();  // Assuming you have a JpaRepository
	}


	public List<Theater> getTheaterByLocation(String location) {
		Optional<List<Theater>> theaters= theaterRepo.findByTheaterLocation(location);
		
		if(theaters.isPresent()) {
			return theaters.get();
		}else {
			throw new RuntimeException("No theaters found at this locations! " + location);
		}
	}

	public Theater updateTheater(Long theaterId, TheaterDto dto) {
		Theater theater = theaterRepo.findById(theaterId)
				.orElseThrow(()-> new RuntimeException("Theater Not Found!"));
		theater.setTheaterName(dto.getTheaterName());
		theater.setTheaterLocation(dto.getTheaterLocation());
		theater.setTheaterCapacity(dto.getTheaterCapacity());
		theater.setTheaterScreenType(dto.getTheaterScreenType());
		
		return theaterRepo.save(theater);
	}

	public void deleteTheater(Long theaterId) {
		theaterRepo.deleteById(theaterId);
	}
	
}
