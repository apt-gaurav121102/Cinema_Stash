package com.cinema_stash.service;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cinema_stash.dto.MovieDto;
import com.cinema_stash.dto.MovieResponseDto;
import com.cinema_stash.entities.Movie;
import com.cinema_stash.entities.MovieGenre;
import com.cinema_stash.repository.MovieRepository;

import jakarta.transaction.Transactional;

@Service
public class MovieService {
	
	@Autowired
	private MovieRepository mRepo;
	
	@Autowired
	private ModelMapper modelMapper;
	
	private MovieResponseDto toDto(Movie movie) {
		MovieResponseDto mto = this.modelMapper.map(movie, MovieResponseDto.class);
		return mto;
	}
	
	public List<MovieResponseDto> getAllMovies(){
		List<Movie> movies = mRepo.findAll();
		List<MovieResponseDto> movieList = new ArrayList<>();
		for(Movie m: movies) {
			movieList.add(toDto(m));
		}
		return movieList;
	}
	
	public List<MovieResponseDto> getMovieByGenre(String genre) {
		MovieGenre mgenre;
		try {
			mgenre = MovieGenre.valueOf(genre.toUpperCase());
		} catch (Exception e) {
			throw new RuntimeException("Invalid Genre");
		}
		List<Movie> movies = mRepo.findMovieByGenre(mgenre);
		List<MovieResponseDto> movieList = new ArrayList<>();
		for(Movie m: movies) {
			movieList.add(toDto(m));
		}
		return movieList;
	}
	
	public MovieResponseDto getMovieByName(String name) {
		Movie movie = mRepo.findMovieByNameIgnoreCase(name);
		
		if(movie == null) {
			throw new RuntimeException("Movie not found!");
		}
		return toDto(movie);
	}
	
	public MovieResponseDto addMovies(MovieDto dto) {
		Movie newMovie = modelMapper.map(dto, Movie.class);
		Movie saved = mRepo.save(newMovie);
		return toDto(saved);
	}
	
	public MovieResponseDto updateMovies(MovieDto dto, Long movieId) {
		Movie movie = mRepo.findById(movieId)
				.orElseThrow(()-> new RuntimeException("Movie not found!"));
		
		movie.setName(dto.getName());
	    movie.setPoster(dto.getPoster());
	    movie.setGenre(dto.getGenre());
	    movie.setLanguage(dto.getLanguage());
	    movie.setType(dto.getType());
	    movie.setDuration(dto.getDuration());
	    movie.setReleaseDate(dto.getReleaseDate());

	    Movie updated = mRepo.save(movie);

	    return toDto(updated);
	}
	
	@Transactional
    public String deleteMovie(Long movieId) {
        if (!mRepo.existsById(movieId)) {
            return "Movie not found";
        }

        mRepo.deleteById(movieId); // Cascade will handle shows
        return "Movie deleted successfully!";
    }
	
}
