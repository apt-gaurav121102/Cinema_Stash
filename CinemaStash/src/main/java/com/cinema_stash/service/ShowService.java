package com.cinema_stash.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cinema_stash.dto.ShowDto;
import com.cinema_stash.entities.Movie;
import com.cinema_stash.entities.Show;
import com.cinema_stash.entities.Theater;
import com.cinema_stash.repository.MovieRepository;
import com.cinema_stash.repository.ShowRepository;
import com.cinema_stash.repository.TheaterRepository;

@Service
public class ShowService {
	@Autowired
	private ShowRepository showRepo;
	
	@Autowired
	private TheaterRepository theaterRepo;
	
	@Autowired
	private MovieRepository movieRepo;
	
	public Show createShow(ShowDto dto) {
		Movie movie = movieRepo.findById(dto.getMovieId()).orElseThrow(()-> new RuntimeException("Movie Not Found! " + dto.getMovieId()));
		
		Theater theater = theaterRepo.findById(dto.getTheaterId()).orElseThrow(()-> new RuntimeException("Theater Not Found!" + dto.getTheaterId()));
		
		Show show = new Show();
		show.setShowTime(dto.getShowTime());
		show.setMovie(movie);
		show.setTheater(theater);
		
		return showRepo.save(show);
	}
	
	public List<Show> getAllShows() {
		return showRepo.findAll();
	}
	
	public List<Show> getShowsByTheater(Long theaterId) {
        return showRepo.findByTheaterWithMovie(theaterId);
    }

	public List<Show> getAllShowsWithDetails() {
	    List<Show> shows = showRepo.findAll(); // Assuming Show entity has movie & theater mappings
	    shows.forEach(s -> {
	        s.getMovie().getName();   // ensure movie loaded
	        s.getTheater().getTheaterName(); // ensure theater loaded
	    });
	    return shows;
	}

    
	public List<Show> getShowsByMovie(Long movieId){
		List<Show> movieShows = showRepo.findByMovieMovieId(movieId);
		if(movieShows.isEmpty()) {
			throw new RuntimeException("No shows are available for this Movie!");
		}
		
		return movieShows;
	}
	
	public List<Show> getShowsByTheater(Long theaterId){
		List<Show> theaterShows = showRepo.findByTheaterTheaterId(theaterId);
		if(theaterShows.isEmpty()) {
			throw new RuntimeException("No shows are available for this Theater!");
		}
		return theaterShows;
	}
	
	public Show updateShow(Long showId, ShowDto dto) {
		Show show = showRepo.findById(showId)
				.orElseThrow(()-> new RuntimeException("Show not Found!"));
		
		Movie movie = movieRepo.findById(dto.getMovieId())
				.orElseThrow(()-> new RuntimeException("Movie not Found"));
		
		Theater theater = theaterRepo.findById(dto.getTheaterId())
				.orElseThrow(()-> new RuntimeException("Theater Not Found"));
		
		show.setShowTime(dto.getShowTime());
		show.setMovie(movie);
		show.setTheater(theater);
		
		return showRepo.save(show);
	}
	
	public void deleteShow(Long showId) {
		Show show = showRepo.findById(showId)
		        .orElseThrow(() -> new RuntimeException("Show not Found!"));

		if (!show.getBookings().isEmpty()) {
		    throw new RuntimeException("Cannot delete show as it has bookings!");
		}

		showRepo.delete(show);

	}
}
