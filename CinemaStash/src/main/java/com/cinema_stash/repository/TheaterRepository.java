package com.cinema_stash.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cinema_stash.entities.Theater;

public interface TheaterRepository extends JpaRepository<Theater, Long> {
	Optional<List<Theater>> findByTheaterLocation(String location);
}
