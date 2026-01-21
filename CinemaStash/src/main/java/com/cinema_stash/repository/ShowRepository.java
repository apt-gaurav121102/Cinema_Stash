package com.cinema_stash.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.cinema_stash.entities.Show;

@Repository
public interface ShowRepository extends JpaRepository<Show, Long> {
	List<Show> findByMovieMovieId(Long movieId);

	List<Show> findByTheaterTheaterId(Long theaterId);

	@Query("SELECT s FROM Show s JOIN FETCH s.movie JOIN FETCH s.theater")
	List<Show> findAllWithMovieAndTheater();

	@Query("SELECT s FROM Show s JOIN FETCH s.movie JOIN FETCH s.theater WHERE s.theater.theaterId = :theaterId")
	List<Show> findByTheaterWithMovie(Long theaterId);
}
