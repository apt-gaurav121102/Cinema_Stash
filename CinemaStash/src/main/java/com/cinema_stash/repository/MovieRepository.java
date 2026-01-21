package com.cinema_stash.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cinema_stash.entities.Movie;
import com.cinema_stash.entities.MovieGenre;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {
	
	List<Movie> findMovieByGenre(MovieGenre genre);
	
	Movie findMovieByNameIgnoreCase(String name);
}
